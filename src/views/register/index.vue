<template>
    <div class="register-container">
      <div class="left-section">
        <img src="../../assets/Images-store/Chife.png" alt="Custom card illustration" />
      </div>
      <div class="right-section">
        <div class="form-box">
          <h1>Hi! Welcome to<br />HEALTHYFIT 👋</h1>
          <form @submit.prevent="handleSubmit">
            <div class="form-row">
              <input v-model="firstName" type="text" placeholder="First Name" required />
              <input v-model="lastName" type="text" placeholder="Last Name" required />
            </div>
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Sign up</button>
          </form>
          <p class="signin-text">Already have an account? <a href="#" @click.prevent="gotoLogin">Sign In</a></p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  // import { ISignUp } from "../../types/user";
  import { registerApi } from "../../services/api"
  import { ElNotification } from "element-plus"

  const router = useRouter();
  
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  
  const handleSubmit = async () => {
  const payload = {
    email: email.value,
    password: password.value,
    first_name: firstName.value,
    last_name: lastName.value
  }

  try {
    const res = await registerApi(payload)
    const data = res.data
    console.log(data.data.access_token)
    
    ElNotification({
      title: 'Success',
      message: 'Registration successful!',
      type: 'success',
    })
    router.push('/login')

  } catch (error) {
    console.error(error);
    ElNotification({
      title: 'Error',
      message: 'Registration failed. Please check your data and try again.',
      type: 'error',
    })
  }
}
  const gotoLogin = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
  }
  
  .left-section {
    flex: 1;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .left-section img {
    max-width: 52%;
    height: auto;
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
    margin-bottom: 1.5rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
  }
  
  input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    flex: 1;
    outline: none;
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
  
  .signin-text {
    margin-top: 1rem;
    font-size: 14px;
    color: #666;
  }
  
  .signin-text a {
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
  