<template>
  <div class="settings">
    <h2>Cài đặt tài khoản</h2>
    <button @click="logout">Đăng xuất</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/store/user.store";

const router = useRouter();
const userStore = useUserStore();

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.settings {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.settings h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 1.5rem;
}

button {
  background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.3s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
}

button:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .settings {
    padding: 1.5rem;
  }

  .settings h2 {
    font-size: 1.3rem;
  }

  button {
    padding: 0.65rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>