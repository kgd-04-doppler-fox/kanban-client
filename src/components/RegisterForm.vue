<template>
  <div id="register">
        <form @submit.prevent="register" class="login-form">
            <label class="label">Email</label>
            <br>
            <input v-model="user.email" class="input" type="email" placeholder="your email">
            <br>
            <br>
            <label class="label">Password</label>
            <br>
            <input v-model="user.password" class="input" type="password" placeholder="your password">
            <br>
            <input class="button" type="submit" value="SignUp"> <button @click.prevent="to_login" class="button2">Cancel</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
name: 'RegisterForm',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        register() {
            axios({
                url: `http://localhost:3000/register`,//https://hidden-oasis-44746.herokuapp.com =>url heroku
                method: 'post',
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then(({data}) => {
                localStorage.removeItem('register_token')
                this.$emit('successRegister','login-page')
            })
            .catch (err => {
                console.log(err)
            })
        },
        to_login() {
            localStorage.removeItem('register_token')
            this.$emit('cancelRegister','login-page')
        }
    }
}
</script>

<style>

</style>