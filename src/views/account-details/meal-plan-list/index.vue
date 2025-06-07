<template>
  <div class="meal-list">
    <h2>Kế hoạch bữa ăn</h2>
    <ul>
      <li v-for="plan in mealPlans" :key="plan.id" @click="gotoDetailMeal(plan.id)">
        📅 {{ plan.start_date }} — {{ plan.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {getMealPlansApi} from '@/services/api';
import { useUserStore } from '@/store/user.store';
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const userId = userStore.user?.id || '';
const mealPlans = ref([]);

const gotoDetailMeal = (idMealPlan) => {
    router.push({
      name: "Recommend",
      params: { id: idMealPlan },
    });
}
onMounted(async () => {
  try {
    const { data } = await getMealPlansApi(userId);
    mealPlans.value = data.data;
  } catch (error) {
    console.error('Error fetching meal plans:', error);
  }
});

</script>


<style scoped>
.meal-list {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}

.meal-list h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 1rem;
}

.meal-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.meal-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: #f9fafb;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #374151;
  transition: background-color 0.3s, transform 0.2s;
}

.meal-list li:hover {
  background: #e8f5e9;
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 768px) {
  .meal-list {
    padding: 1rem;
  }

  .meal-list h2 {
    font-size: 1.3rem;
  }

  .meal-list li {
    font-size: 0.9rem;
    padding: 0.65rem 0.8rem;
  }
}
</style>