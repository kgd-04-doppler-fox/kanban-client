<template>
   <div class="shadow-lg p-3 mb-5 bg-white rounded" style="width: 250px; margin:auto; margin-top: 60px;" id="start-page">
        <h1>Login</h1>
        <p v-bind:style="{ color: errorLogin }">email/password is wrong</p>
        <form @submit.prevent="login">
            <label for="email" >Email</label>
            <input class="form-control form-control-sm form-control-block" type="email" v-model="email_login" @click="resetError">
            <label for="password" class="mt-3">Password</label>
            <input class="form-control form-control-sm form-control-block" type="password" v-model="password_login" @click="resetError">
            <button class="btn btn-primary btn-sm btn-block mt-3" >Login</button>
        </form>
        <hr>
        <p style="font-size:small; text-align: center;">Don't have an account? <a href="#" @click="signup">Sign up</a> now</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: `Login`,
    data(){
        return {
            email_login: '',
            password_login: '',
            errorLogin: 'transparent',
        }
    },
    methods: {
        login(){
            axios({
                url: `http://localhost:3000/login`,
                method: 'post',
                data: {
                    email: this.email_login,
                    password: this.password_login
                }
            })
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token)
                this.$emit ('changePage', 'homePage')
                this.$emit ('fetchRead', 'read')
            })
            .catch(err => {
                this.errorLogin = 'red'
            })
            this.email_login = ''
            this.password_login = ''
        },

        resetError(){
            this.errorLogin = 'transparent'
        },

        signup(){
            this.$emit('registrationPage', 'register')
        }
    }

}
</script>

<style>

</style>