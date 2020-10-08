<template>
  <div>
      <Navbar :page="currentPage" @logout="login" @signin="login"></Navbar>
      <login v-if="currentPage === 'login'" @changePage="changePage" @registrationPage="register"></login>
      <register v-if="currentPage === 'register'"></register>
      <home v-if="currentPage === 'home'"></home>

  </div>
</template>

<script>
import Navbar from './Navbar'
import login from './Login'
import register from './Register'
import home from './Home'

export default {
    data (){
        return {
            currentPage: 'login',
        }
    },
    components : {
        Navbar,
        login,
        register,
        home,
    },
    methods : {
        changePage(){
            this.currentPage = 'home'
        },

        register(){
            this.currentPage = 'register'
        },

        login(){
            this.currentPage = 'login'
        }
    }
}
</script>

<style>

</style>