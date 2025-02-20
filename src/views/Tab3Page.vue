<template>
  <!-- Giỏ hàng -->
  <ion-page class="bg-[#1C1C1E]">
    <ion-header class="ion-no-border">
      <div class="bg-[#1C1C1E] px-4 pt-4">
        <div class="flex items-center justify-center">
          <h1 class="text-xl text-white font-medium ml-3">🛒 Giỏ Hàng</h1>
        </div>
      </div>
    </ion-header>

    <ion-content class="bg-[#1C1C1E] h-screen">
      <ion-list class="bg-[#1C1C1E] px-4 py-2">
        <ion-item
          v-for="item in cartItems"
          :key="`${item.id}-${item.color}-${item.size}`"
          class="mb-4 rounded-xl bg-[#2C2C2E]"
          lines="none"
        >
          <div class="flex items-center justify-between w-full p-3 relative">
            <div class="flex items-center flex-1">
              <div class="w-24 h-24 bg-[#3C3C3E] rounded-xl mr-4 flex-shrink-0">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div class="flex-1">
                <span class="text-white text-sm font-medium">{{ item.name }}</span>
                <p class="text-gray-400 text-sm">Màu: {{ item.color }} | Size: {{ item.size }}</p>
                <p class="text-[#0A84FF] text-sm mt-1">{{ formatVND(item.price) }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <ion-button
                fill="clear"
                class="h-8 w-8 rounded-lg bg-[#0A84FF] m-0 p-0"
                @click="updateQuantity(item, item.quantity + 1)"
              >
                <ion-icon :icon="add" class="text-white text-lg" />
              </ion-button>
              <span class="text-white mx-2 min-w-[12px] text-center">{{ item.quantity }}</span>
              <ion-button
                fill="clear"
                class="h-8 w-8 rounded-lg bg-[#0A84FF] m-0 p-0"
                @click="updateQuantity(item, Math.max(1, item.quantity - 1))"
              >
                <ion-icon :icon="remove" class="text-white text-lg" />
              </ion-button>
            </div>
            <div class="absolute right-0 top-0 flex items-center justify-center w-8 h-8 bg-transparent rounded-lg">
              <ion-icon 
                :icon="closeCircleOutline" 
                class="text-white text-lg" 
                size="large"
                @click="removeFromCart(item)"
              />
            </div>
          </div>
        </ion-item>
      </ion-list>

      <div class="px-4 mt-4 mb-10">
        <div class="flex justify-between items-center mb-4">
          <span class="text-white text-sm">Tổng tiền:</span>
          <span class="text-[#0A84FF] font-medium">{{ formatVND(calculateTotal()) }}</span>
        </div>
        <ion-button 
          expand="block" 
          class="bg-[#0A84FF] rounded-lg h-12"
          @click="checkout"
          :disabled="cartItems.length === 0"
        >
          Thanh toán!
        </ion-button>
      </div>
      <div class="h-20"></div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, watch } from "vue";
import { IonPage, IonContent, IonList, IonItem, IonButton, IonIcon } from "@ionic/vue";
import { add, remove, closeCircleOutline } from "ionicons/icons";
import { formatVND } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";
// ✅ Cập nhật kiểu dữ liệu của CartItem
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


const cartItems = ref<CartItem[]>([]);

// 🛒 Load giỏ hàng từ `localStorage`
const loadCart = () => {
  console.log(localStorage.getItem("cart"))
  cartItems.value = JSON.parse(localStorage.getItem("cart") || "[]");
};


// 🔄 Cập nhật số lượng sản phẩm trong giỏ hàng
const updateQuantity = (item: CartItem, newQuantity: number) => {
  // Tìm số lượng tồn kho của sản phẩm này
  const stockKey = `${item.id}-${item.color}-${item.size}`;
  const stock = localStorage.getItem(`stock_${stockKey}`);
  const maxStock = stock ? parseInt(stock, 10) : 0;

  // Nếu số lượng vượt quá số lượng tồn kho, giữ nguyên số lượng hiện tại
  if (newQuantity > maxStock) {
    alert(`Số lượng không được vượt quá ${maxStock} sản phẩm có sẵn!`);
    return;
  }

  // Cập nhật số lượng sản phẩm
  const updatedCart = cartItems.value.map((cartItem) =>
    cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size
      ? { ...cartItem, quantity: newQuantity }
      : cartItem
  );

  cartItems.value = updatedCart;
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};


// ❌ Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = (item: CartItem) => {
  cartItems.value = cartItems.value.filter(
    (cartItem) =>
      cartItem.id !== item.id || cartItem.color !== item.color || cartItem.size !== item.size
  );
  localStorage.setItem("cart", JSON.stringify(cartItems.value));
};

// 💰 Tính tổng tiền
const calculateTotal = () => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
};
// 🔄 Tự động cập nhật giỏ hàng khi `localStorage` thay đổi
watchEffect(() => {
  loadCart();
});
const route = useRoute ()
 watch ( ( ) => route.params,() => {loadCart} )

const router = useRouter();

const checkout = () => {
  // Lưu giỏ hàng vào localStorage để chuyển sang CheckoutPage.vue
  localStorage.setItem("cart", JSON.stringify(cartItems.value));

  // Điều hướng đến trang CheckoutPage.vue
  router.push("/checkout");
};




onMounted(loadCart);
</script>

<style>
ion-item {
  --background: #2C2C2E;
  --border-radius: 12px;
  --padding-start: 0;
  --inner-padding-end: 0;
}

ion-button {
  --background: #0A84FF;
  --background-activated: #0A84FF;
  --background-focused: #0A84FF;
  --background-hover: #0A84FF;
  --color: white;
  --border-radius: 8px;
  margin: 0;
}

ion-input {
  --background: #3C3C3E;
  --color: white;
  --placeholder-color: #8E8E93;
  --padding-start: 12px;
  --padding-end: 12px;
  height: 20px;
}

.checkout-button {
  --background: #0A84FF;
  --background-activated: #0A84FF;
  --background-focused: #0A84FF;
  --background-hover: #0A84FF;
  --border-radius: 8px;
  --color: white;
  margin: 0;
  height: 48px;
  width: 100%;
}
</style>
