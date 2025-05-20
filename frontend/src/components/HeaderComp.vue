<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img src="https://images.vexels.com/media/users/3/269843/isolated/preview/8753fcdba7f74cdccd19597669d7c10a-halloween-coffin-icon-with-a-rose.png" alt="">
        6ft Boutique
      </div>

      <!-- Hamburger Menu Button -->
      <button class="hamburger" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation Menu -->
      <nav class="nav-menu" :class="{ 'is-open': isMenuOpen }">
        <ul>
          <li><router-link to="/" @click="closeMenu">Home</router-link></li>
          <li><router-link to="/caskets" @click="closeMenu">Caskets</router-link></li>
          <li><router-link to="/coffins" @click="closeMenu">Coffins</router-link></li>
          <li><router-link to="/urns" @click="closeMenu">Urns</router-link></li>
          <li><router-link to="/petmemorials" @click="closeMenu">Pet Memorials</router-link></li>
        </ul>
      </nav>

      <!-- Header Icons -->
      <div class="header-icons" :class="{ 'is-open': isMenuOpen }">
        <router-link to="/cart" @click="closeMenu"><i class="bi bi-cart-fill"></i></router-link>
        <template v-if="isAuthenticated">
          <router-link v-if="isAdmin" to="/admin/dashboard" class="admin-dashboard-link" @click="closeMenu">
            <i class="bi bi-speedometer2"></i> Admin Dashboard
          </router-link>
          <router-link to="/profile" @click="closeMenu"><i class="bi bi-person-circle"></i></router-link>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="auth-btn" @click="closeMenu">Login</router-link>
          <router-link to="/register" class="auth-btn" @click="closeMenu">Register</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin'])
  },
  methods: {
    ...mapActions(['logout']),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
    handleLogout() {
      this.logout();
      this.closeMenu();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
header {
  background-color: #fff;
  color: #222;
  padding: 5px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  overflow: visible;
}

img {
  top: 2px;
  left: 5px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
  padding-right: 3px;
  padding-left: 10px;
  z-index: 2;
  transform: rotate(-15deg);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1300px;
  padding: 0 5px;
  position: relative;
  margin: 0 auto;
}

.logo {
  display: flex;
  padding-left: 1px;
  align-items: center;
  font-size: 55px;
  font-family: 'Brush Script MT', cursive;
  color: #222;
}

/* Hamburger Menu Styles */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background-color: #222;
  transition: all 0.3s ease-in-out;
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.nav-menu ul {
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.nav-menu ul li a {
  color: #444;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  position: relative;
}

.nav-menu ul li a::after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background: #e3b04b;
  transition: width 0.3s ease-in-out;
  position: absolute;
  bottom: -5px;
  left: 0;
}

.nav-menu ul li a:hover::after {
  width: 100%;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-icons a,
.header-icons button {
  background: none;
  border: none;
  color: #444;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.header-icons a:hover,
.header-icons button:hover {
  color: #e3b04b;
}

.auth-btn {
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #e3b04b;
  text-decoration: none;
  color: #e3b04b;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.auth-btn:hover {
  background-color: #e3b04b;
  color: #fff;
}

.logout-btn {
  padding: 5px 10px;
  border: 1px solid #ff4d4d;
  border-radius: 4px;
  background-color: #ff4d4d;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #e60000 !important;
  color: rgb(245, 245, 245) !important;
}

/* Mobile Responsive Styles */
@media (max-width: 1024px) {
  .container {
    width: 95%;
    padding: 0 15px;
  }
  
  .logo {
    font-size: 40px;
  }
  
  .nav-menu ul {
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .container {
    padding: 10px 20px;
  }

  .logo {
    font-size: 35px;
  }

  .nav-menu {
    position: fixed;
    top: 90px;
    left: 0;
    width: 100%;
    background: white;
    padding: 20px;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .nav-menu.is-open {
    transform: translateX(0);
  }

  .nav-menu ul {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .header-icons {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    padding: 15px;
    justify-content: center;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  }

  .header-icons.is-open {
    transform: translateY(0);
  }

  img {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 30px;
  }

  img {
    width: 50px;
    height: 50px;
  }

  .auth-btn {
    padding: 4px 8px;
    font-size: 0.8rem;
  }
}
</style>