
<template>
   <ion-page>
    <div class="bg-gray-900 text-white font-sans p-4 h-screen overflow-y-auto">
    <div class="flex justify-between items-center">
      <div class="text-lg">9:41</div>
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 bg-white rounded-full"></div>
        <div class="w-4 h-4 bg-white rounded-full"></div>
        <div class="w-4 h-4 bg-white rounded-full"></div>
      </div>
    </div>
    <h1 class="text-2xl font-bold mt-4">Choose Your Bike</h1>
    <div class="relative mt-4">
      <img
        src="https://storage.googleapis.com/a1aa/image/E_dvRxGd8X24mvIrzxBa35IJyoLfZS-tYea9Pt0PxMQ.jpg"
        alt="A modern road bike"
        class="w-full rounded-lg"
        width="600"
        height="400"
      />
      <div class="absolute bottom-4 left-4 bg-blue-600 text-white text-xl font-bold px-4 py-2 rounded-lg">
        30% OFF
      </div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <button class="bg-gray-800 p-2 rounded-lg">
        <i class="fas fa-th-large"></i>
      </button>
      <button class="bg-gray-800 p-2 rounded-lg">
        <i class="fas fa-bicycle"></i>
      </button>
      <button class="bg-gray-800 p-2 rounded-lg">
        <i class="fas fa-road"></i>
      </button>
      <button class="bg-gray-800 p-2 rounded-lg">
        <i class="fas fa-mountain"></i>
      </button>
      <button class="bg-gray-800 p-2 rounded-lg">
        <i class="fas fa-helmet-safety"></i>
      </button>
    </div>
    <div class="relative mt-4">
      <input
        type="text"
        placeholder="Search"
        class="w-full p-2 rounded-lg bg-gray-800 text-white"
      />
      <i class="fas fa-search absolute right-4 top-3 text-gray-400"></i>
    </div>
    <h2 class="text-xl font-bold mt-4">Best Selling</h2>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="relative bg-gray-800  rounded-lg">
        <img
          src="https://storage.googleapis.com/a1aa/image/p06c8RGeML7IiUNF0m_gPPi2vvVaGsUIJGFv0PyI994.jpg"
          alt="A road bike"
          class="w-full rounded-lg object-cover "
          width="200"
          height="200"
        />
        <div class="absolute top-4 right-4 text-blue-500">
          <i class="fas fa-heart"></i>
        </div>
        <div class="mt-4">
          <p class="text-gray-400">Road Bike</p>
          <h2 class="text-xl font-bold">PEUGETO - LR01</h2>
          <p class="text-lg">$ 1999.99</p>
        </div>
      </div>
      <div class="relative bg-gray-800  rounded-lg">
        <img
          src="https://storage.googleapis.com/a1aa/image/7FdnxBAAxVshUu9XxmIg0I0hRNxtf28lLCXa2-R_CBs.jpg"
          alt="A road helmet"
          class="w-full rounded-lg object-cover"
          width="200"
          height="200"
        />
        <div class="absolute top-4 right-4 text-blue-500">
          <i class="fas fa-heart"></i>
        </div>
        <div class="mt-4">
          <p class="text-gray-400 px-4 mb-5">Road Helmet</p>
          <span class="  text-lg font-bold px-4 ">SMITH - Trade</span>
          <p class="text-lg p-4" >$ 120</p>
        </div>
      </div>
    </div>
    <h2 class="text-xl font-bold mt-4">All Products</h2>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="relative bg-gray-800 p-4 rounded-lg">
        <img
          src="https://storage.googleapis.com/a1aa/image/p06c8RGeML7IiUNF0m_gPPi2vvVaGsUIJGFv0PyI994.jpg"
          alt="A road bike"
          class="w-full rounded-lg"
          width="200"
          height="200"
        />
        <div class="absolute top-4 right-4 text-blue-500">
          <i class="fas fa-heart"></i>
        </div>
        <div class="mt-4">
          <p class="text-gray-400">Road Bike</p>
          <h2 class="text-xl font-bold">PEUGETO - LR01</h2>
          <p class="text-lg">$ 1999.99</p>
        </div>
      </div>
      <div class="relative bg-gray-800 p-4 rounded-lg">
        <img
          src="https://storage.googleapis.com/a1aa/image/7FdnxBAAxVshUu9XxmIg0I0hRNxtf28lLCXa2-R_CBs.jpg"
          alt="A road helmet"
          class="w-full rounded-lg"
          width="200"
          height="200"
        />
        <div class="absolute top-4 right-4 text-blue-500">
          <i class="fas fa-heart"></i>
        </div>
        <div class="mt-4">
          <p class="text-gray-400">Road Helmet</p>
          <h2 class="text-xl font-bold">SMITH - Trade</h2>
          <p class="text-lg">$ 120</p>
        </div>
      </div>
      <div class="relative bg-gray-800 p-4 rounded-lg">
        <img
          src="https://storage.googleapis.com/a1aa/image/p06c8RGeML7IiUNF0m_gPPi2vvVaGsUIJGFv0PyI994.jpg"
          alt="A road bike"
          class="w-full rounded-lg"
          width="200"
          height="200"
        />
        <div class="absolute top-4 right-4 text-blue-500">
          <i class="fas fa-heart"></i>
        </div>
        <div class="mt-4">
          <p class="text-gray-400">Road Bike</p>
          <h2 class="text-xl font-bold">PEUGETO - LR01</h2>
          <p class="text-lg">$ 1999.99</p>
        </div>
      </div>
      <div class="relative bg-gray-800 p-4 rounded-lg">
        <img
          src="https://storage.googleapis.com/a1aa/image/7FdnxBAAxVshUu9XxmIg0I0hRNxtf28lLCXa2-R_CBs.jpg"
          alt="A road helmet"
          class="w-full rounded-lg"
          width="200"
          height="200"
        />
        <div class="absolute top-4 right-4 text-blue-500">
          <i class="fas fa-heart"></i>
        </div>
        <div class="mt-4">
          <p class="text-gray-400">Road Helmet</p>
          <h2 class="text-xl font-bold">SMITH - Trade</h2>
          <p class="text-lg">$ 120</p>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around items-center">
      <button class="bg-blue-600 p-4 rounded-full">
        <i class="fas fa-bicycle text-white"></i>
      </button>
      <button class="p-4">
        <i class="fas fa-map text-white"></i>
      </button>
      <button class="p-4">
        <i class="fas fa-shopping-cart text-white"></i>
      </button>
      <button class="p-4">
        <i class="fas fa-user text-white"></i>
      </button>
      <button class="p-4">
        <i class="fas fa-file-alt text-white"></i>
      </button>
    </div>
  </div>
   </ion-page>

</template>

<script lang="ts">
import { IonPage } from '@ionic/vue';

export default {
  name: 'ChooseYourBike',
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>
