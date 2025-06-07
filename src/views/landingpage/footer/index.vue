<template>
    <footer class="footer-section">
      <div class="footer-grid">
        <div class="footer-column">
          <h3>MENU</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Why Choose</a></li>
            <li><a href="#">Special Menu</a></li>
            <li><a href="#">Regular Food</a></li>
            <li><a href="#">Special Chef's</a></li>
          </ul>
        </div>
  
        <div class="footer-column">
          <h3>HELP</h3>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms & Condition</a></li>
            <li><a href="#">Policy</a></li>
          </ul>
        </div>
  
        <div class="footer-column">
          <h3>CONTACT</h3>
          <ul>
            <li>+123 456 789</li>
            <li>Info@Foodied.Com</li>
            <li>1245, New York, USA</li>
          </ul>
        </div>
  
        <div class="footer-column">
          <h3>SUBSCRIBE OUR NEWSLETTER</h3>
          <div class="newsletter-form">
            <input type="email" placeholder="Enter Your Email" v-model="email" />
            <button @click="subscribe">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const email = ref('');
  
  const subscribe = () => {
    if (email.value) {
      alert(`Subscribed with email: ${email.value}`);
      email.value = ''; 
    } else {
      alert('Please enter your email!');
    }
  };
  </script>
  
  <style scoped>
  .footer-section {
    padding: 48px 0;
    background-color: #e6f4ea;
  }
  
  .footer-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
  
  .footer-column {
    text-align: left;
  }
  
  .footer-column h3 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
  }
  
  .footer-column ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-column ul li {
    margin-bottom: 8px;
    color: #666;
    font-size: 14px;
  }
  
  .footer-column ul li a {
    color: #666;
    text-decoration: none;
  }
  
  .footer-column ul li a:hover {
    color: #34c759;
  }
  
  .newsletter-form {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }
  
  .newsletter-form input {
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 9999px;
    flex: 1;
    margin-right: 8px;
    font-size: 14px;
    color: #666;
  }
  
  .newsletter-form input::placeholder {
    color: #999;
  }
  .newsletter-form input:focus {
    outline: none; 
    border: 1px solid #ccc;
  }
  
  .newsletter-form button {
    padding: 8px 16px;
    background-color: #34c759;
    color: #fff;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .newsletter-form button:hover {
    background-color: #2ea44f;
  }
  </style>