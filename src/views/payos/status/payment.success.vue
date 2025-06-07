<template>
  <div class="payment-result success">
    <h2>🎉 Thanh toán thành công!</h2>
    <p>Cảm ơn bạn đã nâng cấp tài khoản Premium.</p>
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

.success h2 {
  color: #22c55e;
}

.back-home {
  margin-top: 20px;
  background: #10b981;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
}
</style>
