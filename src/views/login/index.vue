<template>
  <div class="login-container">
    <div class="left-section">
      <img src="../../assets/img/chef1.png" alt="Login illustration" />
    </div>
    <div class="right-section">
      <div class="form-box">
        <h1>Welcome to HEALTHYFIT 👋</h1>
        <p class="subtitle">Log in to your HEALTHYFIT account</p>

        <form @submit.prevent="handleLogin">
          <input
            v-model="user.email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            v-model="user.password"
            type="password"
            placeholder="Password"
            required
          />
          <div class="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>
          <button type="submit">Log In</button>
        </form>

        <p class="signup-text">
          Don't have an account?
          <a href="#" @click.prevent="gotoRegister">Sign Up</a>
        </p>

        <div class="oauth-buttons">
          <button class="google">Log in with Google</button>
          <button class="apple">Log in with Apple</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { ILogin } from "../../types/user";
import { loginApi } from "../../services/api";
import { ElNotification } from "element-plus";
import { useUserStore } from "../../store/user.store";

const router = useRouter();

const user = ref<ILogin>({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    await loginApi({
      password: user.value.password,
      email: user.value.email,
    }).then((res) => {
      const data = res["data"];
      localStorage.setItem("accessToken", data.data.token.accessToken);
      localStorage.setItem("refreshToken", data.data.token.refreshToken);
      // Set user data in store
      const userStore = useUserStore();
      userStore.setUser({
        id: data.data.user.id,
        email: data.data.user.email,
        first_name: data.data.user.first_name,
        last_name: data.data.user.last_name,
      });
      if (data.data.token.accessToken) {
        try {
          router.push("/menu-home");
        } catch (error) {
          console.log(error);
          ElNotification({
            title: "Error",
            message: "Login Failed!",
            type: "error",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const gotoRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  font-family: "Inter", sans-serif;
}

.left-section {
  flex: 1;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-section img {
  max-width: 100vw;
  height: 100vh;
}

.right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.form-box {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #5c27fe;
  box-shadow: 0 0 0 2px rgba(92, 39, 254, 0.2);
}

.forgot-password {
  text-align: right;
  font-size: 14px;
}

.forgot-password a {
  text-decoration: none;
  color: #5c27fe;
}

button[type="submit"] {
  background: #5c27fe;
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button[type="submit"]:hover {
  background: #3a1eda;
}

.signup-text {
  margin-top: 1rem;
  font-size: 14px;
  color: #666;
}

.signup-text a {
  color: #5c27fe;
  text-decoration: none;
}

.oauth-buttons {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.oauth-buttons button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
}

.oauth-buttons .google {
  background-color: white;
}

.oauth-buttons .apple {
  background-color: black;
  color: white;
}
</style>
