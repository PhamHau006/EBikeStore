<template>
    <ion-page>
      <ion-header class="ion-no-border">
        <ion-toolbar class="bg-[#1A1D26] px-4">
          <ion-buttons slot="start">
            <ion-button class="text-white" @click="router.back()">
              <ion-icon :icon="chevronBack" />
            </ion-button>
          </ion-buttons>
          <ion-title class="font-bold text-white">PEUGETO - LR01</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="bg-[#1A1D26]">
        <!-- Diagonal Background -->
        <div class="relative h-full">
          <div class="absolute top-0 right-0 w-3/4 h-full bg-[#2D5BFF] transform -skew-x-12 origin-top-right z-0"></div>
          
          <!-- Main Content -->
          <div class="relative z-10 h-full">
            <!-- Product Image -->
            <div class="w-full h-[80vh] flex items-center justify-center p-8">
              <img 
                :src="'../../public/bike1.png'" 
                alt="Peugeot LR01 Bicycle" 
                class="max-h-full object-contain"
              />
            </div>
  
            <!-- Tab Buttons -->
            <div class="absolute z-50 bottom-0 w-full flex justify-around p-4 bg-[#1E2128]/80 backdrop-blur-sm">
              <button 
                @click="openSheet('description')"
                class="text-gray-400 py-2 px-6 rounded-lg"
                :class="{ 'text-blue-400': activeTab === 'description' }"
              >
                Description
              </button>
              <button 
                @click="openSheet('specification')"
                class="text-gray-400 py-2 px-6 rounded-lg"
                :class="{ 'text-blue-400': activeTab === 'specification' }"
              >
                Specification
              </button>
            </div>
          </div>
        </div>
      </ion-content>
  
      <!-- Bottom Sheet Modal -->
      <ion-modal
        :is-open="isSheetOpen"
        :breakpoints="[0, 0.85]"
        :initial-breakpoint="0.85"
        @didDismiss="closeSheet"
        class="product-sheet-modal"
      >
        <ion-content class="bg-[#1E2128]">
          <div class="p-6 space-y-6">
            <div class="flex gap-6 border-b border-gray-700">
              <button 
                @click="activeTab = 'description'"
                class="pb-2 px-1"
                :class="activeTab === 'description' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'"
              >
                Description
              </button>
              <button 
                @click="activeTab = 'specification'"
                class="pb-2 px-1"
                :class="activeTab === 'specification' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'"
              >
                Specification
              </button>
            </div>
  
            <!-- Description Content -->
            <div v-if="activeTab === 'description'">
              <h2 class="text-2xl font-bold text-white mb-4">PEUGETO - LR01</h2>
              <p class="text-gray-300 leading-relaxed">
                The LR01 uses the same design as the most iconic bikes from PEUGEOT Cycles' 130-year history and combines it with agile, dynamic performance that's perfectly suited to navigating today's cities. As well as a lugged steel frame and iconic PEUGEOT black-and-white chequer design, this city bike also features a 16-speed Shimano Claris drivetrain.
              </p>
            </div>
  
            <!-- Specification Content -->
            <div v-else>
              <h2 class="text-2xl font-bold text-white mb-4">Specifications</h2>
              <div class="space-y-4 text-gray-300">
                <div class="flex justify-between">
                  <span>Frame</span>
                  <span>Steel</span>
                </div>
                <div class="flex justify-between">
                  <span>Drivetrain</span>
                  <span>16-speed Shimano Claris</span>
                </div>
                <div class="flex justify-between">
                  <span>Weight</span>
                  <span>10.5 kg</span>
                </div>
              </div>
            </div>
  
            <!-- Price and Cart -->
            <div class="flex items-center justify-between pt-4 mt-8">
              <div class="text-2xl font-bold text-blue-400">$ 1999.99</div>
              <ion-button 
                class="h-12 px-6 font-medium"
                expand="block"
              >
                ADD TO CART
              </ion-button>
            </div>
            <div class="h-10"></div>
          </div>
        </ion-content>
      </ion-modal>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonModal
  } from '@ionic/vue';
  import { chevronBack } from 'ionicons/icons';
import router from '@/router';
  
  const isSheetOpen = ref(false);
  const activeTab = ref('description');
  
  const openSheet = (tab: string) => {
    activeTab.value = tab;
    isSheetOpen.value = true;
  };
  
  const closeSheet = () => {
    isSheetOpen.value = false;
  };

  onMounted(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.display = 'none';
    }
  });

  onUnmounted(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.display = 'block';
    }
  });
  </script>
  
  <style>
  ion-button {
    --background: #2D5BFF;
    --background-hover: #2448cc;
    --border-radius: 8px;
  }
  
  .product-sheet-modal {
    --height: 55%;
    --border-radius: 20px 20px 0 0;
  }
  
  .product-sheet-modal::part(content) {
    border-radius: 20px 20px 0 0;
  }
  </style>