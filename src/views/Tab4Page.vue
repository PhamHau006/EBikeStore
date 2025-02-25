<template>
  <!-- Chi tiết sản phẩm -->
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="bg-[#1A1D26] px-4 shadow-md">
        <ion-buttons slot="start">
          <ion-button class="text-white" @click="$router.back()">
            <ion-icon :icon="chevronBack" />
          </ion-button>
        </ion-buttons>
        <ion-title class="font-bold text-white text-lg">{{ product?.tenSp || 'Sản phẩm' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="bg-[#1A1D26] text-white font-roboto h-full flex flex-col">
      <div class="relative min-h-screen flex flex-col flex-grow overflow-y-auto p-6">
        <div v-if="product">
          <!-- Ảnh sản phẩm -->
          <div class="text-center">
            <img v-if="product?.hinh" :src="'https://localhost:7029/Hinh/SanPham/' + product?.hinh" alt="Hình sản phẩm"
              class="rounded-lg w-full max-h-96 object-contain shadow-lg" />
            <h1 class="text-3xl font-bold text-white mt-4">{{ product?.tenSp }}</h1>
            <p class="text-gray-400 mt-2">{{ product?.moTa }}</p>
          </div>

          <!-- Chọn màu sắc -->
          <div class="mt-6">

            <div class="flex gap-2 flex-wrap">
              <h2 class="text-2xl font-bold text-white mb-2" style=" font-size: large;">Màu sắc:</h2>
              <button v-for="(color, index) in availableColors" :key="index" @click="selectColor(color)"
                :class="['color-btn', { 'selected': selectedColor === color }]">
                {{ color }}
              </button>
            </div>
          </div>

          <!-- Chọn kích thước -->
          <div class="mt-6">

            <div class="flex gap-2 flex-wrap">
              <h2 class="text-2xl font-bold text-white mb-2" style=" font-size: large;">Kích thước:</h2>
              <button v-for="(size, index) in availableSizes" :key="index" @click="selectSize(size)"
                :class="['size-btn', { 'selected': selectedSize === size }]">
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Chọn số lượng -->

          <div class="mt-6 flex items-center gap-4">
            <h2 class="text-2xl font-bold text-white" style="font-size: large;">Số lượng:</h2>
            <button class="quantity-btn" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
            <input type="number" v-model="quantity" class="quantity-input" style="height: 40px;"
              @input="validateQuantity" />
            <button class="quantity-btn" @click="increaseQuantity" :disabled="quantity >= selectedStock">+</button>
          </div>


          <!-- Thông tin sản phẩm -->
          <div class="mt-8 py-6 border-t border-gray-600">
            <p class="text-white mt-4">
              <strong class="text-lg" style=" ">Số lượng tồn:</strong>
            </p>
            <p v-if="selectedStock > 0" class="text-3xl font-bold text-blue-400 text-center mt-2">
              {{ selectedStock }}
            </p>
            <p v-else class="text-3xl font-bold text-red-500 mt-2 text-center" style=" font-size: large;">Hết hàng</p>

            <p class="text-blue-400 font-bold text-xl mt-6" style=" font-size: 20px;">
              <strong>Giá:</strong> {{ formatVND(selectedPrice) }}
            </p>
          </div>

          <!-- Tổng tiền -->
          <div class="mt-auto py-6 border-t border-gray-600">
            <p class="text-2xl font-bold text-blue-400 ">
              <strong>Tổng tiền:</strong> {{ formatVND(totalPrice) }}
            </p>
          </div>
          <div class="mt-6">
            <ion-button expand="block" class="cart-btn" @click="addToCart">
              Thêm vào giỏ hàng
            </ion-button>
          </div>
        </div>

        <!-- Hiển thị nếu chưa có dữ liệu -->
        <p v-else class="text-center text-white">Đang tải dữ liệu...</p>
      </div>
 <!-- Hộp thông báo -->
 <ion-alert :is-open="alertConfig.isOpen" :header="alertConfig.title" :message="alertConfig.message"
        :buttons="['OK']" @didDismiss="alertConfig.isOpen = false"></ion-alert>
    </ion-content>


  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { formatVND } from '@/utils/utils';

interface ChiTietSanPham {
  maMau: number;
  tenMau: string;
  maKichThuoc: number;
  tenKichThuoc: string;
  soLuongTon: number;
  donGia: number;
}
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;       // ✅ Vẫn giữ tên màu (cho UI)
  size: string;        // ✅ Vẫn giữ tên kích thước (cho UI)
  maMau: number;       // ✅ Thêm ID màu cho API
  maKichThuoc: number; // ✅ Thêm ID kích thước cho API
}

interface Product {
  maSP: number;
  tenSp: string;
  thuongHieu: string;
  hinh: string;
  moTa: string;
  chitietsanphams: ChiTietSanPham[];
}

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);
const selectedColor = ref<string | null>(null);
const selectedSize = ref<string | null>(null);
const quantity = ref<number>(1);
const selectedStock = ref<number>(0);
const selectedPrice = ref<number>(0);
const isLoggedIn = ref<boolean>(false);
  const cartItems = ref([]);
  // Biến alert
const alertConfig = ref({
  isOpen: false,
  title: "",
  message: ""
});
// Kiểm tra đăng nhập
const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem("AccessToken");
};
// Kiểm tra đăng nhập & Thêm vào giỏ hàng
const addToCart = () => {
  // Kiểm tra đăng nhập
  if (!isLoggedIn.value) {
    alertConfig.value = {
      isOpen: true,
      title: "Thông báo",
      message: "Bạn chưa đăng nhập! Chuyển đến trang đăng nhập sau 3 giây..."
    };
    setTimeout(() => router.push("/login"), 3000);
    return;
  }

  // Kiểm tra nếu chưa chọn màu hoặc kích thước
  if (!selectedColor.value || !selectedSize.value) {
    alertConfig.value = {
      isOpen: true,
      title: "Lỗi",
      message: "Vui lòng chọn màu sắc và kích thước!"
    };
    return;
  }

  // Tìm biến thể sản phẩm theo màu sắc và kích thước đã chọn
  const selectedVariant = product.value?.chitietsanphams.find(
    (p) => p.tenMau === selectedColor.value && p.tenKichThuoc === selectedSize.value
  );

  if (!selectedVariant) {
    alertConfig.value = {
      isOpen: true,
      title: "Lỗi",
      message: "Sản phẩm không tồn tại với màu sắc và kích thước đã chọn!"
    };
    return;
  }

  // Tạo object sản phẩm để thêm vào giỏ hàng
  const newItem = {
    id: product.value?.maSP,
    name: product.value?.tenSp,
    image: `https://localhost:7029/Hinh/SanPham/${product.value?.hinh}`,
    price: selectedPrice.value,
    quantity: quantity.value,
    color: selectedColor.value,
    size: selectedSize.value,
    maMau: selectedVariant.maMau,
    maKichThuoc: selectedVariant.maKichThuoc
  };

  // Lấy giỏ hàng từ LocalStorage
  const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingItemIndex = existingCart.findIndex(
    (item: any) =>
      item.id === newItem.id && item.maMau === newItem.maMau && item.maKichThuoc === newItem.maKichThuoc
  );

  if (existingItemIndex !== -1) {
    // Nếu sản phẩm đã tồn tại, kiểm tra tồn kho trước khi tăng số lượng
    if (existingCart[existingItemIndex].quantity + newItem.quantity > selectedStock.value) {
      alertConfig.value = {
        isOpen: true,
        title: "Thông báo",
        message: `Bạn chỉ có thể thêm tối đa ${selectedStock.value} sản phẩm vào giỏ hàng!`
      };
      return;
    }
    existingCart[existingItemIndex].quantity += newItem.quantity;
  } else {
    existingCart.push(newItem);
  }

  // Cập nhật giỏ hàng vào LocalStorage
  localStorage.setItem("cart", JSON.stringify(existingCart));

  // Hiển thị thông báo thành công
  alertConfig.value = {
    isOpen: true,
    title: "Thành công",
    message: "Sản phẩm đã được thêm vào giỏ hàng!"
  };
};





// Lấy dữ liệu sản phẩm
const getProductDetail = async () => {
  const productId = route.params.id;
  try {
    const response = await fetch(`https://localhost:7137/api/Home/GetProductById/${productId}`);
    const data = await response.json();
    if (data) {
      product.value = data;
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
  }
};

// Lấy danh sách màu sắc từ `chitietsanphams`
const availableColors = computed(() => {
  return product.value ? [...new Set(product.value.chitietsanphams.map(p => p.tenMau))] : [];
});

// Lấy danh sách kích thước dựa trên màu sắc đã chọn
const availableSizes = computed(() => {
  return product.value && selectedColor.value
    ? product.value.chitietsanphams.filter(p => p.tenMau === selectedColor.value).map(p => p.tenKichThuoc)
    : [];
});

// Chọn màu sắc
const selectColor = (color: string) => {
  selectedColor.value = color;
  selectedSize.value = null;
  selectedStock.value = 0;
  selectedPrice.value = 0;
};

// Chọn kích thước
const selectSize = (size: string) => {
  selectedSize.value = size;
  const variant = product.value?.chitietsanphams.find(p => p.tenMau === selectedColor.value && p.tenKichThuoc === size);
  selectedStock.value = variant?.soLuongTon || 0;
  selectedPrice.value = variant?.donGia || 0;
};

// Tổng tiền
const totalPrice = computed(() => selectedPrice.value * quantity.value);

// Xử lý kiểm tra số lượng nhập vào
const validateQuantity = () => {
  if (quantity.value < 1 || isNaN(quantity.value)) {
    quantity.value = 1; // Không cho nhập số âm
  }
  if (quantity.value > selectedStock.value) {
    quantity.value = selectedStock.value; // Giới hạn không vượt quá tồn kho
  }
};

// Tăng/Giảm số lượng
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const increaseQuantity = () => {
  if (quantity.value < selectedStock.value) {
    quantity.value++;
  }
};
onMounted(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cartItems.value = JSON.parse(storedCart);
    console.log("📢 Dữ liệu giỏ hàng trong trang thanh toán:", cartItems.value);
  }
});


onMounted(() => {
  checkLoginStatus();
  getProductDetail();
});

</script>


<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

h1,
h2 {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* 🔵 Button chung */
button {
  transition: all 0.3s ease;
}

/* 🌈 Button Màu sắc & Kích thước */
.color-btn,
.size-btn {
  background-color: #3a3d46;
  color: #b0b3b8;
  padding: 10px 18px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  border: 2px solid transparent;
}

.color-btn:hover,
.size-btn:hover {
  background-color: #5267db;
  color: #ffffff;
}

.color-btn.selected,
.size-btn.selected {
  background-color: #2d5bff;
  color: white;
  border: 2px solid #ffffff;
  box-shadow: 0px 0px 12px rgba(45, 91, 255, 0.8);
}

/* 🔼🔽 Button số lượng */
.quantity-btn {
  background-color: #3a3d46;
  color: white;
  padding: 8px 14px;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.quantity-btn:hover {
  background-color: #2d5bff;
  transform: scale(1.1);
}

/* 🆙 Ô nhập số lượng */
.quantity-input {
  width: 60px;
  text-align: center;
  background-color: #292c33;
  color: white;
  border: 2px solid #3a3d46;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
}

.quantity-input:focus {
  border-color: #2d5bff;
  outline: none;
  box-shadow: 0px 0px 8px rgba(45, 91, 255, 0.6);
}
</style>
