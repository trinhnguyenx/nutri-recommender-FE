<template>
  <div class="special-menu-section">
    <!-- Header -->
    <div class="header">
      <h2>WEIGHT-FOCUSED SPECIAL MENU</h2>
      <p>
        Explore our curated meals designed to help you gain or lose weight effectively.
      </p>
    </div>

    <!-- Carousel -->
    <div class="carousel-container">
      <div class="carousel-wrapper">
        <div
          class="carousel"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <!-- Menu Items -->
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="carousel-item"
          >
            <div class="menu-card">
              <div class="image-container">
                <img :src="item.image" alt="Menu Item" />
              </div>
              <h3>{{ item.name }}</h3>
              <div class="rating">
                <span>★★★★★</span>
                <span class="reviews">({{ item.reviews }})</span>
              </div>
              <p class="description">{{ item.description }}</p>
              <p class="price">${{ item.price.toFixed(2) }}</p>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="dots">
        <button
          v-for="(_, index) in Math.ceil(menuItems.length / 3)"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="currentIndex = index"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const menuItems = ref([
  {
    name: "Salads",
    price: 2.5,
    reviews: 186,
    description: "A low-calorie salad packed with greens to support weight loss.",
    image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url)
      .href,
  },
  {
    name: "Protein Power Bowl",
    price: 3.4,
    reviews: 186,
    description: "High-protein meal for muscle gain and weight management.",
    image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url)
      .href,
  },
  {
    name: "Grilled Omega Fish",
    price: 4.0,
    reviews: 180,
    description: "Rich in omega-3 fatty acids, perfect for heart health.",
    image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url)
      .href,
  },
  {
    name: "Pasta",
    price: 3.0,
    reviews: 150,
    description: "Whole grain pasta with lean protein and veggies.",
    image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url)
      .href,
  },
  {
    name: "Soup",
    price: 2.8,
    reviews: 170,
    description: "Low-calorie soup with fresh vegetables and herbs.",
    image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url)
      .href,
  },
  {
    name: "Grilled Chicken",
    price: 5.0,
    reviews: 200,
    description: "Lean grilled chicken breast for muscle gain.",
    image: new URL("../../../assets/Images-store/biriyani/r1.png", import.meta.url)
      .href,
  },
]);

const currentIndex = ref(0);
</script>

<style scoped>
.special-menu-section {
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
  max-width: 600px;
  text-align: center;
  margin-left: 32%;
  margin-bottom: 50px;
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

.carousel-item {
  flex: 0 0 33.33%;
  padding: 0 16px;
  box-sizing: border-box;
}

.menu-card {
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

.menu-card h3 {
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

.price {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-top: 8px;
}

.add-to-cart {
  margin-top: 16px;
  background-color: #34c759;
  color: #fff;
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
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
.description {
  max-width: 300px;
  margin: 20px auto;
}
</style>
