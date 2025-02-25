<template>
  <ion-page>
    <ion-content>
      <div class="bg-gray-900 text-white font-sans p-4 h-screen ">
        <div class="flex justify-between items-center">
          <div class="text-lg">9:41</div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-white rounded-full"></div>
            <div class="w-4 h-4 bg-white rounded-full"></div>
            <div class="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <h1 class="text-2xl font-bold mt-4">Bike</h1>
        <div class="relative mt-4">
          <img src="https://storage.googleapis.com/a1aa/image/L29N55G8EYKMvTmCggJBhvIypBpdJM1iox76GQHBlsU.jpg"
            alt="A modern road bike" class="w-full rounded-lg" width="600" height="400">
          <div
            class="absolute bottom-4 left-4 bg-blue-600 text-white  font-bold px-4 py-2 text-center w-20 h-20 rounded-full">
            30% OFF</div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-th-large"></i></button>
          <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-bicycle"></i></button>
          <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-road"></i></button>
          <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-mountain"></i></button>
          <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-helmet-safety"></i></button>
        </div>
        <div class="relative mt-4">
          <input type="text" placeholder="Tìm kiếm" v-model="searchQuery"
            class="w-full p-2 rounded-lg bg-gray-800 text-white" />
          <i class="fas fa-search absolute right-4 top-3 text-gray-400"></i>
        </div>
        <div class="container mx-auto p-4">
          <div class="flex flex-col lg:flex-row">
            <!-- Sidebar (Bộ lọc) -->
            <div class="w-full lg:w-1/4 p-4 bg-gray-700 rounded-lg shadow-md">
              <div class="flex justify-between items-center mb-4 bg-gray-700 p-2 rounded relative">
                <button id="filter-button" class="bg-blue-600 text-white py-2 px-4 rounded">Bộ lọc</button>
                <div class="text-white flex-1 text-center">
                  <button @click="sortProducts('asc')" class="text-white hover:text-blue-500">Giá thấp</button>
                  <span class="mx-2 text-white">|</span>
                  <button @click="sortProducts('desc')" class="text-white hover:text-blue-500">Giá cao</button>
                </div>
              </div>
              <div id="filter-content" class="hidden">
                <div class="mb-4">
                  <h2 class="font-bold text-lg text-white">DANH MỤC SẢN PHẨM</h2>
                  <select v-model="selectedCategory" class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                    <option value="">Chọn danh mục</option>
                    <option v-for="category in categories" :key="category.id" :value="category.tenDanhMuc">
                      {{ category.tenDanhMuc }}
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <h2 class="font-bold text-lg text-white">THƯƠNG HIỆU</h2>
                  <select v-model="selectedBrand" class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                    <option value="">Chọn thương hiệu</option>
                    <option v-for="brand in brand" :key="brand.id" :value="brand.tenThuongHieu">
                      {{ brand.tenThuongHieu }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="flex justify-center mt-4 space-x-2">
              <button @click="prevPage" :disabled="page === 1" class="px-4 py-2  text-white rounded">
                Trước
              </button>

              <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)"
                :class="['px-4 py-2 rounded', page === pageNumber ? 'bg-blue-600 text-white' : ' text-white']">
                {{ pageNumber }}
              </button>

              <button @click="nextPage" :disabled="page === totalPages" class="px-4 py-2  text-white rounded">
                Tiếp
              </button>
            </div>

            <!-- Main Content -->

            <h2 class="text-xl font-bold mt-4">Tất cả sản phẩm</h2>
<div class="grid grid-cols-2 gap-4 mt-4">
  <div v-for="item in sortedAndFilteredProducts" :key="item.maSP"
    class="relative bg-gray-800 p-4 rounded-lg">
    
    <!-- Bọc ảnh trong router-link -->
    <router-link :to="'/tabs/tab4/' + item.maSP">
      <img :src="item.hinh" alt="A road bike"
        class="w-full h-[150px] object-cover rounded-lg cursor-pointer" />
    </router-link>

    <div class="absolute top-4 right-4 text-blue-500">
      <i class="fas fa-heart"></i>
    </div>

    <div class="mt-4">
      <p class="text-gray-400">{{ item.moTa }}</p>

      <!-- Bọc tên sản phẩm trong router-link -->
      <router-link :to="'/tabs/tab4/' + item.maSP">
        <h2 class="text-xl font-bold cursor-pointer" style="font-size: smaller; font-weight: bold;">
          {{ item.tenSp }}
        </h2>
      </router-link>

      <p class="text-lg" style="font-size: smaller;">{{ item.khoangGia }}</p>
    </div>
  </div>
</div>

            </div>
          </div>

        <div class="flex justify-center mt-4 space-x-4">

        </div>


      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { onMounted, ref, computed, watch } from 'vue';

onMounted(() => {
  const filterButton = document.getElementById('filter-button');
  const filterContent = document.getElementById('filter-content');

  filterButton?.addEventListener('click', function () {
    filterContent?.classList.toggle('hidden');
  });
});

interface Bike {
  maSP: string;
  thuongHieu: string;
  khoangGia: string;
  moTa: string;
  hinh: string;
  tenSp: string;
  danhMuc: string;
}

interface Category {
  id: string;
  tenDanhMuc: string;
}

interface Brand {
  id: string;
  tenThuongHieu: string;
}

const product = ref<Bike[]>([]);
const categories = ref<Category[]>([]);
const brand = ref<Brand[]>([]);
const sortOrder = ref<'asc' | 'desc'>('asc');
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedBrand = ref('');
const page = ref(1);
const pageSize = ref(5);
const totalPages = ref(1);

const goToPage = (pageNumber: number) => {
  if (pageNumber !== page.value) {
    page.value = pageNumber;
    getProducts();
  }
};

const getProducts = async () => {
  try {
    const response = await fetch(`https://localhost:7137/api/Home/GetAllProduct?page=${page.value}&pageSize=${pageSize.value}`);
    const data = await response.json();

    if (data && data.data) {
      product.value = data.data.map((item: Bike) => ({
        maSP: item.maSP,
        tenSp: item.tenSp,
        moTa: item.moTa,
        khoangGia: item.khoangGia,
        thuongHieu: item.thuongHieu,
        danhMuc: item.danhMuc,
        hinh: 'https://localhost:7029/Hinh/SanPham/' + item.hinh,
      }));

      totalPages.value = data.totalPages;
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    getProducts();
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    getProducts();
  }
};

const getCategories = async () => {
  try {
    const response = await fetch('https://localhost:7137/api/Categories/GetAllCategory');
    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      console.error("Lỗi dữ liệu danh mục:", data);
      return;
    }

    categories.value = data.map((item: Category) => ({
      id: item.id,
      tenDanhMuc: item.tenDanhMuc
    }));
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
  }
};

const getBrand = async () => {
  try {
    const response = await fetch('https://localhost:7137/api/Brands/GetAllBrand');
    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      console.error("Lỗi dữ liệu thương hiệu:", data);
      return;
    }

    brand.value = data.map((item: Brand) => ({
      id: item.id,
      tenThuongHieu: item.tenThuongHieu
    }));
  } catch (error) {
    console.error("Lỗi khi lấy thương hiệu", error);
  }
};

const filteredProducts = computed(() => {
  return product.value.filter((item) => {
    const matchesSearch =
      item.tenSp.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.moTa.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.khoangGia.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCategory = selectedCategory.value ? item.danhMuc === selectedCategory.value : true;
    const matchesBrand = selectedBrand.value ? item.thuongHieu === selectedBrand.value : true;

    return matchesSearch && matchesCategory && matchesBrand;
  });
});

const sortedAndFilteredProducts = computed(() => {
  return [...filteredProducts.value].sort((a, b) => {
    const priceA = parseFloat(a.khoangGia.replace(/[^0-9.-]+/g, ''));
    const priceB = parseFloat(b.khoangGia.replace(/[^0-9.-]+/g, ''));
    return sortOrder.value === 'asc' ? priceA - priceB : priceB - priceA;
  });
});

const sortProducts = (order: 'asc' | 'desc') => {
  sortOrder.value = order;
};

// Theo dõi sự thay đổi của searchQuery, selectedCategory, và selectedBrand
watch([searchQuery, selectedCategory, selectedBrand], () => {
  page.value = 1; // Đưa về trang đầu tiên
  getProducts(); // Gọi lại hàm lấy sản phẩm
});

onMounted(async () => {
  await getProducts();
  await getCategories();
  await getBrand();
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>
