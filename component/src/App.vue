<template>
  <div>
      <Navbar @logoutSuccess="changePage" :page="currentPage"></Navbar>
      <LoginForm v-if="currentPage === 'loginPage'" @toPage="changePage"></LoginForm>
      <RegisterForm v-else-if="currentPage === 'registerPage'" @toPage="changePage"></RegisterForm>
      <MainPage v-else-if="currentPage === 'mainPage'"></MainPage>

  </div>
</template>

<script>
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import RegisterForm from './components/RegisterForm'

export default {
    name: 'App',
    data () {
        return {
            currentPage: 'loginPage'
        }
    },
    methods: {
        changePage (page) {
            this.currentPage = page
        },
    },
    components: {
        Navbar,
        LoginForm,
        MainPage,
        RegisterForm
    },
    created () {
        if (localStorage.getItem('access_token')) {
            this.changePage('mainPage')
        } else {
            this.changePage('loginPage')
        }
    }
}
</script>

<style>

</style>