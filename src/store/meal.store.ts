import { defineStore } from 'pinia';

export const MealStore = defineStore('meal', {
  state: () => ({
    idMealPlan: null as string | null,
    maintenanceCalories: null as number | null,
    targetCalories: null as number | null,
    estimatedWeeklyChange: null as number | null,
    estimatedDaysToGoal: null as number | null,
    goal: null as string | null,
  }),
  actions: {
    setMeal(mealId: string, maintenanceCalories: number, targetCalories: number, estimatedWeeklyChange: number, estimatedDaysToGoal: number, goal: string) {
      this.idMealPlan = mealId;
      this.maintenanceCalories = maintenanceCalories;
      this.targetCalories = targetCalories;
      this.estimatedWeeklyChange = estimatedWeeklyChange;
      this.estimatedDaysToGoal = estimatedDaysToGoal;
      this.goal = goal;
    },
  },
  persist: true,
});
