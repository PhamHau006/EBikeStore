<template>
  <ion-page>
    <nav ref="navRef">
      <ul>
        <router-link 
          v-for="(route, index) in routes" 
          :key="index"
          :to="route.path"
          :class="{ active: $route.path === route.path }"
          custom 
          v-slot="{ navigate }"
        >
          <li 
            ref="tabRefs"
            @click="handleTabClick(navigate, index)"
          >
            <i :class="icons[index]"></i>
          </li>
        </router-link>
      </ul>
      <div class="effect">
        <div class="circle"></div>
      </div>
    </nav>
    
    <ion-content>
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonContent,
  IonRouterOutlet 
} from '@ionic/vue'
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const routes = [
  { path: '/tabs/tab1' },
  { path: '/tabs/tab2' },
  { path: '/tabs/tab3' },
  { path: '/tabs/tab4' },
  { path: '/tabs/tab5' }
]

const icons = [
  'fa-solid fa-house',
  'fa-solid fa-bicycle',
  'fa-solid fa-bag-shopping',
  'fa-solid fa-user',
  'fa-solid fa-cog'
]

const activeTab = ref(0)
const navRef = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLElement[]>([])

const handleTabClick = async (navigate: () => void, index: number) => {
  navigate()
  activeTab.value = index

  await nextTick()

  if (!navRef.value || !tabRefs.value[index]) return

  const tabElement = tabRefs.value[index]
  const navElement = navRef.value

  navElement.style.setProperty('--position-x-active', `${tabElement.offsetLeft}px`)
}

onMounted(() => {
  const currentRouteIndex = routes.findIndex(r => r.path === route.path)
  if (currentRouteIndex !== -1) {
    activeTab.value = currentRouteIndex
    if (navRef.value && tabRefs.value[currentRouteIndex]) {
      navRef.value.style.setProperty('--position-x-active', `${tabRefs.value[currentRouteIndex].offsetLeft}px`)
    }
  }
})
</script>

<style scoped>
nav {
  color: #fff;
  position: fixed;
  inset: auto 0 0 0;
  border-bottom: 20px solid #fff;
  width: (500px, 100%);
  --w-h-item: 60px;
  --position-x-active: 170px;
  z-index: 10;
}

ion-content {
  --padding-top: 60px;
}

nav ul {
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(5, var(--w-h-item));
  grid-template-rows: var(--w-h-item);
  justify-content: space-between;
}

nav ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: 0.5s;
  color: #353F54;
}

nav ul li.active {
  transform: translateY(-10px);
  color: #4B4CED;
}

nav .effect {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  height: calc(var(--w-h-item) + 10px);
  background: #0a0c0f;
  z-index: -1;
  overflow: hidden;
}

nav .effect::before {
  position: absolute;
  left: 0;
  bottom: 0;
  height: var(--w-h-item);
  width: calc(var(--position-x-active) - 10px);
  background: #242C3B;
  content: '';
  border-top-right-radius: 30px;
  transition: 0.5s;
}

nav .effect::after {
  position: absolute;
  right: 0;
  bottom: 0;
  height: var(--w-h-item);
  width: calc(100% - var(--position-x-active) - var(--w-h-item) - 10px);
  background: #242C3B;
  content: '';
  border-top-left-radius: 30px;
  transition: 0.5s;
}

nav .effect .circle {
  position: absolute;
  width: var(--w-h-item);
  height: var(--w-h-item);
  background: #37B6E9;
  border-radius: 50%;
  bottom: 2;
  left: var(--position-x-active);
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}

nav .effect .circle::before {
  position: absolute;
  left: -10px;
  right: -10px;
  content: '';
  height: 100%;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 0 50px 0 30px #242C3B;
  bottom: -10px;
  transition: 0.5s;
}
</style>