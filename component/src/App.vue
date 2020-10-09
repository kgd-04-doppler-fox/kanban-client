<template>
  <div>
      <LoginForm v-if="currentPage==='login-page'" @changePage="changePage" @toRegister="changePage" @googleSignIn="changePage"></LoginForm>
      <RegisterForm v-else-if="currentPage==='register-page'" @successRegister="changePage" @cancelRegister="changePage"></RegisterForm>
      <HomePage v-else-if="currentPage==='home-page'" @logoutSuccess="changePage" @toNewTask="changePage"></HomePage>
      <NewTask v-else @addNew="changePage" @cancelCreate="changePage"></NewTask>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import NewTask from './components/NewTask'
import RegisterForm from './components/RegisterForm'

export default {
    name: 'App',
    data() {
        return {
        currentPage:'login-page',
        };
    },
    methods: {
        changePage (page){
            this.currentPage = page
        }
    },
    components: {
        LoginForm,
        HomePage,
        NewTask,
        RegisterForm
    },
    created() {
        if(localStorage.access_token || idToken && !localStorage.register_token && !localStorage.add_token){
            this.changePage('home-page')
            // this.fetchTask()
        }else if (!localStorage.access_token && localStorage.register_token && !localStorage.add_token){
            this.changePage('register-page')
        }else if (localStorage.access_token || idToken && !localStorage.register_token && localStorage.add_token){
            this.changePage('add-page')
        }else {
            this.changePage('login-page')
        }
    }
}
</script>

<style>

</style>