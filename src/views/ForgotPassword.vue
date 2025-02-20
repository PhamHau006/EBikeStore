<template>
    <ion-page>
      <ion-content>
        <div class="bg-gray-900 flex items-center justify-center min-h-screen">
          <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h2 class="text-2xl font-bold text-center text-white mb-6">Quên Mật Khẩu</h2>
  
            <!-- Form Nhập Email -->
            <form @submit.prevent="forgotPassword">
              <div class="mb-4">
                <label class="block text-gray-400 mb-2" for="email">
                  <i class="fas fa-envelope mr-2"></i>Nhập Email Đã Đăng Ký
                </label>
                <input
                  v-model="email"
                  class="w-full px-3 py-2 text-gray-900 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500"
                  type="email"
                  id="email"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
  
              <!-- Nút Gửi Yêu Cầu -->
              <button
                class="w-full bg-blue-600 text-white py-3 rounded-full text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                :disabled="loading"
              >
                {{ loading ? "Đang xử lý..." : "Gửi yêu cầu" }}
              </button>
            </form>
  
            <!-- Hiển thị thông báo -->
            <p v-if="message" class="text-center mt-4 text-white">
              {{ message }}
            </p>
  
            <!-- Quay lại Đăng nhập -->
            <p class="text-center text-gray-500 text-sm mt-6">
              <router-link to="/login" class="text-blue-500 hover:underline">
                Quay lại Đăng nhập
              </router-link>
            </p>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { IonPage, IonContent } from "@ionic/vue";
  
  const email = ref("");
  const loading = ref(false);
  const message = ref("");
  
  // ✅ Gửi yêu cầu quên mật khẩu
  const forgotPassword = async () => {
    loading.value = true;
    message.value = "";
  
    try {
      const response = await fetch(
        `https://localhost:7137/api/Accounts/ForgotPasswordCustomer?email=${email.value}`
      );
  
      const result = await response.json();
  
      if (result.success) {
        message.value = "✅ Mật khẩu mới đã được gửi đến email của bạn!";
      } else {
        message.value = "⚠ " + result.message;
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      message.value = "❌ Lỗi hệ thống, vui lòng thử lại!";
    }
  
    loading.value = false;
  };
  </script>
  
  <style scoped>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
  </style>
  