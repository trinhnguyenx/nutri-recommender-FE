<template>
  <div class="stats">
    <h2>Thống kê</h2>
    <p>Đang phát triển... 📊</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.stats {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.stats h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 1rem;
}

.stats p {
  font-size: 1rem;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 768px) {
  .stats {
    padding: 1.5rem;
  }

  .stats h2 {
    font-size: 1.3rem;
  }

  .stats p {
    font-size: 0.95rem;
  }
}
</style>