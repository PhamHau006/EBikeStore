  <template>
    <ion-page>
      <ion-content>
        <div class="bg-gray-900 flex items-center justify-center min-h-screen">
          <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm ">
            <h2 class="text-2xl font-bold text-center text-white mb-6">Đăng Nhập</h2>

            <form @submit.prevent="login">
              <!-- Tên người dùng -->
              <div class="mb-4">
                <label class="block text-gray-400 mb-2" for="username">
                  <i class="fas fa-user mr-2"></i>Tên người dùng hoặc Email
                </label>
                <input v-model="loginData.username"
                  class="w-full px-3 py-2 text-gray-900 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500"
                  type="text" id="username" placeholder="Nhập tên tài khoản hoặc email" required />
              </div>

              <!-- Mật khẩu -->
              <div class="mb-6">
                <label class="block text-gray-400 mb-2" for="password">
                  <i class="fas fa-lock mr-2"></i>Mật khẩu
                </label>
                <input v-model="loginData.password"
                  class="w-full px-3 py-2 text-gray-900 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500"
                  type="password" id="password" placeholder="Nhập mật khẩu" required />
              </div>

              <!-- Nút Đăng Nhập -->
              <button
                class="w-full bg-blue-600 text-white py-3 rounded-full text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 mb-4"
                :disabled="loading" style="border-radius: 5px; height: 40px;">
                {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
              </button>
            </form>

            <!-- Đăng nhập bằng Google -->
            <button @click="loginWithGoogle"
              class="w-full bg-red-600 text-white py-3 rounded-full text-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 mb-4"
              style="border-radius: 5px; height: 40px;">
              <i class="fab fa-google mr-2"></i>Đăng nhập bằng Google
            </button>

            <!-- Đăng nhập bằng Facebook -->
            <button
              class="w-full bg-blue-800 text-white py-3 rounded-full text-lg hover:bg-blue-900 focus:ring-2 focus:ring-blue-500"
              style="border-radius: 5px; height: 40px;">
              <i class="fab fa-facebook-f mr-2"></i>Đăng nhập bằng Facebook
            </button>
            <!-- Nút Đăng ký -->
            <button @click="goToRegister"
              class="w-full bg-gray-700 text-white py-3 rounded-full text-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 mb-4"
              style="border-radius: 5px; height: 40px; margin-top: 20px;">
              <i class="fas fa-user-plus mr-2"></i>Đăng ký tài khoản
            </button>
            <!-- Quên mật khẩu -->
            <p class="text-center text-gray-500 text-sm mt-6">
              <router-link to="/forgot-password" class="text-blue-500 hover:underline">
                Quên mật khẩu?
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
const loginData = ref({
  username: "",
  password: "",
});

// API Endpoint
const API_BASE_URL = "https://localhost:7137/api/Accounts";

const login = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${API_BASE_URL}/LoginCustomer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email_TenTaiKhoan: loginData.value.username,
        MatKhau: loginData.value.password,
      }),
    });

    const result = await response.json();

    if (result.success) {
      // ✅ Lưu Access Token & Refresh Token vào localStorage
      localStorage.setItem("AccessToken", result.data.accessToken);
      localStorage.setItem("RefreshToken", result.data.refreshToken);

      // ✅ Giải mã Access Token để lấy thông tin khách hàng
      const decodedToken = JSON.parse(atob(result.data.accessToken.split(".")[1])); // Giải mã JWT
      console.log("🔹 Access Token Decoded:", decodedToken);

      // ✅ Lưu thông tin vào LocalStorage
      const userInfo = {
        maKH: decodedToken.sub, // Mã khách hàng (sub trong JWT)
        fullName: decodedToken.FullName || "", // Họ tên
        phone: decodedToken.PhoneNumber ? decodedToken.PhoneNumber.trim() : "", // Số điện thoại (trim để loại bỏ khoảng trắng)
      };

      localStorage.setItem("user", JSON.stringify(userInfo)); // 🔥 Lưu dưới dạng JSON

      // ✅ Kiểm tra lại xem dữ liệu đã lưu hay chưa
      console.log("✅ User Info Saved in localStorage:", JSON.parse(localStorage.getItem("user") || "{}"));

      alert("Đăng nhập thành công!");
      router.push("/tabs/tab1"); // Chuyển hướng sau khi đăng nhập
    } else {
      alert(result.message || "Đăng nhập thất bại!");
    }
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    alert("Lỗi hệ thống, vui lòng thử lại!");
  }
  loading.value = false;
};




// 🔵 Hàm đăng nhập bằng Google
const loginWithGoogle = async () => {
  try {
    // Mở cửa sổ đăng nhập Google
    const googleLoginUrl = `${API_BASE_URL}/LoginGoogle`;
    const newWindow = window.open(googleLoginUrl, "_blank", "width=500,height=600");

    // Kiểm tra cửa sổ mới
    if (newWindow) {
      const checkPopupClosed = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkPopupClosed);
          checkLoginStatus();
        }
      }, 1000);
    }
  } catch (error) {
    console.error("Lỗi khi đăng nhập bằng Google:", error);
    alert("Lỗi hệ thống, vui lòng thử lại!");
  }
};

// 🟢 Kiểm tra nếu đăng nhập Google thành công
const checkLoginStatus = () => {
  const accessToken = localStorage.getItem("AccessToken");
  const refreshToken = localStorage.getItem("RefreshToken");

  if (accessToken && refreshToken) {
    alert("Đăng nhập Google thành công!");
    router.push("/tabs/tab1");
  } else {
    alert("Lỗi đăng nhập Google!");
    router.push("/login");
  }
};
// 🟢 Hàm chuyển hướng đến trang đăng ký
const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
</style>
