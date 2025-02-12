
<template>
    <div class="bg-gray-900 flex items-center justify-center min-h-screen">
      <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 class="text-2xl font-bold text-center text-white mb-6">Đăng Nhập</h2>
        <form>
          <div class="mb-4">
            <label class="block text-gray-400 mb-2" for="username">
              <i class="fas fa-user mr-2"></i>Tên người dùng
            </label>
            <input
              class="w-full px-3 py-2 text-gray-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              placeholder="Tên người dùng"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-400 mb-2" for="password">
              <i class="fas fa-lock mr-2"></i>Mật khẩu
            </label>
            <input
              class="w-full px-3 py-2 text-gray-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Mật khẩu"
            />
          </div>
          <button
            class="w-full bg-blue-600 text-white py-3 rounded-full text-lg  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 "
          style="padding: 10px; border-radius: 5px; ">
            Đăng nhập
          </button>
          <button
          style="padding: 10px; border-radius: 5px" 
            class="w-full bg-red-600 text-white py-3 rounded-full text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          >
            <i class="fab fa-google mr-2"></i>Đăng nhập bằng Google
          </button>
          <button
            class="w-full bg-blue-800 text-white py-3 rounded-full text-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style="padding: 10px; border-radius: 5px" 
          >
            <i class="fab fa-facebook-f mr-2"></i>Đăng nhập bằng Facebook
          </button>
        </form>
        <p class="text-center text-gray-500 text-sm mt-6">
          © 2025 - Front_end - <a href="#" class="text-blue-500 hover:underline">Privacy</a>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginForm',
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
  
  </style>
  