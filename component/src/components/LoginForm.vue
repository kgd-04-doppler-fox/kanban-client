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
        <br>
        <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
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
                password: '',
                clientId: '367296612879-rnq7d81443gd2ip4fqqltttpq32d73rn.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        login() {
            axios({
                url: `http://localhost:3000/login`,//https://hidden-oasis-44746.herokuapp.com =>url heroku
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
        },
        OnGoogleAuthSuccess (idToken) {
            localStorage.setItem('idToken',idToken)
            this.$emit('googleSignIn','home-page')
        },
        OnGoogleAuthFail (error) {
            console.log(error,'token')
        }
    }
}
</script>

<style>
    .google-signin-button {
        color: rgb(212, 8, 8);
        background-color: rgb(0, 255, 213);
        height: 50px;
        font-size: 20px;
        border-radius: 10px;
        padding: 10px 20px 25px 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        position: relative;
        left: 525px;
        top: 100px;
    }
</style>