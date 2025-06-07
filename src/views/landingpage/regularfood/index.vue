<template>
    <div class="regular-food-section">
      <!-- Header -->
      <div class="header">
        <h2>OUR DAILY NUTRITION PICKS</h2>
        <p>Explore our everyday meals tailored for weight gain or loss. Choose what suits your goals!</p>
      </div>
  
      <!-- Carousel -->
      <div class="carousel-container">
        <div class="carousel-wrapper">
          <div
            class="carousel"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(group, groupIndex) in groupedItems"
              :key="groupIndex"
              class="carousel-group"
            >
              <div class="food-grid">
                <div
                  v-for="(item, itemIndex) in group"
                  :key="itemIndex"
                  class="food-card"
                >
                  <div class="image-container">
                    <img :src="item.image" :alt="item.name" />
                  </div>
                  <h3>{{ item.name }}</h3>
                  <div class="rating">
                    <span>★★★★★</span>
                    <span class="reviews">({{ item.reviews }})</span>
                  </div>
                  <p class="description">{{ item.description }}</p>
                  <p class="price">${{ item.price.toFixed(2) }}</p>
                  <button class="buy-now">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Navigation Dots -->
        <div class="dots">
          <button
            v-for="(_, index) in Math.ceil(foodItems.length / 6)"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="currentIndex = index"
          ></button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue';
  
  const foodItems = ref([
    {
      name: 'Salads',
      price: 3.50,
      reviews: 186,
      description: 'This is a great green salad that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Chicken Masala',
      price: 4.00,
      reviews: 120,
      description: 'This is a great chicken masala that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Mutton Kheema',
      price: 4.80,
      reviews: 112,
      description: 'This is a great mutton kheema that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Beef Pasta',
      price: 3.00,
      reviews: 106,
      description: 'This is a great beef pasta that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Chicken Fry',
      price: 4.00,
      reviews: 120,
      description: 'This is a great chicken fry that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Special Dessert',
      price: 2.50,
      reviews: 189,
      description: 'This is a great special dessert that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    // Thêm một số món ăn để có đủ dữ liệu cho nhiều nhóm
    {
      name: 'Grilled Chicken',
      price: 5.00,
      reviews: 200,
      description: 'This is a great grilled chicken that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Veggie Pizza',
      price: 3.80,
      reviews: 150,
      description: 'This is a great veggie pizza that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Fish Fry',
      price: 4.50,
      reviews: 180,
      description: 'This is a great fish fry that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Grilled Chicken',
      price: 5.00,
      reviews: 200,
      description: 'This is a great grilled chicken that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Veggie Pizza',
      price: 3.80,
      reviews: 150,
      description: 'This is a great veggie pizza that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
    {
      name: 'Fish Fry',
      price: 4.50,
      reviews: 180,
      description: 'This is a great fish fry that is very healthy. You can eat it with any meal.',
      image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url).href,
    },
  ]);
  
  const groupedItems = computed(() => {
    const groups = [];
    for (let i = 0; i < foodItems.value.length; i += 6) {
      groups.push(foodItems.value.slice(i, i + 6));
    }
    return groups;
  });
  
  const currentIndex = ref(0);
  </script>
  
  <style scoped>
  .regular-food-section {
    padding: 48px 100px;
    background-color: #fff;
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
  
  .carousel-container {
    max-width: 100%;
    margin: 0 auto;
    position: relative;
  }
  
  .carousel-wrapper {
    overflow: hidden;
  }
  
  .carousel {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .carousel-group {
    flex: 0 0 100%;
  }
  
  .food-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
  
  .food-card {
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 24px;
    text-align: center;
  }
  
  .image-container {
    width: 160px;
    height: 160px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #34c759;
  }
  
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .food-card h3 {
    font-size: 20px;
    font-weight: 600;
    margin-top: 16px;
    color: #333;
  }
  
  .rating {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
  }
  
  .rating span {
    color: #facc15;
  }
  
  .rating .reviews {
    color: #666;
    margin-left: 8px;
  }
  
  .description {
    color: #666;
    font-size: 14px;
    margin-top: 8px;
    line-height: 1.5;
  }
  
  .price {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-top: 8px;
  }
  
  .buy-now {
    margin-top: 16px;
    background-color: #34c759;
    color: #fff;
    padding: 8px 16px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .buy-now:hover {
    background-color: #2ea44f;
  }
  
  .dots {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
  
  .dots button {
    width: 12px;
    height: 12px;
    background-color: #d1d5db;
    border-radius: 50%;
    margin: 0 8px;
    border: none;
    cursor: pointer;
  }
  
  .dots button.active {
    background-color: #34c759;
  }
  </style>