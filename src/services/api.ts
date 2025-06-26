import axiosApiInstance from "../api";
import type { ILogin, ISignUp } from "../types/user";
import type { Infor } from "../types/meal";
import type { MessageInput, Message } from "../types/chatbot";
import axios from "axios";
axios.defaults.URL = import.meta.env.VITE_API_URL;

//User
export const loginApi = async (data: ILogin) => {
  return await axiosApiInstance.post("/auth/login/", data);
};
export const registerApi = async (data: ISignUp) => {
  return await axiosApiInstance.post("/auth/register/", data);
};
export const getUserApibyID = async (userId: string) => {
  return await axiosApiInstance.get(`/auth/user/${userId}`);
};
export const updatePartUserApi = async (userId: string, data: ISignUp) => {
  return await axiosApiInstance.patch(`/auth/user/${userId}`, data);
};

export const updatePreniumApi = async (userId: string, isPremium: boolean) => {
  return await axiosApiInstance.patch(`/auth/user/${userId}`, {
    is_premium: isPremium,
  });
};

// meal
export const recommendApi = async (data: Infor) => {
  return await axiosApiInstance.post("/calories/calculate/", data);
};
export const getMealsApi = async (mealPlanId: string) => {
  return await axiosApiInstance.get(`/calories/meal-menu/${mealPlanId}`);
};
export const getMealPlansApi = async (userId: string) => {
  return await axiosApiInstance.get(`/calories/meal-plans/${userId}`);
};
export const getCalculationResultApi = async (userId: string, mealPlanId: string) => {
  return await axiosApiInstance.get(`/calories/calculation-result`, {
    params: { userId, mealPlanId }
  });
};  

export const getDayNumberApi = async (userId:any) => {
  return await axiosApiInstance.get(`/calories/largest-day/${userId}`);
};

export const setFavoriteMealApi = async (mealId: string, userId: string, isFavorite: boolean) => {
  return await axiosApiInstance.put("/calories/favorite-meal", {
    mealId,
    userId,
    isFavorite,
  });
}

export const deleteMealPlanApi = async (mealPlanId: string, userId: string) => {
  return await axiosApiInstance.delete("/calories/meal-plan/delete", {
    params: {
      mealPlanId,
      userId,
    },
  });
}


export const getSuggestedMealsApi = async (
  mealId: string,
  mealType: string,
  currentCalories: number | undefined,
  allergies: string[]
) => {
  if (typeof currentCalories !== "number") {
    throw new Error("currentCalories must be a number");
  }

  const params = new URLSearchParams({
    mealId,
    mealType,
    currentCalories: currentCalories.toString(),
  });

  if (allergies.length > 0) {
    params.append("allergies", allergies.join(","));
  }

  return await axiosApiInstance.get(
    `/calories/suggested-meals?${params.toString()}`
  );
};

export const updateMealSwapApi = (
  mealPlanMealId: string,
  newMealId: string
) => {
  return axiosApiInstance.put("/calories/update/new-meal", {
    mealPlanMealId,
    newMealId,
  });
};

export const updateNameMealApi = (
  mealPlanId: string,
  newName: string
) => {
  return axiosApiInstance.put("/calories/update/meal-plan-name", {
    mealPlanId,
    newName,
  });
};

// chatbot
export const sendMesssageApi = async (data: MessageInput) => {
  return await axiosApiInstance.post("/chatbot/message/", data);
};
export const getMessagesApi = async (conversationId: string) => {
  return await axiosApiInstance.get(`/chatbot/messages/${conversationId}`);
};
export const getConversationsApi = async (userId: string) => {
  return await axiosApiInstance.get(`/chatbot/conversations/${userId}`);
};
export const createMessageApi = async (data: Message) => {
  return await axiosApiInstance.post("/chatbot/create-message", data);
}
export const addIngredientApi = async (message: string, conversationId: string, userId: string) => {
  return await axiosApiInstance.post("chatbot/add-ingredients", {  
    message,
    conversationId,
    userId
  });
}
export const getchatbotstatisticsApi = async (message: string) => {
  return await axiosApiInstance.post(`/chatbot/statistics`, {message});
}

// payment
export const createPaymentIntentApi = async (
  buyerEmail: string,
  buyerName: string,
  userId: string
) => {
  return await axiosApiInstance.post(`payos/create-payment/`, {
    buyerEmail,
    buyerName,
    userId
  });
};
//statistics
export const recordUserProgressApi = (
  userId: string,
  {
    weight,
    meals,
    sick,
    sleep,
    hunger,
    note,
    caloBreakfast,
    caloLunch,
    caloDinner,
    caloSnack,
  }: {
    weight: number | string;
    meals: string;
    sick?: string;
    sleep?: string;
    hunger?: string;
    note?: string;
    caloBreakfast?: number;
    caloLunch?: number;
    caloDinner?: number;
    caloSnack?: number;
  }
) => {
  return axiosApiInstance.post("/calories/progress/record", {
    userId,
    weight,
    meals,
    sick,
    sleep,
    hunger,
    note,
    caloBreakfast,
    caloLunch,
    caloDinner,
    caloSnack,
  });
};

export const getUserProgress = async (userId: string) => {
  return await axiosApiInstance.get(`/calories/progress/${userId}`);
};
