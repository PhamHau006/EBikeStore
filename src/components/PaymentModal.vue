<template>
    <ion-modal
      :is-open="isOpen"
      :breakpoints="[0, 0.5, 0.8]"
      :initial-breakpoint="0.8"
      @didDismiss="closeModal"
      class="payment-modal"
    >
      <ion-header class="ion-no-border">
        <ion-toolbar class="bg-[#1C1C1E]">
          <ion-buttons slot="start">
            <ion-button @click="closeModal">
              <ion-icon :icon="closeOutline" class="text-white" />
            </ion-button>
          </ion-buttons>
          <ion-title class="text-white">Thanh toán</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="bg-[#1C1C1E]">
        <div class="p-4">
          <!-- Payment Method Section -->
          <div class="bg-[#2C2C2E] rounded-xl p-4 mb-4">
            <h3 class="text-white text-lg mb-4">Phương thức thanh toán</h3>
            <ion-radio-group v-model="paymentMethod">
              <ion-item class="mb-2 rounded-lg bg-[#3C3C3E]" lines="none">
                <ion-label class="text-white">Thẻ tín dụng</ion-label>
                <ion-radio slot="start" value="credit" />
              </ion-item>
              <ion-item class="mb-2 rounded-lg bg-[#3C3C3E]" lines="none">
                <ion-label class="text-white">Momo</ion-label>
                <ion-radio slot="start" value="momo" />
              </ion-item>
              <ion-item class="rounded-lg bg-[#3C3C3E]" lines="none">
                <ion-label class="text-white">Tiền mặt</ion-label>
                <ion-radio slot="start" value="cash" />
              </ion-item>
            </ion-radio-group>
          </div>
  
          <!-- Delivery Address Section -->
          <div class="bg-[#2C2C2E] rounded-xl p-4 mb-4">
            <h3 class="text-white text-lg mb-4">Địa chỉ giao hàng</h3>
            <ion-item class="mb-2 rounded-lg bg-[#3C3C3E]" lines="none">
              <ion-input
                v-model="address"
                label="Địa chỉ"
                label-placement="floating"
                class="text-white"
              />
            </ion-item>
            <ion-item class="rounded-lg bg-[#3C3C3E]" lines="none">
              <ion-input
                v-model="phone"
                label="Số điện thoại"
                label-placement="floating"
                class="text-white"
              />
            </ion-item>
          </div>
  
          <!-- Order Summary -->
          <div class="bg-[#2C2C2E] rounded-xl p-4">
            <h3 class="text-white text-lg mb-4">Tổng quan đơn hàng</h3>
            <div class="flex justify-between mb-2">
              <span class="text-gray-400">Tổng tiền hàng:</span>
              <span class="text-white">{{ formatVND(total) }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-400">Phí vận chuyển:</span>
              <span class="text-white">{{ formatVND(10000) }}</span>
            </div>
            <div v-if="discount" class="flex justify-between mb-2">
              <span class="text-gray-400">Giảm giá:</span>
              <span class="text-[#0A84FF]">-{{ formatVND(calculateDiscount()) }}</span>
            </div>
            <div class="flex justify-between mt-4 pt-4 border-t border-[#3C3C3E]">
              <span class="text-white font-medium">Tổng thanh toán:</span>
              <span class="text-[#0A84FF] font-medium">{{ formatVND(calculateFinalTotal()) }}</span>
            </div>
            <div class="p-4">
                <ion-button
                    expand="block"
                    class="bg-[#0A84FF] rounded-lg h-12"
                    @click="handlePayment"
                >
                    Xác nhận thanh toán
                </ion-button>
            </div>
        </div>
        <div class="h-40"></div>
        </div>
      </ion-content>
    </ion-modal>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonRadioGroup,
    IonRadio,
    IonInput,
    IonIcon,
  } from '@ionic/vue'
  import { closeOutline } from 'ionicons/icons'
  import { formatVND } from '@/utils/utils'
  
  const props = defineProps<{
    isOpen: boolean
    total: number
    discount?: number
  }>()
  
  const emit = defineEmits(['close', 'payment-confirmed'])
  
  const paymentMethod = ref('credit')
  const address = ref('')
  const phone = ref('')
  const getProducts = () => {
    const product = fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
  }
  
  onMounted(() => {
    console.log('Component mounted. Props:', props)
  })
  
  const closeModal = () => {
    emit('close')
  }
  
  const calculateDiscount = () => {
    console.log('Calculating discount. Discount value:', props.discount)
    if (props.discount === undefined) return 0
    return (props.total * props.discount) / 100
  }
  
  const calculateFinalTotal = () => {
    const subtotal = props.total
    const shipping = 10000 // 10,000 VND for shipping
    const discount = calculateDiscount()
    const finalTotal = subtotal + shipping - discount
    console.log('Calculating final total:', { subtotal, shipping, discount, finalTotal })
    return finalTotal
  }
  
  const handlePayment = () => {
    console.log('Handling payment')
    emit('payment-confirmed', {
      paymentMethod: paymentMethod.value,
      address: address.value,
      phone: phone.value,
      total: calculateFinalTotal()
    })
  }
  </script>
  
  <style scoped>
  .payment-modal {
    --height: 100%;
    --border-radius: 20px 20px 0 0;
  }
  
  ion-radio {
    --color: #0A84FF;
    --color-checked: #0A84FF;
  }
  
  ion-item {
    --background: #3C3C3E;
    --border-radius: 12px;
    --padding-start: 16px;
    --padding-end: 16px;
    margin-bottom: 8px;
  }
  
  ion-input {
    --background: transparent;
    --color: white;
    --placeholder-color: #8E8E93;
    --padding-start: 0;
    --padding-end: 0;
  }
  </style>