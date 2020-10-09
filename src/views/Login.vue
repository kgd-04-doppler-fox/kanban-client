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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    components : {
        name : 'Login'
    },
    data() {
        return {
            email : '',
            password : '',
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
        }
    }
}
</script>

<style>

</style>