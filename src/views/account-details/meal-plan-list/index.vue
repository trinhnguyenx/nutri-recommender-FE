<template>
  <div class="meal-plan-list-wrapper">
    <h2 class="section-title">📅 Danh sách kế hoạch bữa ăn</h2>

    <div class="plan-card-list">
      <div
        v-for="plan in mealPlans"
        :key="plan.id"
        class="plan-card"
        @click="gotoDetailMeal(plan.id)"
      >
        <div class="title-row">
          <template v-if="editingPlanId === plan.id">
            <input
              v-model="editedName"
              class="edit-input"
              @keyup.enter="saveName(plan)"
              @click.stop
            />
            <button class="save-btn" @click.stop="saveName(plan)">✅</button>
          </template>
          <template v-else>
            <h3 class="plan-title">
              {{ plan.name }}
              <span v-if="plan.is_active" class="active-label">
                (Đang áp dụng ✅)</span
              >
            </h3>
            <button class="edit-btn" @click.stop="startEditing(plan)">
              ✏️
            </button>
          </template>
        </div>

        <p class="plan-date">📆 Bắt đầu: {{ formatDate(plan.start_date) }}</p>
        <p class="plan-goal">
          🎯 Mục tiêu:
          {{
            plan.targetCalories > plan.maintenanceCalories
              ? "Tăng cân"
              : plan.targetCalories < plan.maintenanceCalories
              ? "Giảm cân"
              : "Giữ cân"
          }}
        </p>
        <p class="plan-kcal">
          🔥 Mục tiêu: {{ plan.targetCalories.toFixed(0) }} kcal
        </p>
      </div>
    </div>

    <div v-if="!mealPlans.length" class="no-plans">Không có kế hoạch nào.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMealPlansApi, updateNameMealApi } from "@/services/api";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const userId = userStore.user?.id || "";
const mealPlans = ref([]);
const editingPlanId = ref(null);
const editedName = ref("");

const gotoDetailMeal = (idMealPlan) => {
  router.push({ name: "Recommend", params: { id: idMealPlan } });
};

const startEditing = (plan) => {
  editingPlanId.value = plan.id;
  editedName.value = plan.name;
};

const saveName = async (plan) => {
  if (!editedName.value.trim() || editedName.value === plan.name) {
    editingPlanId.value = null;
    return;
  }

  try {
    await updateNameMealApi(plan.id, editedName.value.trim());
    plan.name = editedName.value.trim();
    editingPlanId.value = null;
  } catch (error) {
    console.error("Lỗi khi cập nhật tên kế hoạch:", error);
  }
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return isNaN(d) ? dateStr : d.toLocaleDateString("vi-VN");
};

onMounted(async () => {
  try {
    const { data } = await getMealPlansApi(userId);
    mealPlans.value = (data.data || []).sort((a, b) => {
      // Active lên trước
      if (a.is_active && !b.is_active) return -1;
      if (!a.is_active && b.is_active) return 1;
      return 0;
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách kế hoạch:", error);
  }
});
</script>

<style scoped>
.meal-plan-list-wrapper {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 2rem;
  color: #047857;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
}

.plan-card-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.plan-card {
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
  transition: transform 0.2s ease;
  position: relative;
  cursor: pointer;
}

.plan-card:hover {
  transform: translateY(-4px);
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.plan-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #065f46;
  margin: 0;
  flex: 1;
}

.edit-btn,
.save-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 0.5rem;
  transition: transform 0.2s;
}

.edit-btn:hover,
.save-btn:hover {
  transform: scale(1.1);
}

.edit-input {
  flex: 1;
  font-size: 1.1rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid #10b981;
  border-radius: 8px;
  background-color: #fff;
  outline: none;
}

.plan-card p {
  margin: 0.4rem 0;
  font-size: 1rem;
  color: #064e3b;
}

.no-plans {
  text-align: center;
  font-size: 1.3rem;
  color: #6b7280;
  margin-top: 1.5rem;
}
.active-label {
  font-size: 0.9rem;
  color: #10b981;
  margin-left: 0.4rem;
}

</style>
