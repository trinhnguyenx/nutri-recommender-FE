<template>
  <header class="header" >
    <div class="logo">HEALTHYFIT</div>
    <nav class="nav">
      <a href="/menu-home">Home</a>
      <a href="#">Menu</a>
      <a href="#">About Us</a>
      <a href="#">Contact</a>
    </nav>
    <div class="actions">
      <button class="btn">
        <el-icon class="icon-large"><Search /></el-icon>
      </button>
      <button class="btn">
        <el-icon class="icon-large"><ShoppingCart /></el-icon>
      </button>

      <button class="btn-account" ref="menuButton" v-if="userStore.isLoggedIn" @click="toggleMenu">
        Welcome, {{ fullName }}
      </button>

      <div class="dropdown-menu" v-if="showMenu" ref="dropdownMenu">
        <ul>
          <li @click="goToProfile">Account Details</li>
          <li @click="logout">Log out</li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { Search, ShoppingCart } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user.store";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const userStore = useUserStore();
const router = useRouter();

const showMenu = ref(false);
const dropdownMenu = ref<HTMLElement | null>(null);
const menuButton = ref<HTMLElement | null>(null);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const goToProfile = () => {
  router.push("/account-details");
  showMenu.value = false;
};

const logout = () => {
  userStore.logout();
  router.push("/login");
  showMenu.value = false;
};

const fullName = computed(() => {
  const user = userStore.user;
  return user ? `${user.last_name} ${user.first_name}` : "";
});

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (
    showMenu.value &&
    dropdownMenu.value &&
    menuButton.value &&
    !dropdownMenu.value.contains(target) &&
    !menuButton.value.contains(target)
  ) {
    showMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
}
.logo {
  font-weight: bold;
  font-size: 24px;
}

.nav {
  display: flex;
  gap: 35px;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 14px;
  z-index: 2;
}
.nav a:hover {
  color: #76c044;
}

.actions {
  display: flex;
  gap: 15px;
  align-items: center;
  z-index: 2;
  position: relative;

}

.btn {
  padding: 5px 12px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
.icon-large {
  font-size: 18px;
}
.btn-account {
  position: relative;
  padding: 16px 32px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-left: 20px;
}
.dropdown-menu {
  position: absolute;
  top: 115%;
  right: -15%;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  z-index: 10;
  padding: 10px 0;
  min-width: 200px;
  font-size: 14px;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style>
