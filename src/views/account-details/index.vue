<template>
    <Header />
  <div class="account-page">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="user-profile">
        <img src="http://www.gravatar.com/avatar/?d=mp" class="avatar" alt="User avatar" />
        <p>{{ user.last_name }} {{ user.first_name }}</p>
      </div>
      <ul class="menu">
        <li :class="{ active: activeTab === 'info' }" @click="activeTab = 'info'">👤 Thông tin cá nhân</li>
        <li :class="{ active: activeTab === 'plans' }" @click="activeTab = 'plans'">📅 Kế hoạch bữa ăn</li>
        <li :class="{ active: activeTab === 'stats' }" @click="activeTab = 'stats'">📊 Thống kê</li>
        <li :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">⚙️ Cài đặt</li>
        <li class="premium-tab" @click="goToPremium">🌟 Nâng cấp Premium</li>

      </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <UserInfoForm
        v-if="activeTab === 'info'"
        :user="user"
        @update="updateUser"
      />
      <MealPlanList
        v-if="activeTab === 'plans'"
      />
      <StatisticsPlaceholder v-if="activeTab === 'stats'" />
      <SettingsSection v-if="activeTab === 'settings'" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from "vue-router";
import UserInfoForm from './user-info/index.vue';
import MealPlanList from './meal-plan-list/index.vue';
import StatisticsPlaceholder from './statistic/index.vue';
import SettingsSection from './settings/index.vue';
import { getUserApibyID, updatePartUserApi } from '../../services/api';
import { useUserStore } from '@/store/user.store';
import Header from '@/views/headerpage/index.vue';

const router = useRouter();

const activeTab = ref('info');
const userStore = useUserStore();
const userID = userStore.user?.id || '';

const user = reactive({
  id: '',
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

const goToPremium = () => {
  router.push('/payment-prenium');
};

// Gọi API khi mounted
onMounted(async () => {
  try {
    const res = await getUserApibyID(userID);
    Object.assign(user, res.data.data); 
    console.log('Thông tin người dùng:', res.data.data);
  } catch (err) {
    console.error('Lỗi khi lấy thông tin người dùng:', err);
  }
});

 const updateUser = async (updatedData) => {
  try {
    const res = await updatePartUserApi(userID, updatedData); 
    Object.assign(user, res.data.data); 
    console.log('Cập nhật thành công:', res.data.data);
  } catch (err) {
    console.error('Lỗi khi cập nhật người dùng:', err);
  }
};
</script>

<style scoped>
.account-page {
  display: flex;
  font-family: 'Nunito', sans-serif;
  background-color: #f0fdf4;
  min-height: 100vh;
}

/* Sidebar styling */
.sidebar {
  width: 280px;
  background-color: #bfdaa8;
  color: black;
  padding: 2rem 1.5rem;
  border-radius: 0 20px 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  height: 100vh;
}

/* User profile */
.user-profile {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
}

.user-profile p {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

/* Menu styling */
.menu {
  padding: 0;
  margin: 0;
  list-style: none;
}

.menu li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-left: 4px solid transparent;
}
.menu li:hover {
  background-color: #21b778;
  transform: translateX(6px);
  border-left: 4px solid #ffffff;
}

.menu li.active {
  background-color: #21b778;
  font-weight: 600;
}

/* Main content */
.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 20px 0 0 20px;
}

/* Responsive design */
@media (max-width: 1024px) {
  .sidebar {
    width: 220px;
    padding: 1.5rem 1rem;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .user-profile p {
    font-size: 1rem;
  }

  .menu li {
    font-size: 0.95rem;
    padding: 0.65rem 0.8rem;
  }

  .main-content {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .account-page {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    border-radius: 0 0 20px 20px;
    padding: 1rem;
    position: static;
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .avatar {
    width: 60px;
    height: 60px;
    margin-bottom: 0;
  }

  .menu {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .menu li {
    flex: 1 1 auto;
    text-align: center;
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .main-content {
    border-radius: 0;
    padding: 1rem;
    
  }
}
</style>