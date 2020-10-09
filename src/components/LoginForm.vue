<template>
    <div class="row mt-5">
        <div class="col-6 mx-auto">
            <h3 class="h3">Login</h3>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form><br>
            <div class="btn-group">
                <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
                <button class="btn btn-link" @click="toRegister">Register</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'

export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: '',
            clientId: '878537891560-p61p1ef06m8u0slvapa7757e8qdpf8tb.apps.googleusercontent.com'
        }     
    },

    methods: {
        login(){
            axios({
                url: "/login",
                method: "post",
                data: {
                email: this.email,
                password: this.password
                }
            })
            .then(user=>{
                localStorage.setItem("token", user.data.token)
                localStorage.setItem("email", user.data.email)
                this.$emit('changePage', 'main-page')
            })
            .catch(err => {
                console.log(err)
            })
        },
        toRegister(){
            this.$emit('changePage', 'register-page')
        },

        OnGoogleAuthSuccess (idToken) {
          
            axios({
                url: `/googleSignIn`,
                method: "post",
                headers: {
                    id_token: idToken
                }
            })
            .then(user => {
                localStorage.setItem("token", user.data.token)
                localStorage.setItem('email', user.data.email)
                this.$emit('changePage', 'main-page')
            })
            .catch(err =>{
                console.log(err)
            })

        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    }
}
</script>

<style>
    .google-signin-button {
  color: white;
  background-color: darkblue;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>