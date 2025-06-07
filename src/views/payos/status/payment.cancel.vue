<template>
  <div class="payment-result cancel">
    <h2>❌ Thanh toán bị hủy!</h2>
    <p>Bạn đã hủy quá trình thanh toán. Nếu có nhầm lẫn, hãy thử lại.</p>
    <RouterLink to="/menu-home" class="back-home">Quay về trang chủ</RouterLink>
  </div>
</template>

<style scoped>
.payment-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.cancel h2 {
  color: #ef4444;
}

.back-home {
  margin-top: 20px;
  background: #f87171;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
}
</style>
