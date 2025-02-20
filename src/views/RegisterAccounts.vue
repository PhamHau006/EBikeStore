
<template>
  <ion-page>
    <ion-content>
      <div class="bg-gray-900 flex items-center justify-center min-h-screen">
        <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 class="text-3xl font-bold text-center text-white mb-6">Đăng Ký</h2>

          <form @submit.prevent="register">
            <!-- Họ và Tên -->
            <div class="mb-4">
              <label class="block text-gray-400 mb-2">Họ và Tên</label>
              <input v-model="registerData.hoTen" class="input-field" type="text" placeholder="Nhập họ và tên" required />
            </div>

            <!-- Tên tài khoản -->
            <div class="mb-4">
              <label class="block text-gray-400 mb-2">Tên tài khoản</label>
              <input v-model="registerData.tenTaiKhoan" class="input-field" type="text" placeholder="Nhập tên tài khoản" required />
            </div>

            <!-- Email -->
            <div class="mb-4">
              <label class="block text-gray-400 mb-2">Email</label>
              <input v-model="registerData.email" class="input-field" type="email" placeholder="Nhập email" required />
            </div>

            <!-- Mật khẩu -->
            <div class="mb-4">
              <label class="block text-gray-400 mb-2">Mật khẩu</label>
              <input v-model="registerData.matKhau" class="input-field" type="password" placeholder="Nhập mật khẩu" required />
            </div>

            <!-- Nút Đăng Ký -->
            <button class="btn-submit" :disabled="loading">
              {{ loading ? "Đang đăng ký..." : "Đăng ký" }}
            </button>
          </form>

          <p class="text-center text-gray-500 text-sm mt-6">
            Đã có tài khoản? 
            <router-link to="/login" class="text-blue-500 hover:underline">
              Đăng nhập ngay
            </router-link>
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const registerData = ref({
  hoTen: "",
  tenTaiKhoan: "",
  email: "",
  matKhau: "",
});

const register = async () => {
  loading.value = true;
  try {
    const response = await fetch("https://localhost:7137/api/Accounts/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData.value),
    });

    const result = await response.json();
    console.log(result);
    if (result.success) {
      alert("Đăng ký thành công!");
      router.push("/login");
    } else {
      alert(result.message || "Đăng ký thất bại!");
    }
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    alert("Lỗi hệ thống, vui lòng thử lại!");
  }
  loading.value = false;
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #4b5563;
  background-color: #1f2937;
  color: #d1d5db;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #3b82f6;
  outline: none;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: #10b981;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;
}

.btn-submit:disabled {
  background-color: #6b7280;
}

.btn-submit:hover:not(:disabled) {
  background-color: #059669;
}
</style>
