
<template>
    <ion-page>
      <ion-content>
    <div class="bg-gray-900 text-white font-sans p-4 h-screen overflow-y-auto">
      <div class="flex justify-between items-center">
        <div class="text-lg">9:41</div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <div class="w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
      <h1 class="text-2xl font-bold mt-4">Order History</h1>
      <div class="relative mt-4">
        <input type="text" placeholder="Search Orders" class="w-full p-2 rounded-lg bg-gray-800 text-white">
        <i class="fas fa-search absolute right-4 top-3 text-gray-400"></i>
      </div>
      <div class="container mx-auto p-4">
        <div class="grid grid-cols-1 gap-4 mt-4">
          <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-xl font-bold">Order #12345</h2>
                <p class="text-gray-400">Date: 2023-10-01</p>
                <p class="text-gray-400">Total: $199.99</p>
              </div>
              <div>
                <button class="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" @click="toggleModal(12345)">View Details</button>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-center">
                <img src="https://storage.googleapis.com/a1aa/image/-OC5nC55EShi-shOnlEwMdEKVE-WsNuagvFuFOOj1Kk.jpg" alt="Product image of a road bike" class="w-16 h-16 rounded-lg shadow-md" width="100" height="100">
                <div class="ml-4">
                  <p class="text-gray-400">Road Bike</p>
                  <h2 class="text-lg font-bold">PEUGETO - LR01</h2>
                  <p class="text-gray-400">Quantity: 1</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-xl font-bold">Order #12346</h2>
                <p class="text-gray-400">Date: 2023-09-25</p>
                <p class="text-gray-400">Total: $120.00</p>
              </div>
              <div>
                <button class="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" @click="toggleModal(12346)">View Details</button>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-center">
                <img src="https://storage.googleapis.com/a1aa/image/8HyyBlnT9TY6C31sGnKQ4c3jOo8dUibP5P6fPsGVSko.jpg" alt="Product image of a road helmet" class="w-16 h-16 rounded-lg shadow-md" width="100" height="100">
                <div class="ml-4">
                  <p class="text-gray-400">Road Helmet</p>
                  <h2 class="text-lg font-bold">SMITH - Trade</h2>
                  <p class="text-gray-400">Quantity: 1</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-xl font-bold">Order #12347</h2>
                <p class="text-gray-400">Date: 2023-09-15</p>
                <p class="text-gray-400">Total: $1999.99</p>
              </div>
              <div>
                <button class="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" @click="toggleModal(12347)">View Details</button>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-center">
                <img src="https://storage.googleapis.com/a1aa/image/-OC5nC55EShi-shOnlEwMdEKVE-WsNuagvFuFOOj1Kk.jpg" alt="Product image of a road bike" class="w-16 h-16 rounded-lg shadow-md" width="100" height="100">
                <div class="ml-4">
                  <p class="text-gray-400">Road Bike</p>
                  <h2 class="text-lg font-bold">PEUGETO - LR01</h2>
                  <p class="text-gray-400">Quantity: 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around items-center">
        <button class="bg-blue-600 p-4 rounded-full shadow-md hover:bg-blue-700 transition duration-300"><i class="fas fa-bicycle text-white"></i></button>
        <button class="p-4"><i class="fas fa-map text-white"></i></button>
        <button class="p-4"><i class="fas fa-shopping-cart text-white"></i></button>
        <button class="p-4"><i class="fas fa-user text-white"></i></button>
        <button class="p-4"><i class="fas fa-file-alt text-white"></i></button>
      </div>
  
      <!-- Modal -->
      <div id="orderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-full overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-white">Order Details</h2>
            <button class="text-white" @click="toggleModal()"><i class="fas fa-times"></i></button>
          </div>
          <div id="orderDetails" class="text-white">
            <!-- Order details will be dynamically inserted here -->
          </div>
        </div>
      </div>
    </div>
  </ion-content>
</ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import { ref } from 'vue';
  
  const toggleModal = (orderId?: number) => {
    const modal = document.getElementById("orderModal");
    const orderDetails = document.getElementById("orderDetails");
  
    if (orderId && orderDetails) {
      orderDetails.innerHTML = `
        <h3 class="text-lg font-bold mb-4">Order #${orderId}</h3>
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <div class="text-center">
              <div class="bg-blue-600 text-white py-2 px-4 rounded-full flex items-center justify-center">
                <i class="fas fa-box mr-2"></i> Đã lấy đơn
              </div>
              <div class="mt-2 text-gray-400">2023-10-01</div>
            </div>
            <div class="flex-1 h-1 bg-gray-600 mx-2 relative">
              <div class="absolute left-0 top-0 h-1 bg-blue-600" style="width: 50%;"></div>
            </div>
            <div class="text-center">
              <div class="bg-blue-600 text-white py-2 px-4 rounded-full flex items-center justify-center">
                <i class="fas fa-truck mr-2"></i> Đang vận chuyển
              </div>
              <div class="mt-2 text-gray-400">2023-10-02</div>
            </div>
            <div class="flex-1 h-1 bg-gray-600 mx-2 relative">
              <div class="absolute left-0 top-0 h-1 bg-gray-600" style="width: 0%;"></div>
            </div>
            <div class="text-center">
              <div class="bg-gray-600 text-white py-2 px-4 rounded-full flex items-center justify-center">
                <i class="fas fa-check mr-2"></i> Đã giao hàng
              </div>
              <div class="mt-2 text-gray-400">2023-10-03</div>
            </div>
            <div class="flex-1 h-1 bg-gray-600 mx-2 relative">
              <div class="absolute left-0 top-0 h-1 bg-gray-600" style="width: 0%;"></div>
            </div>
            <div class="text-center">
              <div class="bg-gray-600 text-white py-2 px-4 rounded-full flex items-center justify-center">
                <i class="fas fa-flag-checkered mr-2"></i> Hoàn thành
              </div>
              <div class="mt-2 text-gray-400">2023-10-04</div>
            </div>
          </div>
        </div>
      `;
    }
  
    if (modal) {
      modal.classList.toggle("hidden");
    }
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
  </style>
  