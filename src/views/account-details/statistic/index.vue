<template>
  <div class="stats">
    <h2>📊 Thống kê</h2>

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
    </div>

    <div v-else class="non-premium-message">
      <p>Bạn cần nâng cấp lên gói <strong>Premium</strong> để xem thống kê chi tiết.</p>
      <router-link to="/payment-prenium">
        <button class="upgrade-button">🔒 Nâng cấp lên Premium</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
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
const userStore = useUserStore();

const is_prenium = userStore.user?.is_prenium || false;

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

// Toggle state
const mode = ref('day');

// === Calo theo bữa mỗi ngày ===
const caloPerDayData = {
  labels: ['1/6', '2/6', '3/6', '4/6', '5/6', '6/6', '7/6'],
  datasets: [
    { label: 'Sáng', backgroundColor: '#34d399', data: [300, 320, 290, 310, 350, 300, 330] },
    { label: 'Trưa', backgroundColor: '#60a5fa', data: [600, 650, 630, 610, 670, 620, 640] },
    { label: 'Tối', backgroundColor: '#fbbf24', data: [500, 480, 510, 530, 490, 500, 520] },
  ],
};

// === Calo tổng vs mục tiêu mỗi ngày ===
const caloPerWeekData = {
  labels: ['1/6', '2/6', '3/6', '4/6', '5/6', '6/6', '7/6'],
  datasets: [
    {
      label: 'Calo đã nạp',
      borderColor: '#34d399',
      backgroundColor: 'rgba(52, 211, 153, 0.2)',
      fill: true,
      data: [1400, 1450, 1430, 1450, 1510, 1420, 1490],
    },
    {
      label: 'Calo mục tiêu',
      borderColor: '#ef4444',
      borderDash: [5, 5],
      data: [1600, 1600, 1600, 1600, 1600, 1600, 1600],
    },
  ],
};

// === Cân nặng theo thời gian ===
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
.toggle-buttons button.active {
  font-weight: bold;
  background-color: #ddd;
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
</style>
