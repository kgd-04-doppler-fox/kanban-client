<template>
    <section style="min-height: 100vh; background-color: #1F7FE3;">
        <div class="container-fluid">
          <div class="card bg-light">
            <article class="card-body mx-auto" style="width: 50%;">
              <h4 class="card-title mt-3 mb-4 text-center">Login</h4>

                <form @submit.prevent="login">
                    <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                    </div>
                    <input v-model="user.email" name="email_log" class="form-control" placeholder="Email address" type="email">
                    </div>
        
                    <div class="form-group input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                    </div>
                    <input v-model="user.password" class="form-control" name="pass_log" placeholder="Enter password" type="password">
                    </div>
        
                    <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block"> Login </button>
                    </div>

                    <div>
                        <b>Or, use another account:</b>
                        <div class="g-signin2 mt-2" data-onsuccess="onSignIn"></div>
                    </div>

                    <div class="d-flex justify-content-center links mt-3">
                        Don't have an account? <a @click="toRegister" href="#" id="signup"> Sign Up</a>
                    </div>
                </form>
            </article>
          </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginForm',
    data () {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login () {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then(respone => {
                localStorage.setItem('access_token', respone.data.access_token)
                this.$emit('toPage', 'mainPage')
            })
            .catch(err => {
                console.log(err.respone)
            })
        },
        toRegister () {
            this.$emit('toRegister', 'registerPage')
        }
    }
}
</script>

<style>

</style>