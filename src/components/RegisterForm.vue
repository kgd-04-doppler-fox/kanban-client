<template>
  <div class="row mt-5">
        <div class="col-6 mx-auto">
            <h3 class="h3">Register</h3>
            <form @submit.prevent="register">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <button class="btn btn-link" @click="toLogin">Login</button>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'RegisterForm',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        toLogin(){
            this.$emit('changePage', 'login-page')
        },

        register(){
            axios({
                url: '/register',
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                },
            })
            .then(user => {
                this.email = ''
                this.password = ''
                this.toLogin()
            })
            .catch(err => {
                console.log(err)
            })
        }

    }

}
</script>

<style>

</style>