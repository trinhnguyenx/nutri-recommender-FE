<template>
   <div class="big-app">
  <div class="app">
    <section class="hero">
      <img
        src="../../../assets/img/hero.svg"
        class="hero-bg"
        alt="hero background"
      />

      <div class="hero-content">
        <button class="btn-hungry">FEELING UNBALANCED?</button>
        <h1>ACHIEVE YOUR WEIGHT GOALS WITH HEALTHYFIT</h1>
        <p>
          Discover personalized nutrition plans designed to help you gain or
          lose weight the healthy way. Order now to start your journey to a
          balanced, confident you!
        </p>
        <div class="buttons">
          <button class="btn-order" @click="gotoForm">👉 Get your plan</button>
          <button class="btn-more" @click="gotoChatbot">Talk to AI Coach Rio  →</button>
        </div>
      </div>

      <div class="food-image-wrapper">
        <img
          src="../../../assets/Images-store/Food.png"
          alt="Food image"
          class="food-image"
        />
      </div>
    </section>

    <section class="menu-section">
      <div v-for="item in menuItems" :key="item.title" class="card">
        <img :src="item.img" :alt="item.title" />
        <h4>{{ item.title }}</h4>
        <p>{{ item.desc }}</p>
        <div class="flex-price">
          <div class="price">${{ item.price }}</div>
          <button class="btn-buy">Buy Now</button>
        </div>
      </div>
    </section>
  </div>
   </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();

const gotoForm = () => {
  router.push("/caculate-calories");
};

const gotoChatbot = () => {
  router.push("/chatbot");
};

interface MenuItem {
  title: string;
  desc: string;
  price: number;
  img: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Chicken Burger",
    desc: "This is an excellent chicken burger that is very healthy",
    price: 3.5,
    img: new URL(
      "../../../assets/Images-store/biriyani/r1.png",
      import.meta.url
    ).href,
  },
  {
    title: "Chicken Pizza",
    desc: "This is an excellent chicken pizza that is very healthy",
    price: 3.8,
    img: new URL(
      "../../../assets/Images-store/biriyani/r2.png",
      import.meta.url
    ).href,
  },
  {
    title: "Chicken Rice",
    desc: "This is an excellent chicken rice that is very healthy",
    price: 4.5,
    img: new URL(
      "../../../assets/Images-store/biriyani/r3.png",
      import.meta.url
    ).href,
  },
  {
    title: "Special Dessert",
    desc: "This is an excellent dessert that is very very very healthy",
    price: 2.5,
    img: new URL(
      "../../../assets/Images-store/biriyani/r4.png",
      import.meta.url
    ).href,
  },
];
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}
.big-app {
    position: relative;
    overflow: hidden;

}
.app {
  background: #fff;
  color: #333;
  overflow-x: hidden;
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

.btn-green {
  background-color: #fff;
  color: black;
}

.btn-outline {
  border: 2px solid #fff;
  background: none;
}

.hero {
  padding: 0 60px 20px 10px;
  background-color: #fff;
}

.hero-bg {
  position: absolute;
  top: 0%;
  right: -16%;
  width: 60%;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 2;
  margin-left: 80px;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin: 20px 0;
  max-width: 750px;
}

.hero-content p {
  font-size: 13px;
  margin-bottom: 20px;
  color: #777;
  max-width: 600px;
}

.buttons {
  padding-top: 20px;
}

.btn {
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  background-color: #fff;
}
.btn-hungry {
  background-color: #fff;
  color: black;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid black;
}
.btn-order {
  background-color: #76c044;
  color: white;
  padding: 20px 50px;
  border-radius: 35px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}
.btn-order:hover {
  background-color: #5ca639;
}
.btn-more {
  background-color: #fff;
  color: black;
  padding: 20px 50px;
  border-radius: 35px;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid black;
}
.btn-more:hover {
  background-color: #f0f0f0;
}

.food-image-wrapper {
  margin-top: 60px;
  z-index: 1;
  position: absolute;
  top: 3%;
  right: 10%;
}

.food-image {
  width: 500px;
  max-width: 100%;
}

.buttons {
  display: flex;
  gap: 15px;
}

.menu-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 100px;
  padding: 50px;
  margin-top: 250px;
}

.card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 350px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.card h4 {
  font-weight: 600;
}

.card p {
  font-size: 14px;
  color: #777;
  margin: 10px 0;
}

.card .price {
  font-weight: 600;
  border: 1px solid black;
  padding: 5px 15px;
  border-radius: 25px;
}
.flex-price {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.btn-buy {
  background-color: #76c044;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-left: auto;
}
.btn-buy:hover {
  background-color: #5ca639;
}


</style>
