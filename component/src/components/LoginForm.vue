<template>
  <div id="login">
        <form @submit.prevent="login" class="login-form">
            <label class="label">Email</label>
            <br>
            <input v-model="user.email" class="input" type="email" placeholder="example@mail.com">
            <br>
            <br>
            <label class="label">Password</label>
            <br>
            <input v-model="user.password" class="input" type="password">
            <br>
            <input class="button" type="submit" value="Sign In">
            <br>
            <a class="to-register">Didnt have an account ?</a>  <a @click.prevent="to_register" class="to-register" href="#">Sign Up</a>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginForm',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            axios({
                url: `http://localhost:3000/login`,
                method: 'post',
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then(res => {
                localStorage.setItem('access_token',res.data.access_token)
                this.$emit('changePage','home-page')
            })
            .catch (err => {
                console.log(err.res)
            })
        },
        to_register() {
            localStorage.setItem('register_token','register')
            this.$emit('toRegister','register-page')
        }
    }
}
</script>

<style>

</style>