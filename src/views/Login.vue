<template>
    <div id="login-section">
        <h3 class="text-center text-white pt-2">Login form</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form @submit.prevent="login" class="form">
                            <h3 class="text-center text-info">Login</h3>
                            <div class="form-group">
                                <label for="Email" class="text-info">Email:</label><br>
                                <input v-model="email" type="email" name="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br>
                                <input v-model="password" type="password" name="password" class="form-control form-control">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">Submit</button>
                                <!-- <input type="submit" name="submit" class="btn btn-info btn-md" value="submit"> -->
                            </div>
                            <div id="register-link" class="text-right">
                                <a href="#" @click="register" class="text-info">Register here</a>
                            </div>
                            <div>
                                <p>or sign in with google</p>
                                <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
import GoogleLogin from 'vue-google-login';

export default {
    components : {
        name : 'Login',
        GoogleLogin
    },
    data() {
        return {
            email : '',
            password : '',
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
    methods : {
        login() {
            axios({
                url : `/login`,
                method : 'post',
                data : {
                    email : this.email,
                    password : this.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('access_token', data.access_token)
                this.$emit('changePage', 'home-page')
                console.log(data.access_token);
            })
            .catch(err => {
                console.log(err);
            })
        },
        register() {
            this.$emit('registerPage', 'register')
        },
        onSuccess(googleUser) {
            console.log(googleUser); 
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
            var id_token = googleUser.getAuthResponse().id_token;
            axios({
                url : `/googleSignIn`,
                method : 'post',
                data : {
                    access_token: id_token
                }
            })
            .then(({data}) => {
                localStorage.setItem('access_token', data.access_token)
                this.$emit('changePage', 'home-page')
                console.log(data.access_token);
            })
            .catch(err => {
                console.log(err);
            })
        },
        onFailure(){
            console.log(`error`)
        }
    }
}
</script>

<style>

</style>