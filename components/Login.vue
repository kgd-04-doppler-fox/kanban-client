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
        <GoogleLogin id="google_btn" :params="params" :onSuccess="onSuccess" :onFailure="onFailure"><img src="https://img-authors.flaticon.com/google.jpg" alt=""></GoogleLogin>
        <p style="font-size:small; text-align: center;">Don't have an account? <a href="#" @click="signup">Sign up</a> now</p>
    </div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login'

export default {
    name: `Login`,
    props: [],
    data(){
        return {
            email_login: '',
            password_login: '',
            errorLogin: 'transparent',
            params: {
                client_id: "223469474641-suck9rvpamc0q98brh97ng0nr6li0631.apps.googleusercontent.com"
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    components: {
        GoogleLogin
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
        },

        onSuccess(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            axios({
                url: `http://localhost:3000/googleSignIn`,
                method: 'post',
                data: {
                    access_token: id_token
                }
            })
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token)
                this.$emit ('changePage', 'homePage')
            })
            .catch(err => {
                console.log(err)
            })
        },

        onFailure(){
            console.log(`error`)
        }
    }

}
</script>

<style scope>
    #google_btn{
        background: white;
        width: 215px;
        border-radius: 5px;
        border: solid gainsboro 1px;
        margin-bottom: 10px;
        
    }

    img{
        width: 30px;
    }
</style>