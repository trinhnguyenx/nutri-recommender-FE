<template>
    <div class="special-chefs-section">
      <!-- Header -->
      <div class="header">
        <h2>MEET OUR NUTRITION EXPERTS</h2>
        <p>Our chefs and nutritionists work together to craft meals that help you reach your weight goals.</p>
      </div>
  
      <!-- Chefs Grid -->
      <div class="chefs-grid">
        <div class="chef-card">
          <div class="image-container">
            <img :src="chef1Image" alt="Chef 1" class="chef-image" />
          </div>
        </div>
        <div class="chef-card-middle">
          <div class="image-container-middle chef-middle">
            <img :src="chef2Image" alt="Chef 2" class="chef-image" />
          </div>
        </div>
        <div class="chef-card">
          <div class="image-container">
            <img :src="chef3Image" alt="Chef 3" class="chef-image" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const chef1Image = ref(new URL("../../../assets/img/chef2.png", import.meta.url).href);
  const chef2Image = ref(new URL("../../../assets/img/chef3.png", import.meta.url).href);
  const chef3Image = ref(new URL("../../../assets/img/chef2.png", import.meta.url).href);
  </script>
  
  <style scoped>
  .special-chefs-section {
    padding: 48px 0;
    background-color: #fff;
    position: relative;
    margin: 0 100px 100px 100px;
  }
  
  .header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .header h2 {
    font-size: 36px;
    font-weight: bold;
    color: #333;
  }
  
  .header p {
    color: #666;
    margin-top: 8px;
    font-size: 16px;
  }
  
  .chefs-grid {
    max-width: 100%;
    display: grid;  
    grid-template-columns: auto auto auto;
    justify-content: center;
    gap: 80px;
    margin-top: 100px;
  }
  
  .chef-card {
    background-color: #e6f4ea; 
    border-radius: 20px; 
    padding: 0; 
    text-align: center;
    margin-bottom: 150px;
    width: 400px;
    height: 620px;
  }
  .chef-card-middle {
    background-color: #e6f4ea; 
    border-radius: 20px; 
    padding: 0; 
    text-align: center;
    margin-top: 150px;
  }
  
  .image-container {
    max-width: 100%;
    height: 620px; 
    border-radius: 16px; 
    overflow: hidden;
  }
  .chef-card-middle .image-container-middle {
    max-width: 110%;
    height: 600px;
    border-radius: 16px; 
    overflow: hidden;
  }
  
  .chef-middle {
    margin-top: 50px; 
    width: 400px;
    height: 620px; 
  }
  
  .chef-image {
    width: 95%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px; 
  }
  </style>