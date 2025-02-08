<template>
  <ion-page class="bg-[#1C1C1E]">
    <ion-header class="ion-no-border">
      <div class="bg-[#1C1C1E] px-4 pt-4">
        <div class="flex items-center justify-center">
          <h1 class="text-xl text-white font-medium ml-3">🛒</h1>
        </div>
      </div>
    </ion-header>

    <ion-content class="bg-[#1C1C1E] h-screen">
      <ion-list class="bg-[#1C1C1E] px-4 py-2">
        <ion-item
          v-for="item in cartItems"
          :key="item.id"
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
                <p class="text-[#0A84FF] text-sm mt-1">{{ formatVND(item.price) }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <ion-button
                fill="clear"
                class="h-8 w-8 rounded-lg bg-[#0A84FF] m-0 p-0"
                @click="updateQuantity(item.id, item.quantity + 1)"
              >
                <ion-icon :icon="add" class="text-white text-lg" />
              </ion-button>
              <span class="text-white mx-2 min-w-[12px] text-center">{{ item.quantity }}</span>
              <ion-button
                fill="clear"
                class="h-8 w-8 rounded-lg bg-[#0A84FF] m-0 p-0"
                @click="updateQuantity(item.id, Math.max(1, item.quantity - 1))"
              >
                <ion-icon :icon="remove" class="text-white text-lg" />
              </ion-button>
            </div>
            <div class="absolute right-0 top-0 flex items-center justify-center w-8 h-8 bg-transparent rounded-lg">
              <ion-icon 
                :icon="closeCircleOutline" 
                class="text-white text-lg" 
                size="large"
                @click="cartItems = cartItems.filter(cartItem => cartItem.id !== item.id)"
              />
            </div>
          </div>
        </ion-item>
      </ion-list>

      <div class="px-4 mt-4 mb-10">
        <div class="bg-[#2C2C2E] rounded-xl p-4 mb-4">
          <div class="flex gap-2">
            <ion-input
              v-model="promoCode"
              :clear-input="true"
              label="Mã giảm giá" 
              label-placement="floating" 
              fill="outline"
              class="bg-[#3C3C3E] rounded-lg text-white px-3"
            />
            <ion-button
              class="w-36 h-12 m-0"
              :disabled="!promoCode || cartItems.length === 0"
              @click="applyPromoCode"
            >
              Áp dụng
            </ion-button>
          </div>
          <div v-if="appliedDiscount" class="text-[#0A84FF] text-sm mt-2">
            Giảm giá: {{ appliedDiscount }}%
          </div>
        </div>

        <div class="flex justify-between items-center mb-4">
          <span class="text-white text-sm">Tổng tiền:</span>
          <span class="text-[#0A84FF] font-medium">{{ formatVND(calculateFinalTotal()) }}</span>
        </div>
        <ion-button 
          expand="block" 
          class="bg-[#0A84FF] rounded-lg h-12"
          @click="showConfirmation"
          :disabled="cartItems.length === 0"
        >
          Thanh toán!
        </ion-button>
      </div>
      <div class="h-20">

      </div>
    </ion-content>

    <ion-alert
      :is-open="showAlert"
      header="Xác nhận thanh toán"
      message="Bạn có chắc chắn muốn tiến hành thanh toán?"
      :buttons="[
        {
          text: 'Hủy',
          role: 'cancel',
          handler: () => {
            showAlert = false
          }
        },
        {
          text: 'Đồng ý',
          handler: () => {
            showAlert = false
            showPaymentModal = true
          }
        }
      ]"
    />

    <PaymentModal
      :is-open="showPaymentModal"
      :total="calculateTotal()"
      :discount="appliedDiscount || undefined"
      @close="showPaymentModal = false"
      @payment-confirmed="handlePaymentConfirmed"
    />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  IonPage, 
  IonHeader, 
  IonContent,
  IonList, 
  IonItem,
  IonButton,
  IonInput,
  IonAlert,
  IonIcon,
} from '@ionic/vue'
import { add, remove, closeCircleOutline } from 'ionicons/icons'
import PaymentModal from '@/components/PaymentModal.vue'
import { formatVND } from '@/utils/utils'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: 'PEUGETO - LR01',
    price: 45990000,
    quantity: 1,
    image: '/bike1.png'
  },
  {
    id: 2,
    name: 'PILOT - CHROMOLY 520', 
    price: 42990000,
    quantity: 1,
    image: '/bike2.png'
  },
  {
    id: 3,
    name: 'SMITH - Trade',
    price: 2790000,
    quantity: 1,
    image: '/bike3.png'
  },
])

const promoCode = ref('')
const appliedDiscount = ref<number | null>(null)
const showAlert = ref(false)
const showPaymentModal = ref(false)

const updateQuantity = (id: number, newQuantity: number) => {
  const item = cartItems.value.find(item => item.id === id)
  if (item) {
    item.quantity = newQuantity
  }
}

const calculateTotal = () => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
}

const calculateFinalTotal = () => {
  const subtotal = calculateTotal()
  if (!appliedDiscount.value) return subtotal
  return subtotal * (1 - appliedDiscount.value / 100)
}

const applyPromoCode = () => {
  if (promoCode.value === 'SAVE10') {
    appliedDiscount.value = 10
  } else if (promoCode.value === 'SAVE20') {
    appliedDiscount.value = 20
  } else {
    appliedDiscount.value = null
  }
  promoCode.value = ''
}

const showConfirmation = () => {
  showAlert.value = true
}

const handlePaymentConfirmed = (paymentDetails: any) => {
  console.log('Payment confirmed:', paymentDetails)
  showPaymentModal.value = false
}
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