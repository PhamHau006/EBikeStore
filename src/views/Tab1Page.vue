
<template>
  <ion-page>
    <ion-content>
    <!-- Nút Đăng nhập/Đăng xuất -->
<div class="text-center mt-4">
  <button v-if="!isLoggedIn" @click="goToLogin"
    class="w-full bg-green-600 text-white py-3 rounded-full text-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500">
    <i class="fas fa-sign-in-alt mr-2"></i> Đăng nhập
  </button>

  <button v-else @click="logout"
    class="w-full bg-red-600 text-white py-3 rounded-full text-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500">
    <i class="fas fa-sign-out-alt mr-2"></i> Đăng xuất
  </button>
</div>

      <div class="bg-gray-900 text-white font-sans p-4 h-screen ">
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
          <img src="https://storage.googleapis.com/a1aa/image/E_dvRxGd8X24mvIrzxBa35IJyoLfZS-tYea9Pt0PxMQ.jpg"
            alt="A modern road bike" class="w-full rounded-lg" width="600" height="400" />
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
          <input type="text" placeholder="Search" class="w-full p-2 rounded-lg bg-gray-800 text-white" />
          <i class="fas fa-search absolute right-4 top-3 text-gray-400"></i>
        </div>
        <h2 class="text-xl font-bold mt-4">Best Selling</h2>
        <swiper :slides-per-view="1" :space-between="10" class="mt-4">
          <swiper-slide v-for="items in product" :key="items.maSP" class="relative bg-gray-800 rounded-lg p-4">
  <!-- Khi click vào ảnh, chuyển đến Tab4Page.vue -->
  <router-link :to="'/tabs/tab4/' + items.maSP">
    <img :src="items.hinh" alt="A road bike" class="w-[400px] h-[200px] object-cover rounded-lg cursor-pointer" />
  </router-link>

  <div class="mt-4">
    <p class="text-gray-400">{{ items.moTa }}</p>
    
    <!-- Khi click vào tên sản phẩm, chuyển đến Tab4Page.vue -->
    <router-link :to="'/tabs/tab4/' + items.maSP">
      <h2 class="text-xl font-bold cursor-pointer">{{ items.tenSp }}</h2>
    </router-link>

    <p class="text-lg" style="font-size: medium;">{{ items.khoangGia }}</p>
  </div>
</swiper-slide>

        </swiper>
        <h2 class="text-xl font-bold mt-4">Tất cả sản phẩm</h2>
<div class="grid grid-cols-2 gap-4 mt-4">
  <div v-for="items in product" :key="items.maSP" class="relative bg-gray-800 p-4 rounded-lg">
    <!-- Khi click vào ảnh, chuyển đến Tab4Page.vue -->
    <router-link :to="'/tabs/tab4/' + items.maSP">
      <img :src="items.hinh" alt="A road bike" class="w-[400px] h-[150px] object-cover rounded-lg cursor-pointer" />
    </router-link>

    <div class="mt-4">
      <p class="text-gray-400">{{ items.moTa }}</p>
      
      <!-- Khi click vào tên sản phẩm, chuyển đến Tab4Page.vue -->
      <router-link :to="'/tabs/tab4/' + items.maSP">
        <h2 class="text-xl font-bold cursor-pointer">{{ items.tenSp }}</h2>
      </router-link>

      <p class="text-lg" style="font-size: smaller;">{{ items.khoangGia }}</p>
    </div>
  </div>
</div>

        
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { useRouter } from "vue-router";
interface Bike {
  maSP: string;
  thuongHieu: string;
  khoangGia: string;
  moTa: string;
  hinh: string;
  tenSp: string;
}
const router = useRouter();
const isLoggedIn = ref(false);
// Kiểm tra nếu có Access Token -> Người dùng đã đăng nhập
const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem("AccessToken");
};
const goToLogin = () => {
  router.push("/tabs/login");
};
// Xử lý đăng xuất
const logout = () => {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("RefreshToken");
  localStorage.removeItem("user");
  isLoggedIn.value = false;
  alert("Bạn đã đăng xuất thành công!");
  router.push("/login");
};
const product = ref<Bike[]>()

// load product
const getProducts = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchData = await fetch('https://localhost:7137/api/Home/GetAllProduct')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      product.value = data.data.map((item: Bike) => ({
        maSP: item.maSP,
        tenSp: item.tenSp,
        moTa: item.moTa,
        khoangGia: item.khoangGia,
        thuongHieu: item.thuongHieu,
        hinh: 'https://localhost:7029/Hinh/SanPham/'+ item.hinh 
      }))
      console.log('product', product.value)
    })
}

onMounted(async () => {
  await getProducts()
})
onMounted(checkLoginStatus);
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>
