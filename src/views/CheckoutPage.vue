<template>
  <ion-page class="bg-[#1C1C1E]">
    <ion-header class="ion-no-border">
      <div class="bg-[#1C1C1E] px-4 pt-4">
        <div class="flex items-center justify-center">
          <h1 class="text-xl text-white font-medium ml-3">🛍 Thanh Toán</h1>
        </div>
      </div>
    </ion-header>

    <ion-content class="bg-[#1C1C1E] h-screen px-4">
      <div class="checkout-container">
        <h2 class="text-white text-lg font-bold mb-4">Thông tin giao hàng</h2>

        <div class="mb-4">
          <label class="text-gray-400">Họ và Tên</label>
          <input v-model="fullname" type="text" class="input-field" placeholder="Nhập họ tên">
        </div>

        <div class="mb-4">
          <label class="text-gray-400">Số điện thoại</label>
          <input v-model="phone" type="text" class="input-field" placeholder="Nhập số điện thoại">
        </div>

        <!-- Địa chỉ nhận hàng -->
        <div class="mb-4">
          <label class="text-gray-400">Tỉnh/Thành phố</label>
          <select v-model="selectedProvince" @change="fetchDistricts" class="input-field">
            <option value="">Chọn tỉnh/thành</option>
            <option v-for="province in provinces" :key="province.id" :value="province.id">
              {{ province.full_name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="text-gray-400">Quận/Huyện</label>
          <select v-model="selectedDistrict" @change="fetchWards" class="input-field">
            <option value="">Chọn quận/huyện</option>
            <option v-for="district in districts" :key="district.id" :value="district.id">
              {{ district.full_name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="text-gray-400">Phường/Xã</label>
          <select v-model="selectedWard" @change="fetchShippingFee" class="input-field">
            <option value="">Chọn phường/xã</option>
            <option v-for="ward in wards" :key="ward.id" :value="ward.id">
              {{ ward.full_name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="text-gray-400">Địa chỉ cụ thể</label>
          <input v-model="address" type="text" class="input-field" placeholder="Nhập địa chỉ cụ thể" required>
        </div>
        <div class="mb-4">
          <label class="text-gray-400">Mã giảm giá</label>
          <div class="flex gap-2">
            <input v-model="couponCode" type="text" class="input-field flex-1" placeholder="Nhập mã giảm giá">
            <ion-button class=" px-4" @click="applyCoupon">Áp dụng</ion-button>
          </div>
        </div>
        <p v-if="discountAmount > 0" class="text-green-400 mt-2">
          Mã giảm giá đã được áp dụng: Giảm {{ formatVND(discountAmount) }}
        </p>
        <p v-if="couponError" class="text-red-500 mt-2">{{ couponError }}</p>

        <h2 class="text-white text-lg font-bold mt-6 mb-4">Phương thức thanh toán</h2>
        <div class="flex gap-4">
          <label class="flex items-center">
            <input type="radio" value="COD" v-model="paymentMethod">
            <span class="text-white ml-2">Thanh toán khi nhận hàng (COD)</span>
          </label>
          <ion-button expand="block" class="bg-[#0A84FF] rounded-lg h-12 mt-6" @click="createPaymentUrl">
  Thanh toán qua VNPAY
</ion-button>


        </div>


        <div>
          <h2 class="text-white text-lg font-bold mt-6 mb-4">Tóm tắt đơn hàng</h2>
          <ul class="bg-[#2C2C2E] rounded-lg p-4">
            <li v-for="item in cartItems" :key="item.id" class="flex justify-between text-white mb-2">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>{{ formatVND(item.price * item.quantity) }}</span>
            </li>



            <!-- ✅ Hiển thị phí vận chuyển -->
            <li class="flex justify-between text-white mt-2">
              <span>Phí vận chuyển:</span>
              <span>{{ formatVND(shippingFee) }}</span>
            </li>
            <!-- ✅ Hiển thị tiền đã giảm -->
            <li v-if="discountAmount > 0" class="flex justify-between text-green-400 mt-2">
              <span>Giảm giá:</span>
              <span>-{{ formatVND(discountAmount) }}</span>
            </li>

            <!-- ✅ Hiển thị tổng tiền sau khi giảm -->
            <li class="flex justify-between text-white font-bold mt-4">
              <span>Tổng tiền sau giảm:</span>
              <span>{{ formatVND(calculateTotalAfterDiscount()) }}</span>
            </li>
          </ul>

        </div>
        <ion-button expand="block" class="bg-[#0A84FF] rounded-lg h-12 mt-6" @click="submitOrder"
          :disabled="cartItems.length === 0">
          Xác nhận đặt hàng
        </ion-button>
      </div>
       <!-- IonAlert để hiển thị thông báo -->
       <ion-alert
        :is-open="alertConfig.isOpen"
        :header="alertConfig.title"
        :message="alertConfig.message"
        :buttons="['OK']"
        @didDismiss="alertConfig.isOpen = false"
      />

    </ion-content>
  </ion-page>
  <ion-header class="ion-no-border">
  <div class="bg-[#1C1C1E] px-4 pt-4">
    <div class="flex items-center justify-center">
      <h1 class="text-xl text-white font-medium ml-3">🛍 Thanh Toán</h1>
    </div>
  </div>
</ion-header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { useRouter } from "vue-router";
import { formatVND } from "@/utils/utils";
// ✅ Định nghĩa kiểu dữ liệu cho Tỉnh, Quận, Phường
interface LocationData {
  id: string;
  full_name: string;
}

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

// ✅ Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}
// 🛠 Định nghĩa kiểu dữ liệu của Coupon
interface Coupon {
  code: string;
  soTienGiam: number | null;
  phanTramGiam: number | null;
  ngayHetHan: string;
  trangThai: boolean;
  ngayTao: string;
  minimumOrderAmount: number;
  daSuDung: boolean;
}

// ✅ Khai báo selectedCoupon với kiểu dữ liệu Coupon hoặc null


const router = useRouter();
const cartItems = ref<CartItem[]>([]);
const fullname = ref("");
const phone = ref("");
const address = ref("");
const paymentMethod = ref("COD");
const couponCode = ref(""); // Mã giảm giá nhập vào
const discountAmount = ref(0); // Số tiền được giảm
const couponError = ref(""); // Lưu thông báo lỗi
const selectedCoupon = ref<Coupon | null>(null);
const shippingFee = ref(0); // Lưu phí vận chuyển
// ✅ Danh sách địa phương (Tỉnh/Quận/Phường)
const provinces = ref<LocationData[]>([]);
const districts = ref<LocationData[]>([]);
const wards = ref<LocationData[]>([]);
const selectedProvince = ref("");
const selectedDistrict = ref("");
const selectedWard = ref("");
// Biến lưu trạng thái hiển thị thông báo
const alertConfig = ref({
  isOpen: false,
  title: "",
  message: ""
});

// Hàm hiển thị thông báo
const showAlert = (title: string, message: string) => {
  alertConfig.value = {
    isOpen: true,
    title,
    message
  };
};

// 🔹 Lấy danh sách tỉnh/thành phố
const fetchProvinces = async () => {
  try {
    const response = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
    const result = await response.json();
    if (result.error === 0) {
      provinces.value = result.data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tỉnh:", error);
  }
};
// 🔹 Khi chọn tỉnh, lấy danh sách quận/huyện
const fetchDistricts = async () => {
  districts.value = [];
  wards.value = [];
  if (!selectedProvince.value) return;

  try {
    const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince.value}.htm`);
    const result = await response.json();
    if (result.error === 0) {
      districts.value = result.data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quận/huyện:", error);
  }
};

// 🔹 Khi chọn quận/huyện, lấy danh sách phường/xã
const fetchWards = async () => {
  wards.value = [];
  if (!selectedDistrict.value) return;

  try {
    const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict.value}.htm`);
    const result = await response.json();
    if (result.error === 0) {
      wards.value = result.data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phường/xã:", error);
  }
};
// 🔹 Khi chọn phường/xã, lấy phí vận chuyển
import { watchEffect } from "vue";

const fetchShippingFee = async () => {
  if (!selectedProvince.value || !selectedDistrict.value || !selectedWard.value) {
    shippingFee.value = 0;
    return;
  }

  // 📌 Lấy tên của tỉnh, quận, phường từ danh sách API địa chỉ
  const provinceName = provinces.value.find(p => p.id === selectedProvince.value)?.full_name;
  const districtName = districts.value.find(d => d.id === selectedDistrict.value)?.full_name;
  const wardName = wards.value.find(w => w.id === selectedWard.value)?.full_name;

  console.log("📢 Địa chỉ gửi lên API Shipping:", provinceName, districtName, wardName);

  try {
    const response = await fetch(
      `https://localhost:7137/api/Shippings/GetShippingFee?pho=${provinceName}&quan=${districtName}&phuong=${wardName}`
    );
    const result = await response.json();

    console.log("🚀 Phí vận chuyển từ API:", result.data);

    if (result.success) {
      shippingFee.value = result.data || 0;
      console.log("✅ shippingFee.value sau khi cập nhật:", shippingFee.value);
    } else {
      shippingFee.value = 0;
    }
  } catch (error) {
    console.error("❌ Lỗi khi lấy phí vận chuyển:", error);
    shippingFee.value = 0;
  }
};


// 🔹 Tự động gọi `fetchShippingFee` khi `selectedWard` thay đổi
watchEffect(() => {
  fetchShippingFee();
});

const applyCoupon = async () => {
  if (!couponCode.value) {
    couponError.value = "Vui lòng nhập mã giảm giá!";
    return;
  }

  try {
    console.log("📢 Đang kiểm tra mã giảm giá:", couponCode.value);

    const response = await fetch(`https://localhost:7137/api/MaCoupons/GetAll?keywords=${couponCode.value}`);
    console.log("📢 Response Status:", response.status);

    // Nếu API không có nội dung, trả về lỗi
    const responseText = await response.text();
    console.log("📢 Response Text:", responseText);

    if (!responseText) {
      throw new Error("API không trả về dữ liệu!");
    }

    // Chuyển đổi dữ liệu từ API
    const result = JSON.parse(responseText);
    console.log("📢 API Response:", result);

    if (result.success && result.data.length > 0) {
      const coupon = result.data[0];

      // 🛑 Kiểm tra ngày hết hạn
      const now = new Date();
      const expirationDate = new Date(coupon.ngayHetHan);
      if (expirationDate < now) {
        couponError.value = "Mã giảm giá đã hết hạn!";
        return;
      }

      // 🛑 Kiểm tra đơn hàng có đạt mức tối thiểu không?
      const totalBeforeDiscount = calculateTotal();
      if (coupon.minimumOrderAmount && totalBeforeDiscount < coupon.minimumOrderAmount) {
        couponError.value = `Mã này chỉ áp dụng cho đơn hàng từ ${formatVND(coupon.minimumOrderAmount)}!`;
        return;
      }

      // 🛑 Kiểm tra mã đã được sử dụng chưa
      if (coupon.daSuDung) {
        couponError.value = "Mã giảm giá này đã được sử dụng!";
        return;
      }

      // ✅ Nếu mã hợp lệ, tính số tiền giảm giá
      if (coupon.phanTramGiam) {
        discountAmount.value = (totalBeforeDiscount * coupon.phanTramGiam) / 100;
      } else if (coupon.soTienGiam) {
        discountAmount.value = coupon.soTienGiam;
      } else {
        discountAmount.value = 0;
      }

      // Đảm bảo tổng tiền sau giảm giá không bị âm
      discountAmount.value = Math.min(discountAmount.value, totalBeforeDiscount);

      selectedCoupon.value = coupon;
      couponError.value = "";
    } else {
      discountAmount.value = 0;
      couponError.value = "Mã giảm giá không hợp lệ!";
    }
  } catch (error) {
    console.error("❌ Lỗi khi kiểm tra mã giảm giá:", error);
    couponError.value = "Lỗi hệ thống, vui lòng thử lại!";
  }
};




onMounted(() => {
  // 🛒 Lấy giỏ hàng từ localStorage
  const storedCart = localStorage.getItem("cart");
  cartItems.value = storedCart ? JSON.parse(storedCart) : [];

  // 📢 Kiểm tra dữ liệu sản phẩm
  console.log("🚀 Dữ liệu giỏ hàng:", cartItems.value);

  // 👤 Lấy thông tin người dùng từ localStorage
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    fullname.value = user.fullName || "";
    phone.value = user.phone || "";
    address.value = user.address || "";
  
  }
});

onMounted(fetchProvinces);

const calculateTotal = () => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
};
const calculateTotalAfterDiscount = () => {
  const total = cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAfterDiscount = total - discountAmount.value + shippingFee.value;

  return Math.max(totalAfterDiscount, 0); // Đảm bảo không bị âm
};
const submitOrder = async () => {
  // 🛑 Kiểm tra xem thông tin giao hàng có đầy đủ không
  if (!fullname.value || !phone.value || !address.value) {
    showAlert("Lỗi", "Vui lòng điền đầy đủ thông tin giao hàng.");
    return;
  }

  // 🛑 Lấy thông tin khách hàng từ `localStorage`
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    showAlert("Lỗi", "Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
    router.push("/login");
    return;
  }
  const user = JSON.parse(storedUser);
  const maKH = user?.maKH;

  if (!maKH) {
    showAlert("Lỗi", "Không thể xác định khách hàng. Vui lòng đăng nhập lại.");
    router.push("/login");
    return;
  }

  // 🔹 Xây dựng danh sách sản phẩm trong đơn hàng
  const orderDetails = cartItems.value.map((item) => {
    if (!item.color || !item.maMau || !item.maKichThuoc) {
      console.error("🚨 Lỗi: Thiếu thông tin sản phẩm!", item);
      showAlert("Lỗi", `Sản phẩm "${item.name}" không có màu/kích thước hợp lệ.`);
      throw new Error("Dữ liệu sản phẩm không hợp lệ!");
    }

    return {
      MaSp: item.id,
      MaMau: item.maMau,
      MaKichThuoc: item.maKichThuoc,
      SoLuong: item.quantity,
      Gia: item.price,
      ThanhTien: item.quantity * item.price,
    };
  });

  // 🔹 Xây dựng dữ liệu đơn hàng gửi lên API
  const orderData = {
    HoaDon: {
      MaKH: maKH,
      DiaChiNhanHang: address.value,
      NgayTao: new Date().toISOString().split("T")[0],
      Httt: paymentMethod.value,
      TinhTrang: "Chờ xác nhận",
      Hoten: fullname.value,
      Sdt: phone.value,
      PhiVanChuyen: shippingFee.value,
      TienGoc: calculateTotal(),
      TongTien: calculateTotalAfterDiscount(),
    },
    ChiTietHoaDons: orderDetails,
    MaCoupon: selectedCoupon.value ? selectedCoupon.value.code : null,
  };

  // Lấy access token từ localStorage
  const token = localStorage.getItem("AccessToken");
  if (!token) {
    showAlert("Lỗi", "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    router.push("/login");
    return;
  }

  try {
    // 📢 Gửi yêu cầu đến API
    const response = await fetch("https://localhost:7137/api/Checkouts/CheckoutOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  // Đính kèm token vào header
      },
      body: JSON.stringify(orderData),
    });

    console.log("📢 Response Status:", response.status);

    // 🔍 Kiểm tra phản hồi từ API
    const responseText = await response.text();
    console.log("📢 Response Text:", responseText);

    if (!responseText) {
      throw new Error("Không có phản hồi từ API.");
    }

    const result = JSON.parse(responseText);

    if (result.Success) {
      showAlert("Thành công", "Đơn hàng của bạn đã được đặt thành công!");
      localStorage.removeItem("cart"); // 🗑️ Xóa giỏ hàng sau khi đặt thành công
      router.push("/tabs/orderhistory");
    } else {
      showAlert("Lỗi", result.Message || "Thanh toán thành công.");
    }
  } catch (error) {
    console.error("❌ Lỗi khi đặt hàng:", error);
    showAlert("Lỗi", "Lỗi hệ thống, vui lòng thử lại!");
  }
};








const createPaymentUrl = async () => {
  try {
    // Lấy thông tin khách hàng từ localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const maKH = user?.maKH; // Lấy MaKH từ user

    if (!maKH) {
      alert("Không thể xác định khách hàng. Vui lòng đăng nhập lại.");
      router.push("/login");
      return;
    }

    const orderData = {
      HoaDon: {
        MaKH: maKH,
        DiaChiNhanHang: address.value,
        NgayTao: new Date().toISOString().split("T")[0],
        Httt: "VNPAY", // Xác nhận phương thức thanh toán là VNPAY
        TinhTrang: "Chờ xác nhận",
        Hoten: fullname.value,
        Sdt: phone.value,
        PhiVanChuyen: shippingFee.value,
        TienGoc: calculateTotal(),
        TongTien: calculateTotalAfterDiscount(),
      }
    };

    // Gửi yêu cầu đến backend để tạo URL thanh toán VNPAY
    const response = await fetch("https://localhost:7029/api/VnpayPayment/CreatePaymentUrl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });

    if (response.ok) {
      const paymentUrl = await response.text();
      // Chuyển hướng người dùng đến URL thanh toán
      window.location.href = paymentUrl;
    } else {
      alert("Không thể tạo URL thanh toán!");
    }
  } catch (error) {
    console.error("Lỗi khi tạo URL thanh toán:", error);
  }
};



</script>

<style scoped>
.checkout-container {
  background-color: #2C2C2E;
  padding: 20px;
  border-radius: 10px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #3C3C3E;
  color: white;
}

.input-field::placeholder {
  color: #8E8E93;
}
</style>
