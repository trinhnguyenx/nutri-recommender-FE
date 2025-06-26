<template>
  <div class="form">
    <h2>Thông tin cá nhân</h2>
    <form @submit.prevent="submit">
      <label>Họ:</label>
      <input v-model="form.last_name" />

      <label>Tên:</label>
      <input v-model="form.first_name" />

      <label>Email:</label>
      <input v-model="form.email" type="email" />

      <label>Tuổi:</label>
      <input v-model.number="form.age" type="number" disabled />

      <label>Chiều cao (cm):</label>
      <input v-model.number="form.height" type="number" disabled />

      <label>Cân nặng (kg):</label>
      <input v-model.number="form.weight" type="number" disabled />

      <label>Mục tiêu cân nặng:</label>
      <input v-model.number="form.weightTarget" type="number" disabled />

      <label>Giới tính:</label>
      <input :value="genderText" disabled />

      <label>Mức độ hoạt động:</label>
      <input v-model="activityText" disabled />

      <label>Nguyên liệu dị ứng:</label>
      <input v-model="allergiesText" disabled />
    </form>

    <div class="buttons-action">
      <button @click="submit">Cập nhật</button>
    </div>
  </div>
</template>


<script setup>
import { reactive, computed, watch } from 'vue';

const props = defineProps({
  user: Object
});
const emit = defineEmits(['update']);

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  gender: '',
  age: 0,
  height: 0,
  weight: 0,
  weightTarget: 0,
  goal: '',
  activityLevel: '',
  allergies: [],
});

watch(
  () => props.user,
  (newVal) => {
    if (newVal) Object.assign(form, newVal);
  },
  { immediate: true, deep: true }
);

const allergiesText = computed({
  get: () => form.allergies?.join(', ') || 'Không có',
  set: (val) => {
    form.allergies = val.split(',').map((s) => s.trim());
  }
});

const genderText = computed(() => {
  if (form.gender === 'Male') return 'Nam';
  if (form.gender === 'Female') return 'Nữ';
  return 'Nữ';
});

const activityMap = {
  sedentary: 'Ít vận động',
  light: 'Hoạt động nhẹ nhàng',
  moderate: 'Hoạt động vừa phải',
  veryactive: 'Hoạt động rất nhiều'
};
const activityText = computed(() => activityMap[form.activityLevel] || 'Không rõ');

function submit() {
  emit('update', {
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email
  });
}
</script>


<style scoped>
.form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.form h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 1.5rem;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
  display: block;
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  background: #f9fafb;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus,
select:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  outline: none;
}
.buttons-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

button {
  grid-column: span 2;
  background: linear-gradient(90deg, #4caf50 0%, #2e7d32 100%);
  color: #ffffff;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.3s;


}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

button:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .form {
    padding: 1.5rem;
  }

  .form h2 {
    font-size: 1.3rem;
  }

  form {
    grid-template-columns: 1fr;
  }

  button {
    grid-column: span 1;
    padding: 0.65rem;
    font-size: 0.9rem;
  }
}
</style>