
<template>
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
      <img src="https://storage.googleapis.com/a1aa/image/L29N55G8EYKMvTmCggJBhvIypBpdJM1iox76GQHBlsU.jpg" alt="A modern road bike" class="w-full rounded-lg" width="600" height="400">
      <div class="absolute bottom-4 left-4 bg-blue-600 text-white text-xl font-bold px-4 py-2 rounded-lg">30% OFF</div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-th-large"></i></button>
      <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-bicycle"></i></button>
      <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-road"></i></button>
      <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-mountain"></i></button>
      <button class="bg-gray-800 p-2 rounded-lg"><i class="fas fa-helmet-safety"></i></button>
    </div>
    <div class="relative mt-4">
      <input type="text" placeholder="Search" class="w-full p-2 rounded-lg bg-gray-800 text-white">
      <i class="fas fa-search absolute right-4 top-3 text-gray-400"></i>
    </div>
    <div class="container mx-auto p-4">
      <div class="flex flex-col lg:flex-row">
        <!-- Sidebar (Bộ lọc) -->
        <div class="w-full lg:w-1/4 p-4 bg-gray-700 rounded-lg shadow-md">
          <div class="flex justify-between items-center mb-4 bg-gray-700 p-2 rounded relative">
            <button id="filter-button" class="bg-blue-600 text-white py-2 px-4 rounded">Bộ lọc</button>
            <div class="text-white flex-1 text-center">
              <span class="text-white">Giá thấp</span>
              <span class="mx-2 text-white">|</span>
              <span class="text-white">Giá cao</span>
            </div>
          </div>
          <div id="filter-content" class="hidden">
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">DANH MỤC SẢN PHẨM</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn danh mục</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">THƯƠNG HIỆU</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn thương hiệu</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">SIZE XE</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn size xe</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">SIZE BÁNH</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn size bánh</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">LOẠI THẮNG</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn loại thắng</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">KÍCH THƯỚC</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn kích thước</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">MỤC ĐÍCH SỬ DỤNG</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn mục đích sử dụng</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">KHOẢNG GIÁ</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn khoảng giá</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">SỐ LÍP</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn số líp</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">TIỆN ÍCH</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn tiện ích</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">CHẤT LIỆU KHUNG</h2>
              <select class="w-full mt-2 p-2 border rounded bg-gray-800 text-white">
                <option>Chọn chất liệu khung</option>
              </select>
            </div>
            <div class="mb-4">
              <h2 class="font-bold text-lg text-white">GIÁ SẢN PHẨM</h2>
              <input type="range" min="0" max="200000000" class="w-full mt-2 bg-gray-800 text-white">
              <p class="mt-2 text-white">Giá: Từ 0vnd - 200.000.000vnd</p>
            </div>
            <button class="w-full bg-blue-600 text-white py-2 rounded">Xoá tất cả</button>
          </div>
        </div>
        <!-- Main Content -->
        <div class="w-full lg:w-3/4 p-4">
          <h2 class="text-xl font-bold mt-4">All Products</h2>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="relative bg-gray-800 p-4 rounded-lg">
              <img src="https://storage.googleapis.com/a1aa/image/XXWpgckwYgK49lEARGrMTmjq7Z5uSvKeIXFU_0-uqlE.jpg" alt="A road bike" class="w-full rounded-lg" width="200" height="200">
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
              <img src="https://storage.googleapis.com/a1aa/image/sUlAfLOqK1AqwHsLinv_qZI-yosoHTnQRXYei3r4lWk.jpg" alt="A road helmet" class="w-full rounded-lg" width="200" height="200">
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
              <img src="https://storage.googleapis.com/a1aa/image/XXWpgckwYgK49lEARGrMTmjq7Z5uSvKeIXFU_0-uqlE.jpg" alt="A road bike" class="w-full rounded-lg" width="200" height="200">
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
              <img src="https://storage.googleapis.com/a1aa/image/sUlAfLOqK1AqwHsLinv_qZI-yosoHTnQRXYei3r4lWk.jpg" alt="A road helmet" class="w-full rounded-lg" width="200" height="200">
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
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around items-center">
      <button class="bg-blue-600 p-4 rounded-full"><i class="fas fa-bicycle text-white"></i></button>
      <button class="p-4"><i class="fas fa-map text-white"></i></button>
      <button class="p-4"><i class="fas fa-shopping-cart text-white"></i></button>
      <button class="p-4"><i class="fas fa-user text-white"></i></button>
      <button class="p-4"><i class="fas fa-file-alt text-white"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseYourBike',
  mounted() {
    const filterButton = document.getElementById('filter-button');
    const filterContent = document.getElementById('filter-content');

    filterButton.addEventListener('click', function () {
      filterContent.classList.toggle('hidden');
    });
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>
