<template>
      <ion-page>
        <ion-content>
    <div class="loading-container">
      <p>Đang xác thực tài khoản Google...</p>
    </div>
</ion-content>
</ion-page>

  </template>
  
  <script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("accessToken");
  const refreshToken = params.get("refreshToken");

  if (accessToken && refreshToken) {
    localStorage.setItem("AccessToken", accessToken);
    localStorage.setItem("RefreshToken", refreshToken);
    alert("Đăng nhập Google thành công!");

    // Kiểm tra nếu trang này mở trong cửa sổ mới
    if (window.opener) {
      window.opener.location.reload(); // Cập nhật trang cha
      window.close(); // Đóng cửa sổ đăng nhập Google
    } else {
      router.push("/tabs/tab1"); // Điều hướng trong ứng dụng
    }
  } else {
    alert("Lỗi đăng nhập Google!");
    router.push("/login");
  }
});

  </script>
  
  <style scoped>
  .loading-container {
    text-align: center;
    padding: 20px;
  }
  </style>
  