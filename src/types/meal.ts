export interface Infor {
    height: number;
    weight: number;
    age: number;
    gender: string;
    weightTarget: number;
    activityLevel?: string;
    allergies?: string[];
    weeklyGainRate?: undefined;
    userId?: string;
    planName?: string;
}
export interface CalorieResult {
  age: number;
  height: number;
  weight: number;
  gender: string;
  activityLevel: string;
  maintenanceCalories: number;
  targetCalories: number;
  goal: "gain" | "loss" | "maintenance";
  estimatedWeeklyChange: number;
  estimatedDaysToGoal: number;
  is_active: boolean;
  createdAt: string; 
  bmr: number
}

export interface MealPlanResponse {
  message: string;
  data: DayMealPlan[];
}

export interface DayMealPlan {
  day_number: number;
  date: string;
  meals: MealTimeEntry[];
}

export interface MealTimeEntry {
  meal_time: string;
  meal: Meal;

}

export interface Meal {
  meal_id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  ingredients: string;
  meal_type: string;
}

export interface MealEntry {
  meal_time: "breakfast" | "snack1" | "lunch" | "snack2" | "dinner" | "snack3";
  meal: Meal;
  mealPlanMealId: string;

}

export interface MealPlanDetail {
  day_number: number;
  date: string;
  meals: MealEntry[];
  totalCalories: number;
  totalNutrition: {
    protein: number;
    fat: number;
    carbs: number;
  };
  weeklyTotalCalories: number;
}

export interface MealPlanSummary {
  id: string;
  name: string;
  start_date: string;
  is_active: boolean;
}

export interface MealPlan {
  id: string;
  name: string;
  start_date: string;
  is_active: boolean;
}

// export interface GetSuggestedMealsParams {
//   mealId: string;
//   mealType: string;
//   currentCalories: number;
//   allergies: string[];
// }

// export interface UpdateMealSwapBody {
//   mealPlanMealId: string;
//   newMealId: string;
// }