<template>
  <ion-page>
    <ion-content>
      <div class="bg-gray-900 text-white font-sans p-4 h-screen overflow-y-auto">
        <h1 class="text-2xl font-bold mt-4">Order History</h1>
        <div class="relative mt-4">
          <input type="text" placeholder="Search Orders" class="w-full p-2 rounded-lg bg-gray-800 text-white" v-model="searchQuery">
          <i class="fas fa-search absolute right-4 top-3 text-gray-400"></i>
        </div>

        <div class="container mx-auto p-4">
          <div class="grid grid-cols-1 gap-4 mt-4">
            <div v-for="order in filteredOrders" :key="order.maHoaDon" class="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div class="flex justify-between items-center">
                <div>
                  <h2 class="text-xl font-bold">Mã hoá đơn #{{ order.maHoaDon }}</h2>
                  <p class="text-gray-400">Ngày đặt: {{ order.ngayTao }}</p>
                  <p class="text-gray-400">Tổng tiền: {{ order.tongTien }}</p>
                  <p class="text-gray-400">Tình trạng: {{ order.tinhTrang }}</p>
                </div>
                <div>
                  <button class=" text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" 
                  @click="toggleModal(order.maHoaDon)">
                    Chi tiết
                  </button>
                </div>
              </div>
              <div class="mt-4">
                <div v-for="product in order.products" :key="product.id" class="flex items-center">
                  <img :src="product.imageUrl" alt="Product image" class="w-16 h-16 rounded-lg shadow-md">
                  <div class="ml-4">
                    <p class="text-gray-400">{{ product.category }}</p>
                    <h2 class="text-lg font-bold">{{ product.name }}</h2>
                    <p class="text-gray-400">Số lượng: {{ product.quantity }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div id="orderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" v-if="showModal">
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-full overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-white">Chi tiết đơn hàng</h2>
              <button class="text-white" @click="toggleModal()"><i class="fas fa-times"></i></button>
            </div>
            <div id="orderDetails" class="text-white">
              <h3 class="text-lg font-bold mb-4">Mã hoá đơn #{{ selectedOrder?.maHoaDon }}</h3>
              <p>Ngày tạo: {{ selectedOrder?.ngayTao }}</p>
              <p>Tổng tiền: {{ selectedOrder?.tongTien }} VND</p>
              <p>Phương thức: {{ selectedOrder?.httt }}</p>
              <p>Địa chỉ: {{ selectedOrder?.diaChiNhanHang }}</p>
              <p>Trạng thái: {{ selectedOrder?.tinhTrang }}</p>
              <div v-if="selectedOrder?.lyDoHuy" class="text-red-400">Lý do huỷ do: {{ selectedOrder.lyDoHuy }}</div>
              <div class="mt-4">
                <h4 class="text-lg font-bold">Sản phẩm:</h4>
                <ul>
                  <li v-for="product in selectedOrder?.products" :key="product.id">
                    {{ product.name }} - {{ product.quantity }} x ${{ product.price }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();


interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

interface Order {
  maHoaDon: number; // Mã hóa đơn
  diaChiNhanHang: string; // Địa chỉ nhận hàng
  ngayTao: string; // Ngày tạo đơn
  httt: string; // Hình thức thanh toán (VD: VNPAY, COD)
  tinhTrang: string; // Tình trạng đơn hàng (VD: Đã xác nhận, Đang giao)
  maNv: number | null; // Mã nhân viên xử lý đơn (nếu có)
  maKh: number; // Mã khách hàng đặt đơn
  moTa?: string | null; // Mô tả đơn hàng (nếu có)
  hoten: string; // Họ và tên khách hàng
  sdt: string; // Số điện thoại nhận hàng
  thoiGianGiao: string | null; // Dự kiến giao hàng (có thể null)
  giamGiaMaCoupon: number; // Giảm giá từ mã coupon
  phiVanChuyen: number; // Phí vận chuyển
  tienGoc: number; // Tổng tiền trước giảm giá
  tongTien: number; // Tổng tiền phải thanh toán
  lyDoHuy?: string | null; // Lý do hủy đơn (nếu có)
  products: Product[]; // Danh sách sản phẩm trong đơn hàng
}


const orders = ref<Order[]>([]);
  const selectedOrder = ref<Order | null>(null);

const showModal = ref(false);
const searchQuery = ref("");

// Fetch order list from API
const fetchOrders = async () => {
  const token = localStorage.getItem("AccessToken"); // Lấy token từ localStorage
  
  if (!token) {
    console.error("⚠️ Chưa có Access Token! Vui lòng đăng nhập.");
    alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
    router.push("/login"); // Điều hướng về trang đăng nhập
    return;
  }

  try {
    const response = await fetch("https://localhost:7137/api/ClientOrder/Get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Gửi token trong header
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("🚨 Lỗi 401: Unauthorized - Token có thể đã hết hạn.");
        alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        router.push("/login");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    const data = await response.json();
    orders.value = data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách đơn hàng:", error);
    alert("Lỗi hệ thống, vui lòng thử lại!");
  }
};



// Fetch order details from API
const toggleModal = async (orderId?: number) => {
  if (orderId) {
    const token = localStorage.getItem("AccessToken");
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`https://localhost:7137/api/ClientOrder/Get/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Thêm token vào header
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
          router.push("/login");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      selectedOrder.value = await response.json();
      showModal.value = true;
    } catch (error) {
      console.error('❌ Lỗi khi lấy chi tiết đơn hàng:', error);
      alert("Lỗi hệ thống, vui lòng thử lại!");
    }
  } else {
    showModal.value = false;
  }
};



// Filter orders based on search query
const filteredOrders = computed(() => {
  if (!searchQuery.value.trim()) {
    return orders.value;
  }
  return orders.value.filter(order => 
    order.maHoaDon.toString().includes(searchQuery.value) ||  // Sửa id thành maHoaDon
    order.ngayTao.includes(searchQuery.value) ||  // Sửa date thành ngayTao
    order.tongTien.toString().includes(searchQuery.value) // Sửa total thành tongTien
  );
});



// Fetch data on component mount
onMounted(fetchOrders);
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>
