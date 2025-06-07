<template>
  <div class="container">
    <h1 class="title">Chăm sóc dinh dưỡng thông minh, mỗi ngày thêm khỏe mạnh.</h1>
    <p class="subtitle">
      Truy cập thực đơn đa dạng theo tuần, tháng, nhận gợi ý đổi món và hỗ trợ chatbot dinh dưỡng 24/7. Cùng công nghệ nhận diện hình ảnh để quản lý nguyên liệu dễ dàng.
    </p>

    <div class="plans">
      <!-- Free Plan -->
      <div class="plan basic">
        <h2>Miễn phí</h2>
        <p class="price">0₫<span>/tháng</span></p>
        <ul>
          <li>Thực đơn cơ bản theo tuần</li>
          <li>Chatbot tư vấn dinh dưỡng giới hạn</li>
          <li>Nhận diện nguyên liệu từ hình ảnh (giới hạn)</li>
        </ul>
        <button>Đang sử dụng</button>
      </div>

      <!-- Premium Plan -->
      <div class="plan pro">
        <div class="plan-header">
          <h2>Premium</h2>
          <span class="badge">Phổ biến nhất</span>
        </div>
        <p class="price">5.000₫<span>/tháng</span></p>
        <ul>
          <li>Thực đơn đa dạng theo tuần, tháng, tùy chỉnh cá nhân</li>
          <li>Chatbot dinh dưỡng hỗ trợ 24/7</li>
          <li>Đổi món linh hoạt theo sở thích và nguyên liệu sẵn có</li>
          <li>Nhận diện nguyên liệu từ hình ảnh không giới hạn</li>
          <li>Hỗ trợ tư vấn chuyên sâu từ chuyên gia dinh dưỡng</li>
        </ul>
        <button @click="handleProPayment">Đăng ký ngay</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useUserStore } from '@/store/user.store.ts';
import { createPaymentIntentApi } from '@/services/api.ts';

const userStore = useUserStore();
const email = userStore.user?.email || '';
const name = userStore.user?.last_name || '';
console.log('User Email:', email);
console.log('User Name:', name);

const handleProPayment = async () => {
  try {
    const response = await createPaymentIntentApi(email, name);
    console.log('Payment Intent:', response.data);
    window.location.href = response.data.checkoutUrl;
  } catch (error) {
    console.error('Payment error:', error);
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0fdf4, #fefce8);
  padding: 3rem 1.5rem;
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #14532d;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.plans {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .plans {
    grid-template-columns: repeat(2, 1fr);
  }
}

.plan {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.plan:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.plan h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.plan .price {
  font-size: 2rem;
  font-weight: 800;
  color: #16a34a;
  margin: 1rem 0;
}

.plan .price span {
  font-size: 0.875rem;
  font-weight: normal;
  color: #6b7280;
}

.plan ul {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  color: #374151;
  text-align: left;
}

.plan ul li {
  margin-bottom: 0.75rem;
  padding-left: 1.25rem;
  position: relative;
}

.plan ul li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.plan button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.plan button:hover {
  transform: scale(1.02);
}

.plan.basic button {
  background: #e5e7eb;
  color: #1f2937;
}

.plan.pro {
  background: linear-gradient(to top right, #ecfccb, #fde68a);
  position: relative;
  border: 2px solid #a3e635;
}

.plan.pro button {
  background: #16a34a;
  color: white;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  background: #22c55e;
  color: white;
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  font-weight: bold;
  text-transform: uppercase;
}

</style>