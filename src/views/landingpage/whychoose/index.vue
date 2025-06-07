<template>
    <section class="why-choose-us">
      <div class="container">
        <h1 class="title">WHY CHOOSE HEALTHYFIT?</h1>
        <p class="subtitle">
          We’re your partner in achieving your weight goals with nutritious meals tailored for you.
        </p>
  
        <div class="features">
          <div class="feature-box">
            <div class="icon">
                <img src="../../../assets/Images-store/biriyani/r4.png"
                alt="Fast Delivery"
                width="48"
                height="48">
                </img>
            </div>
            <h3 class="feature-title">Personalized Nutrition</h3>
            <p class="description">
              Meals crafted to support your weight gain or loss goals with balanced nutrients.
            </p>
          </div>
  
          <div class="feature-box">
            <div class="icon">
                <img src="../../../assets/img/chef2.png"
                alt="Fast Delivery"
                width="48"
                height="48">
                </img>
            </div>
            <h3 class="feature-title">Expert Guidance</h3>
            <p class="description">
              Our nutritionists ensure every meal aligns with your health needs.
            </p>
          </div>
  
          <div class="feature-box">
            <div class="icon">
              <img src="../../../assets/img/delivery-truck.png"
                alt="Fast Delivery"
                width="48"
                height="48">
                </img>
            </div>
            <h3 class="feature-title">Fast & Fresh Delivery</h3>
            <p class="description">
              Get your meals delivered quickly, fresh, and ready to enjoy.
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  
  .why-choose-us {
    padding: 80px 20px;
    background-color: #fff;
    font-family: 'Inter', sans-serif;
    text-align: center;
  }
  
  .container {
    max-width: 100%;
    margin: 0 auto;
  }
  
  .title {
    font-size: 3.5rem;
    font-weight: 700;
    color: #000;
    margin-bottom: 12px;
  }
  
  .subtitle {
    color: #777;
    font-size: 14px;
    margin-bottom: 50px;
  }
  
  .features {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 100px;
    padding: 50px;

  }
  
  .feature-box {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    width: 430px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .feature-box:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    font-size: 48px;
    color: #4caf50;
    margin-bottom: 16px;
  }
  .icon img {
    width: 90px;
    height: 90px;
  }
  
  .feature-title {
    font-size: 1.7rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: #111;
  }
  
  .description {
    font-size: 14px;
    color: #777 ;
  }
  </style>
  