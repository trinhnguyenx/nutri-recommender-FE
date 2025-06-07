import { defineStore } from 'pinia';
import type { User } from '../types/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false
  }),
  actions: {
    setUser(userData: User) {
      this.user = userData;
      this.isLoggedIn = true;
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
    },
  },
  persist: true,
});
