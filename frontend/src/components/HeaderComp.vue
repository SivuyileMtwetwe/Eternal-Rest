<template>

  <header class="header">

    <div class="container">
      <div class="logo">
        <img src="https://images.vexels.com/media/users/3/269843/isolated/preview/8753fcdba7f74cdccd19597669d7c10a-halloween-coffin-icon-with-a-rose.png" alt="">
        6ft Boutique
      </div>
      <nav class="nav-menu">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/caskets">Caskets</router-link></li>
          <li><router-link to="/coffins">Coffins</router-link></li>
          <li><router-link to="/urns">Urns</router-link></li>
          <li><router-link to="/petmemorials">Pet Memorials</router-link></li>
        </ul>
      </nav>
      <div class="header-icons">
        <!-- Cart Icon -->
        <router-link to="/cart"><i class="bi bi-cart-fill"></i></router-link>

        <!-- Profile Icon or Login/Register Buttons -->
        <template v-if="isAuthenticated">
          <!-- Admin Dashboard Link -->
          <router-link v-if="isAdmin" to="/admin/dashboard" class="admin-dashboard-link">
            <i class="bi bi-speedometer2"></i> Admin Dashboard
          </router-link>
          <!-- Profile Icon -->
          <router-link to="/profile"><i class="bi bi-person-circle"></i></router-link>
          <!-- Logout Button -->
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </template>
        <template v-else>
          <!-- Login and Register Buttons -->
          <router-link to="/login" class="auth-btn">Login</router-link>
          <router-link to="/register" class="auth-btn">Register</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin']), // Use Vuex getters
  },
  methods: {
  ...mapActions(['logout']),
  handleLogout() {
    this.logout(); // Call the logout action
    this.$router.push('/login'); // Redirect to the login page
  },
},
};
</script>

<style scoped>
header {
  background-color: #fff;
  color: #222;
  padding: 5px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position:absolute;
  top: 0;
  width: 100%;
  z-index: 1; /* Keep header content above the image */
  overflow: visible; /* Allow image to overflow */
}

img {
  top: 2px; /* Adjust as needed */
  left: 5px; /* Adjust as needed */
  width: 80px; /* Size of the image */
  height: 80px;
  border-radius: 50%;
  background-color: #fff; /* White background */
  padding-right: 3px;
  padding-left: 10px;
  z-index: 2; /* Keep image above content */
  transform: rotate(-15deg)
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1300px;
  padding: 0 5px;
  position: relative; /* Allow positioning of the image */
}

.logo {
  display: flex;
  padding-left: 1px;
  align-items: center;
  font-size: 55px;
  font-family: 'Brush Script MT', cursive;
  color: #222;
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

.header-icons .auth-btn {
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #e3b04b;
  text-decoration: none;
  color: #e3b04b;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.header-icons .auth-btn:hover {
  background-color: #e3b04b;
  color: #fff;
}

.auth-btn {
  padding: 5px 10px;
  border: 1px solid #333;
  border-radius: 4px;
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s, color 0.3s;
}

.auth-btn:hover {
  background-color: #333;
  color: white;
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
  color :rgb(245, 245, 245) !important;
}

/* Media Queries */
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
  .container {
    flex-direction: column;
    padding: 10px;
    width: 100%;
  }

  .logo {
    font-size: 35px;
    margin-bottom: 15px;
  }

  .nav-menu {
    width: 100%;
    margin: 10px 0;
  }

  .nav-menu ul {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .nav-menu ul li {
    width: 100%;
    text-align: center;
  }

  .header-icons {
    width: 100%;
    justify-content: center;
    margin-top: 15px;
    flex-wrap: wrap;
  }

  img {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  header {
    padding: 10px 0;
  }

  .logo {
    font-size: 30px;
  }

  .nav-menu ul li a {
    font-size: 16px;
  }

  .header-icons {
    gap: 10px;
  }

  .header-icons a,
  .header-icons button {
    font-size: 18px;
  }

  .auth-btn {
    padding: 4px 8px;
    font-size: 0.8rem;
  }

  img {
    width: 50px;
    height: 50px;
  }
}

</style>