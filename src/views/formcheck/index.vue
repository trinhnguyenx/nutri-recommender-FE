<template>
  <Teleport to="body">
    <div>
      <!-- Nút nổi -->
      <div v-if="isLoggedIn" class="floating-btn" @click="show = true">📝</div>

      <!-- Popup -->
      <div v-if="show" class="overlay" @click.self="close">
        <div class="popup daily-form">
          <h2>📝 Nhập dữ liệu hôm nay</h2>

          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="weight">⚖️ Cân nặng hôm nay (kg):</label>
              <input
                type="number"
                id="weight"
                v-model="form.weight"
                min="30"
                max="200"
                step="0.1"
                required
              />
            </div>

            <div class="form-group">
              <label>🍽️ Bạn đã ăn đủ 3 bữa chưa?</label>
              <div class="radio-group">
                <label><input type="radio" value="yes" v-model="form.meals" /> Có</label>
                <label><input type="radio" value="no" v-model="form.meals" /> Không</label>
              </div>
            </div>

            <!-- Nếu người dùng chọn "Không" thì hiện 4 ô nhập -->
            <div v-if="form.meals === 'no'" class="form-group extra-calories">
              <label>📊 Nhập lượng calo bạn đã ăn hôm nay:</label>
              <div class="sub-group">
                <label for="caloBreakfast">🍳 Bữa sáng (kcal):</label>
                <input type="number" id="caloBreakfast" v-model.number="form.caloBreakfast" min="0" />
              </div>
              <div class="sub-group">
                <label for="caloLunch">🍛 Bữa trưa (kcal):</label>
                <input type="number" id="caloLunch" v-model.number="form.caloLunch" min="0" />
              </div>
              <div class="sub-group">
                <label for="caloDinner">🍜 Bữa tối (kcal):</label>
                <input type="number" id="caloDinner" v-model.number="form.caloDinner" min="0" />
              </div>
              <div class="sub-group">
                <label for="caloSnack">🥤 Bữa phụ (tổng kcal):</label>
                <input type="number" id="caloSnack" v-model.number="form.caloSnack" min="0" />
              </div>
            </div>

            <div class="form-group">
              <label>🤒 Bạn có đang bệnh không?</label>
              <div class="radio-group">
                <label><input type="radio" value="yes" v-model="form.sick" /> Có</label>
                <label><input type="radio" value="no" v-model="form.sick" /> Không</label>
              </div>
            </div>

            <div class="form-group">
              <label>🛌 Bạn có ngủ đủ giấc không?</label>
              <div class="radio-group">
                <label><input type="radio" value="yes" v-model="form.sleep" /> Có</label>
                <label><input type="radio" value="no" v-model="form.sleep" /> Không</label>
              </div>
            </div>

            <div class="form-group">
              <label for="hunger">🍔 Mức độ đói hiện tại của bạn:</label>
              <select id="hunger" v-model="form.hunger">
                <option value="very_hungry">Rất đói</option>
                <option value="hungry">Đói</option>
                <option value="neutral">Bình thường</option>
                <option value="full">Hơi no</option>
                <option value="very_full">Rất no</option>
              </select>
            </div>

            <button type="submit">✅ Gửi dữ liệu</button>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {recordUserProgressApi} from '@/services/api'
import { useUserStore } from '@/store/user.store';
import { ElNotification } from "element-plus";

const userStore = useUserStore();
const userId = userStore.user?.id || '';
const show = ref(false)

const form = reactive({
  weight: '',
  meals: '',
  sick: '',
  sleep: '',
  hunger: 'neutral',
  note: '',
  caloBreakfast: 0,
  caloLunch: 0,
  caloDinner: 0,
  caloSnack: 0,
})

const close = () => {
  show.value = false
}

const isLoggedIn = userStore.isLoggedIn;

const submitForm = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const lastSubmittedDate = localStorage.getItem('dailyFormDate');

  if (lastSubmittedDate === today) {
    alert('❗Bạn đã gửi dữ liệu hôm nay rồi. Hãy quay lại vào ngày mai.');
    return;
  }

  const payload = {
    ...form,
    meals: form.meals === 'yes',
    sick: form.sick === 'yes',
    sleep: form.sleep === 'yes',
  };

  try {
    await recordUserProgressApi(userId, payload);
    console.log("✅ Gửi dữ liệu thành công:", payload);

        ElNotification({
        title: 'Thành công',
        message: 'Tiến trình của bạn đã được cập nhật!',
        type: 'success',
      });

    localStorage.setItem('dailyFormDate', today);
    close();
  } catch (error) {
    console.error("❌ Gửi dữ liệu thất bại:", error);
  }
};



</script>

<style scoped>
/* Nút nổi */
.floating-btn {
  position: fixed;
  bottom: 5rem;
  right: 24px;
  background: #10b981;
  color: white;
  width: 52px;
  height: 52px;
  font-size: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
}
.floating-btn:hover {
  background: #059669;
}

/* Nền mờ popup */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Style form chính */
.daily-form {
  max-width: 600px;
  width: 90%;
  padding: 1.5rem;
  border-radius: 16px;
  background: #e8fef1;
  border: 1px solid #c5f1db;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  color: #1e4d3d;
}

.daily-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #15803d;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

input[type='number'],
select,
textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #b2e4cc;
  border-radius: 10px;
  background: #f0fdf4;
  transition: border 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #34d399;
  outline: none;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.3rem;
}

.radio-group label {
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

textarea {
  min-height: 80px;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #10b981;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #059669;
}




</style>
