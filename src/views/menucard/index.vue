<template>
  <div class="meal-card">
    <h3 class="meal-type">
      <span class="meal-icon">{{ mealIcon }}</span> {{ mealTimeLabel }}
    </h3>
    <div class="meal-list">
      <div v-if="!props.allowSwap" class="swap-info-box">
        <p class="info-title">🔄 Muốn thay đổi món ăn theo sở thích?</p>
        <p class="info-desc">Tính năng <strong>Đổi món</strong> giúp bạn linh hoạt lựa chọn bữa ăn phù hợp với khẩu vị và nhu cầu dinh dưỡng cá nhân.</p>
        <RouterLink to="/payment-prenium">
          <button class="upgrade-button">Nâng cấp để sử dụng</button>
        </RouterLink>
    </div>
      <div v-for="meal in meals" :key="meal.meal_id" :class="['meal-item', { 'dessert-item': meal.meal_type === 'dessert' }]">
        <p class="meal-name">{{ formattedMealName(meal) }}</p>
        <p class="ingredients">📋 {{ meal.ingredients }}</p>
        <button
          v-if="props.allowSwap"
          class="swap-button"
          @click="openSwapModal(meal)"
        >
          🔄 Đổi món
        </button>      
      </div>
    </div>
  
    <div class="nutrition-summary">
      <p><strong>🔥 Tổng Calo:</strong> {{ totalNutrition.calories.toFixed(1) }} kcal</p>
      <p><strong>🥩 Tổng Protein:</strong> {{ totalNutrition.protein.toFixed(1) }} g</p>
      <p><strong>🧈 Tổng Fat:</strong> {{ totalNutrition.fat.toFixed(1) }} g</p>
      <p><strong>🍞 Tổng Carbs:</strong> {{ totalNutrition.carbs.toFixed(1) }} g</p>
    </div>
  </div>
  <!-- // Modal for meal swap suggestions -->
 <div v-if="showSwapModal" class="swap-modal" @click="showSwapModal = false">
  <div class="modal-content">
    <h3 class="modal-title">🔄 Chọn món thay thế</h3>
    <div v-if="loadingSuggestions" class="loading-text">Đang tải gợi ý...</div>
    <ul v-else class="suggested-list">
      <li v-for="item in suggestedMeals" :key="item.id" class="suggested-item">
        <p class="meal-name">{{ item.name }}</p>
        <p class="ingredients">📋 {{ item.ingredients }}</p>
        <div class="nutrition-summary">
          <p><strong>🔥 Calories:</strong> {{ item.calories.toFixed(1) }} kcal</p>
          <p><strong>🥩 Protein:</strong> {{ item.protein.toFixed(1) }} g</p>
          <p><strong>🧈 Fat:</strong> {{ item.fat.toFixed(1) }} g</p>
          <p><strong>🍞 Carbs:</strong> {{ item.carbs.toFixed(1) }} g</p>
        </div>
        <button class="choose-button" @click="handleMealSwap(item.id)">Chọn món này</button>
      </li>
    </ul>
    <button class="close-button" @click="showSwapModal = false">Đóng</button>
  </div>
</div>


</template>

<script setup>
import { ref, computed } from 'vue';
import { getSuggestedMealsApi, updateMealSwapApi } from '@/services/api';
import { useUserStore } from '@/store/user.store';
import { all } from 'axios';

const userStore = useUserStore();

const showSwapModal = ref(false);
const selectedMealId = ref('');
const suggestedMeals = ref([]);
const loadingSuggestions = ref(false);
const allergies = userStore.user?.allergies || [];

const emit = defineEmits(["meal-swapped"]);
const props = defineProps({
  meals: {
    type: Array,
    required: true,
    default: () => []
  },
  type: {
    type: String,
    required: true
  },
  allowSwap: {
    type: Boolean,
    default: false
  }
});

const mealIconMap = {
  breakfast: '🍳',
  snack1: '🥪',
  lunch: '🍚',
  snack2: '🥪',
  dinner: '🍽️',
  snack3: '🥪'
};

const mealIcon = computed(() => mealIconMap[props.type.toLowerCase()] || '🍴');

const mealTimeLabel = computed(() => {
  const typeMap = {
    breakfast: 'Bữa sáng',
    snack1: 'Bữa phụ 1',
    lunch: 'Bữa trưa',
    snack2: 'Bữa phụ 2',
    dinner: 'Bữa tối',
    snack3: 'Bữa phụ 3'
  };
  return typeMap[props.type.toLowerCase()] || props.type;
});

const totalNutrition = computed(() => {
  return props.meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + (meal.calories || 0),
      protein: acc.protein + (meal.protein || 0),
      fat: acc.fat + (meal.fat || 0),
      carbs: acc.carbs + (meal.carbs || 0)
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
});

const formattedMealName = (meal) => {
  if (meal.meal_type === 'dessert') {
    switch (props.type.toLowerCase()) {
      case 'breakfast':
        return `Tráng miệng sáng: ${meal.name}`;
      case 'lunch':
        return `Tráng miệng trưa: ${meal.name}`;
      case 'dinner':
        return `Tráng miệng tối: ${meal.name}`;
      default:
        return `Tráng miệng: ${meal.name}`;
    }
  }
  return meal.name;
};

const openSwapModal = async (meal) => {
  selectedMealId.value = meal.mealPlanMealId;
  showSwapModal.value = true;
  loadingSuggestions.value = true;

  try {
    const response = await getSuggestedMealsApi(
      meal.meal_id,
      meal.meal_type,
      meal.calories,
      allergies
    );
    suggestedMeals.value = response.data.data;
  } catch (e) {
    console.error("Lỗi khi lấy món thay thế:", e);
    suggestedMeals.value = [];
  } finally {
    loadingSuggestions.value = false;
  }
};

const handleMealSwap = async (newMealId) => {
  try {
    console.log("Đang cập nhật món ăn với ID:", selectedMealId.value, "thành ID mới:", newMealId);
    await updateMealSwapApi(selectedMealId.value, newMealId);
    showSwapModal.value = false;
    emit("meal-swapped");

  } catch (e) {
    console.error("Lỗi khi cập nhật món ăn:", e);
  }
};




</script>

<style scoped>
.meal-card {
  background-color: #f0fdf4;
  border: 1px solid #6ee7b7;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  margin-bottom: 1rem;
}

.meal-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(52, 211, 153, 0.3);
}

.meal-type {
  text-transform: capitalize;
  color: #10b981;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.meal-icon {
  font-size: 1.3rem;
  margin-right: 0.5rem;
}

.meal-list {
  margin-bottom: 1rem;
}

.meal-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.meal-item:last-child {
  border-bottom: none;
}

.dessert-item {
  margin-left: 1rem;
  border-left: 2px dashed #a7f3d0;
  padding-left: 0.5rem;
}

.meal-name {
  font-size: 1rem;
  font-weight: 600;
  color: #065f46;
}

.ingredients {
  font-style: italic;
  color: #4b5563;
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.nutrition-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 1rem;
  background-color: #ecfdf5;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #064e3b;
}

.swap-button {
  margin-top: 5px;
  padding: 4px 8px;
  background-color: #f0ad4e;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.swap-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: #f0fdf4;
  border: 1px solid #6ee7b7;
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.15);
}

.modal-title {
  color: #10b981;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.loading-text {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  margin-bottom: 1rem;
}

.suggested-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggested-item {
  border-bottom: 1px solid #d1fae5;
  padding: 1rem 0;
}

.suggested-item:last-child {
  border-bottom: none;
}

.meal-name {
  font-size: 1rem;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 0.3rem;
}

.ingredients {
  font-style: italic;
  color: #4b5563;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.nutrition-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  background-color: #ecfdf5;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 0.9rem;
  color: #064e3b;
  margin-bottom: 0.5rem;
}

.choose-button {
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.choose-button:hover {
  background-color: #059669;
}

.close-button {
  display: block;
  margin: 1rem auto 0;
  padding: 8px 16px;
  background-color: #f87171;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: #ef4444;
}

.swap-info-box {
  background-color: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
  color: #92400e;
  font-size: 0.95rem;
  text-align: center;
}

.info-title {
  font-weight: bold;
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
}

.info-desc {
  margin-bottom: 1rem;
}

.upgrade-button {
  background-color: #f59e0b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upgrade-button:hover {
  background-color: #d97706;
}


</style>