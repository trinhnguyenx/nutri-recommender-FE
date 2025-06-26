<template>
  <div class="big-container">
    <Header />
    <img src="@/assets/img/hero.svg" class="hero-bg" alt="hero background" />
    <div class="container">
      <div class="form-box">
        <form @submit.prevent="handleSubmit">
          <h1 class="h1-content">🥗 Let's calculate your calories!</h1>
          <label>
            🥗Name Plan
            <input v-model="form.planName" />
          </label>

          <label>
            🧍‍♂️Height (cm)
            <input v-model.number="form.height" type="number" placeholder="Enter your height" required />
          </label>

          <label>
            ⚖️Weight (kg)
            <input v-model.number="form.weight" type="number" placeholder="Enter your weight" required />
          </label>

          <label>
            🎯Target Weight (kg)
            <input v-model.number="form.weightTarget" type="number" placeholder="Enter target weight" required />
          </label>

          <label>
            🎂Age
            <input v-model.number="form.age" type="number" placeholder="Enter your age" required />
          </label>

          <label>
            🧬Gender
            <select v-model="form.gender" required>
              <option disabled value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label>
            📈Weekly Gain Rate (kg/week)
            <select v-model="form.weeklyGainRate" required>
              <option disabled :value="undefined">Select rate</option>
              <option :value="0.5">0.5kg/week</option>
              <option :value="0.75">0.75kg/week</option>
              <option :value="1">1.0kg/week</option>
            </select>
          </label>

          <label>
            🏃‍♂️Activity Level
            <select v-model="form.activityLevel">
              <option disabled value="">Select activity level</option>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly Active (1-3 days/week)</option>
              <option value="moderate">Moderately Active (3-5 days/week)</option>
              <option value="veryActive">Very Active (6-7 days/week)</option>
            </select>
          </label>

          <label>
            🚫Allergies (optional, comma separated)
            <textarea v-model="allergyInput" placeholder="E.g. peanuts, dairy"></textarea>
          </label>

          <!-- Upgrade notice or instruction -->
          <p v-if="mealPlanCount > 0" class="subtitle">
            Vui lòng điền đầy đủ thông tin để tạo thực đơn phù hợp nhất với bạn!
          </p>
          <div v-else class="upgrade-box">
            <p class="upgrade-title">🎉 Bạn đã sử dụng hết lượt tạo thực đơn miễn phí.</p>
            <p class="upgrade-subtitle">
              Hãy nâng cấp lên tài khoản <strong>Premium</strong> để tiếp tục khám phá các thực đơn cá nhân hóa và nâng cao trải nghiệm dinh dưỡng của bạn.
            </p>
            <RouterLink to="/payment-prenium">
              <button class="upgrade-button">🚀 Nâng cấp ngay</button>
            </RouterLink>
          </div>

          <!-- Hide submit button if no more count -->
        <button v-if="mealPlanCount > 0" type="submit" :disabled="isLoading">
          <span v-if="isLoading">⏳ Đang xử lý...</span>
          <span v-else>👉Submit</span>
</button>        </form>
      </div>

      <div class="img-right">
        <img src="@/assets/img/exercise.svg" alt="Exercise" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import type { Infor } from "../../types/meal";
import { recommendApi } from "../../services/api";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user.store";
import Header from "../../views/headerpage/index.vue";

const isLoading = ref(false);

const router = useRouter();
const allergyInput = ref("");
const userStore = useUserStore();
const mealPlanCount = userStore.user?.meal_plan_count || 0;
const form = ref<Infor>({
  height: 0,
  weight: 0,
  age: 0,
  gender: "",
  weightTarget: 0,
  activityLevel: "",
  allergies: [],
  weeklyGainRate: undefined,
  userId: userStore.user?.id || "",
  planName: "",
});


const handleSubmit = async () => {
  form.value.allergies = allergyInput.value.trim()
    ? allergyInput.value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [];

  isLoading.value = true;
  try {
    const response = await recommendApi(form.value);
    router.push({
      name: "Recommend",
      params: { id: response.data.data.mealPlanId },
    });
  } catch (error) {
    console.error("API error:", error);
  } finally {
    isLoading.value = false;
  }
};

</script>

<style scoped>
.subtitle {
  background-color: #e0f2f1;
  border-left: 4px solid #26a69a;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #004d40;
  margin-top: 1rem;
  text-align: center;
}

.upgrade-box {
  background-color: #fffbea;
  border-left: 6px solid #fbbf24;
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.upgrade-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #b45309;
  margin-bottom: 1rem;
}

.upgrade-subtitle {
  color: #92400e;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.upgrade-button {
  background-color: #f59e0b;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.upgrade-button:hover {
  background-color: #d97706;
}

/* Existing styles (unchanged) */
body {
  font-family: "Nunito", sans-serif;
  background-color: #f0fdf4;
  margin: 0;
  padding: 0;
}
.big-container {
  position: relative;
  overflow: hidden;
}
.h1-content {
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #2e7d32;
  text-align: center;
  margin: 2rem 0 1rem;
}
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  padding: 2rem;
}
.form-box {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 0 2rem;
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  display: flex;
  flex-direction: column;
  color: #333;
  font-weight: 600;
  font-size: 0.95rem;
}
input,
select,
textarea {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 0.3rem;
  font-size: 0.95rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}
input:focus,
select:focus,
textarea:focus {
  border-color: #66bb6a;
  box-shadow: 0 0 5px rgba(102, 187, 106, 0.5);
  outline: none;
}
button {
  background: #4caf50;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 0.9rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 1rem;
}
button:hover {
  background: #43a047;
}
.img-right {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 50px 50px 0;
}
.img-right img {
  margin-top: 15rem;
  max-width: 95%;
}
.hero-bg {
  position: absolute;
  top: -10%;
  right: -8%;
  width: 40%;
  z-index: 0;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>