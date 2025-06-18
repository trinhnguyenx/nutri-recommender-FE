<template>
  <div class="container">
    <Header />
    <img src="../../assets/img/hero.svg" class="hero-bg" alt="hero background" />
    <div v-if="calculationResult" class="summary-box">
      <h2 class="summary-title">📊 Tóm tắt tính toán</h2>
      <ul class="summary-list">
        <li v-if="calculationResult?.is_active">✅ Đang được áp dụng</li>
        <li v-else>❌ Không được áp dụng</li>
        <li>👤 Tuổi: <strong>{{ calculationResult?.age }} tuổi</strong></li>
        <li>📏 Chiều cao: <strong>{{ calculationResult?.height }} cm</strong></li>
        <li>⚖️ Cân nặng: <strong>{{ calculationResult?.weight }} kg</strong></li>
        <li>🚻 Giới tính: <strong>{{ calculationResult?.gender === 'Male' ? 'Nam' : 'Nữ' }}</strong></li>
        <li>🏃 Mức độ vận động: <strong>{{ activityLevelLabel }}</strong></li>
        <li>🧮 BMR (Tỉ lệ trao đổi chất cơ bản): <strong>{{ calculationResult?.bmr.toFixed(1) }} kcal</strong></li>
        <li>🔥 Calo để duy trì: <strong>{{ calculationResult?.maintenanceCalories.toFixed(1) }} kcal</strong></li>
        <li>🎯 Calo mục tiêu: <strong>{{ calculationResult?.targetCalories.toFixed(1) }} kcal</strong></li>
        <li>🏁 Mục tiêu: <strong>{{ goalText }}</strong></li>
        <li>📈 Tốc độ thay đổi: <strong>{{ calculationResult?.estimatedWeeklyChange.toFixed(1) }} kg/tuần</strong></li>
        <li>⏱️ Thời gian ước tính: <strong>{{ calculationResult?.estimatedDaysToGoal }} ngày</strong></li>
        <li>📅 Ngày tạo: <strong>{{ formatDate(calculationResult?.createdAt) }}</strong></li>
        <li><strong>Sáng: 25-30% | Trưa: 30-35% | Tối: 25-30% | Phụ: 5-10%</strong></li>
      </ul>
    </div>
    <div class="meal-plan-page">
      <h1 class="title">🍽 Gợi ý thực đơn tuần</h1>
      <div v-if="loading" class="loading">Đang tải dữ liệu...</div>
      <div v-else-if="mealPlan.length === 0" class="error">Không tìm thấy kế hoạch thực đơn</div>
      <div v-else>
        <div v-for="day in mealPlan" :key="day.day_number" class="day-plan">
          <h2 class="day-title">📅 Ngày {{ day.day_number }} - {{ formatDate(day.date) }}</h2>
          <div class="nutrition-summary">
            <p><strong>Tổng calo:</strong> {{ day.totalCalories.toFixed(1) }} kcal</p>
            <p><strong>Protein:</strong> {{ day.totalNutrition.protein.toFixed(1) }} g</p>
            <p><strong>Fat:</strong> {{ day.totalNutrition.fat.toFixed(1) }} g</p>
            <p><strong>Carbs:</strong> {{ day.totalNutrition.carbs.toFixed(1) }} g</p>
          </div>
          <div v-for="mealTime in orderedMealTimes" :key="mealTime" class="meal-group">
            <div v-if="getMealsByTime(day.meals, mealTime).length > 0" class="meal-time-section">
              <p class="meal-time-note">  🕒 Giờ ăn: {{ mealTimeNoteMap[mealTime as MealTime] }}</p>
              <MealCard :meals="getMealsByTime(day.meals, mealTime).map(m => ({ ...m.meal, mealPlanMealId: m.mealPlanMealId, meal_time: m.meal_time }))" :type="mealTime" 
              @meal-swapped="refreshData"
              :allowSwap="is_prenium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MealCard from '../../views/menucard/index.vue';
import Header from '../../views/headerpage/index.vue';
import { getMealsApi, getCalculationResultApi } from '../../services/api';
import { useUserStore } from '../../store/user.store';
import type { MealPlanDetail, CalorieResult, MealEntry } from '../../types/meal';

const mealPlan = ref<MealPlanDetail[]>([]);
const calculationResult = ref<CalorieResult | null>(null);
const loading = ref(true);
const errorMessage = ref('');
const route = useRoute();
const userStore = useUserStore();
const is_prenium = computed(() => userStore.user?.is_prenium || false);
const userId = computed(() => userStore.user?.id || '');
const mealPlanId = computed(() => route.params.id ? String(route.params.id) : '');
type MealTimeGain = 'breakfast' | 'snack1' | 'lunch' | 'snack2' | 'dinner' | 'snack3';
type MealTimeLoss = 'breakfast' | 'lunch' | 'snack2' | 'dinner';
type MealTime = MealTimeGain | MealTimeLoss;

const goalText = computed(() => {
  if (!calculationResult.value) return '';
  switch (calculationResult.value.goal) {
    case 'gain': return 'Tăng cân';
    case 'loss': return 'Giảm cân';
    case 'maintenance': return 'Giữ cân';
    default: return '';
  }
});

const mealTimeNoteMap = computed<Record<MealTime, string>>(() => {
  const goal = calculationResult.value?.goal || '';
  if (goal === 'gain') {
    return {
      breakfast: '7:00 sáng',
      snack1: '9:30 sáng',
      lunch: '12:00 trưa',
      snack2: '3:00 chiều',
      dinner: '6:00 tối',
      snack3: '8:30 tối',
    };
  }
  return {
    breakfast: '7:00 sáng',
    lunch: '12:00 trưa',
    snack2: '3:30 chiều',
    dinner: '6:30 tối',
  } as Record<MealTime, string>; 
});


const activityLevelLabels = {
  sedentary: 'Ít vận động',
  light: 'Vận động nhẹ',
  moderate: 'Vận động vừa phải',
  veryactive: 'Vận động nhiều',
} as const;

type ActivityLevel = keyof typeof activityLevelLabels;

const activityLevelLabel = computed(() => {
  const level = calculationResult.value?.activityLevel as ActivityLevel | undefined;
  return (level && activityLevelLabels[level]) || calculationResult.value?.activityLevel || '';
});

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('vi-VN', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};


const orderedMealTimes = computed(() => {
  if (calculationResult.value?.goal === 'gain') {
    return ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner', 'snack3'];
  }
  return ['breakfast', 'lunch', 'snack2', 'dinner'];
});

const getMealsByTime = (meals: MealPlanDetail['meals'], mealTime: string) => {
  return meals
    .filter((m: MealEntry) => m.meal_time === mealTime)
    .sort((a: MealEntry, b: MealEntry) => {
      if (a.meal.meal_type === 'dessert' && b.meal.meal_type !== 'dessert') return 1;
      if (a.meal.meal_type !== 'dessert' && b.meal.meal_type === 'dessert') return -1;
      return 0;
    });
};

const fetchMealPlan = async () => {
  if (!mealPlanId.value || !userId.value) {
    errorMessage.value = 'Thiếu thông tin thực đơn hoặc người dùng';
    loading.value = false;
    return;
  }

  try {
    const response = await getMealsApi(mealPlanId.value);
    mealPlan.value = response.data.data || [];
  } catch (error) {
    console.error('Không thể lấy kế hoạch thực đơn:', error);
    errorMessage.value = 'Lỗi khi tải kế hoạch thực đơn';
  } finally {
    loading.value = false;
  }
};

const fetchCalculationResult = async () => {
  if (!userId.value) return;

  try {
    const response = await getCalculationResultApi(userId.value, mealPlanId.value);
    calculationResult.value = response.data.data || null;
  } catch (error) {
    console.error('Lỗi khi lấy kết quả tính toán:', error);
    errorMessage.value = 'Lỗi khi lấy kết quả tính toán';
  }
};


const refreshData = async () => {
  await fetchMealPlan();
};
onMounted(() => {
  fetchMealPlan();
  fetchCalculationResult();
});
</script>

<style scoped>
.container {
  overflow-x: hidden;
  position: relative;
}

.meal-plan-page {
  padding: 2rem;
  background-color: #ffffff;
  min-height: 100vh;
}

.title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #10b981;
  margin-bottom: 2rem;
}

.day-plan {
  margin-bottom: 2.5rem;
  border: 1px solid #d1fae5;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f0fdf4;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
  z-index: 10;
}

.day-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #047857;
  margin-bottom: 1.5rem;
}

.nutrition-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #064e3b;
  padding: 1rem;
  background-color: rgba(167, 243, 208, 0.2);
  border-radius: 8px;
}

.meal-group {
  margin-bottom: 1.5rem;
}

.meal-time-section {
  padding: 1rem;
  border-left: 4px solid #10b981;
  background-color: #ecfdf5;
  border-radius: 8px;
}

.hero-bg {
  position: absolute;
  top: -30%;
  right: -5%;
  width: 45%;
  z-index: 1;
  opacity: 0.8;
}

.summary-box {
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.1);
  z-index: 10;
}

.summary-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #065f46;
  margin-bottom: 1.5rem;
}

.summary-list {
  list-style: none;
  padding: 0;
  font-size: 1.1rem;
  color: #064e3b;
  line-height: 2rem;
}

.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  color: #dc2626;
  margin: 2rem 0;
}
.meal-time-note {
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  font-style: italic;
  margin-bottom: 1rem;
}

</style>