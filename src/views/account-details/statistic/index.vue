<template>
  <div class="stats">
    <h2>📊 Thống kê</h2>

    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>

    <div v-else>
      <div v-if="is_prenium">
        <div class="toggle-buttons">
          <button :class="{ active: mode === 'day' }" @click="mode = 'day'">Calo: Theo ngày</button>
          <button :class="{ active: mode === 'week' }" @click="mode = 'week'">Calo: Theo tuần</button>
          <button :class="{ active: mode === 'weight' }" @click="mode = 'weight'">⚖️ Cân nặng</button>
        </div>

        <Bar
          v-if="mode === 'day'"
          :data="caloPerDayData"
          :options="{ responsive: true, plugins: { legend: { position: 'top' } } }"
        />
        <Line
          v-else-if="mode === 'week'"
          :data="caloPerWeekData"
          :options="{ responsive: true, plugins: { legend: { position: 'top' } } }"
        />
        <Line
          v-else
          :data="weightData"
          :options="{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
              y: {
                suggestedMin: 48,
                suggestedMax: 54,
                title: {
                  display: true,
                  text: 'Kg'
                }
              }
            }
          }"
        />

        <!-- Popup AI -->
        <div v-if="showAIMessage" class="ai-popup">
          <button class="close-btn" @click="showAIMessage = false">✖</button>
          <h3>{{ aiAssessment?.title }}</h3>
          <p v-html="animatedMessage"></p>
        </div>
      </div>

      <div v-else class="non-premium-message">
        <p>Bạn cần nâng cấp lên gói <strong>Premium</strong> để xem thống kê chi tiết.</p>
        <router-link to="/payment-prenium">
          <button class="upgrade-button">🔒 Nâng cấp lên Premium</button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Bar, Line } from 'vue-chartjs';
import { useUserStore } from "@/store/user.store";
import { getStatisticsApi } from '@/services/api';

const userStore = useUserStore();

const is_prenium = userStore.user?.is_prenium || false;
const userId = userStore.user?.id || '';
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

const mode = ref('day');
const isLoading = ref(true);

const caloPerDayData = ref({ labels: [], datasets: [] });
const caloPerWeekData = ref({ labels: [], datasets: [] });
const aiAssessment = ref(null);
const animatedMessage = ref('');
const showAIMessage = ref(false);

if(is_prenium) {
onMounted(async () => {
  if (is_prenium) {
    isLoading.value = true;
    try {
      const response = await getStatisticsApi(userId);
      const statisticsData = response.data.data.calorieSummaryByDay;
      aiAssessment.value = response.data.data.aiAssessment;

      const labels = Object.values(statisticsData).map(item => {
        const date = new Date(item.created_at);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      });

      const breakfastCalories = Object.values(statisticsData).map(item => item.breakfast_calories);
      const lunchCalories = Object.values(statisticsData).map(item => item.lunch_calories);
      const dinnerCalories = Object.values(statisticsData).map(item => item.dinner_calories);
      const snackCalories = Object.values(statisticsData).map(item =>
        item.snack1_calories + item.snack2_calories + item.snack3_calories
      );

      caloPerDayData.value = {
        labels,
        datasets: [
          { label: 'Sáng', backgroundColor: '#34d399', data: breakfastCalories },
          { label: 'Trưa', backgroundColor: '#60a5fa', data: lunchCalories },
          { label: 'Tối', backgroundColor: '#fbbf24', data: dinnerCalories },
          { label: 'Bữa phụ', backgroundColor: '#f87171', data: snackCalories },
        ],
      };

      const totalDailyCalories = Object.values(statisticsData).map(item => item.total_daily_calories);
      const goalCalories = Object.values(statisticsData).map(item => item.targetCalories);

      caloPerWeekData.value = {
        labels,
        datasets: [
          {
            label: 'Calo đã nạp',
            borderColor: '#34d399',
            backgroundColor: 'rgba(52, 211, 153, 0.2)',
            fill: true,
            data: totalDailyCalories,
          },
          {
            label: 'Calo mục tiêu',
            borderColor: '#ef4444',
            borderDash: [5, 5],
            data: goalCalories,
          },
        ],
      };

      // Hiện popup từ từ
      showAIMessage.value = true;
      let index = 0;
      const formattedText = aiAssessment.value.reply
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  .replace(/\n/g, '<br>');
animatedMessage.value = '';
const interval = setInterval(() => {
  if (index < formattedText.length) {
    animatedMessage.value += formattedText[index++];
  } else {
    clearInterval(interval);
  }
}, 10);
  
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    } finally {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
});}

const weightData = {
  labels: ['1/6', '2/6', '3/6', '4/6', '5/6', '6/6', '7/6'],
  datasets: [
    {
      label: 'Cân nặng',
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      data: [50.2, 50.7, 51, 51.2, 51.6, 51.8, 52],
    },
    {
      label: 'Mục tiêu',
      borderColor: '#f43f5e',
      borderDash: [5, 5],
      data: [52, 52, 52, 52, 52, 52, 52],
    },
  ],
};
</script>

<style scoped>
.stats {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.toggle-buttons {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.toggle-buttons button {
  padding: 0.5rem 1rem;
  background-color: #e5e7eb;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-buttons button.active {
  background-color: #34d399;
  color: white;
}

.stats canvas {
  max-width: 100%;
  height: auto;
}

.non-premium-message {
  text-align: center;
  padding: 20px;
  background-color: #34d399;
  border: 1px solid #fcd34d;
  border-radius: 8px;
}

.upgrade-button {
  margin-top: 12px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #f59e0b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.upgrade-button:hover {
  background-color: #d97706;
}

/* Loading spinner */
.loading-overlay {
  text-align: center;
  padding: 2rem;
}

.spinner {
  margin: 0 auto 1rem;
  width: 48px;
  height: 48px;
  border: 6px solid #d1d5db;
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* AI popup */
.ai-popup {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fef3c7;
  border-left: 6px solid #f59e0b;
  border-radius: 12px;
  text-align: left;
  position: relative;
  animation: fadeIn 0.3s ease;
  white-space: pre-wrap;
}

.ai-popup h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.ai-popup p {
  line-height: 1.5;
  font-size: 1rem;
  color: #374151;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #9ca3af;
}

.close-btn:hover {
  color: #4b5563;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.ai-popup p strong {
  color: #b45309;
  font-weight: bold;
}

.ai-popup p {
  line-height: 1.6;
  font-size: 1rem;
  color: #1f2937;
}

</style>
