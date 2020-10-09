<template>
    <div id="register">
        <h3 class="text-center text-white pt-2">Register form</h3>
        <div class="container">
            <div id="register-row" class="row justify-content-center align-items-center">
                <div id="register-column" class="col-md-6">
                    <div id="register-box" class="col-md-12">
                        <form @submit.prevent="register" id="register-form" class="form" action="" method="post">
                            <h3 class="text-center text-info">Register</h3>
                            <div class="form-group">
                                <label for="Email" class="text-info">Email:</label><br>
                                <input v-model="email" type="text" name="email" id="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br>
                                <input v-model="password" type="password" name="password" id="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="submit">
                            </div>
                            <div id="login-link" class="text-right">
                                <a href="#" @click.prevent="login" class="text-info">Already have an Account? Login here</a>
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
        name : 'Register'
    },
    data() {
        return {
            email : '',
            password : '',
        }
    },
    methods : {
        register() {
            axios({
                url : `/register`,
                method : 'post',
                data : {
                    email : this.email,
                    password : this.password
                }
            })
            .then(({data}) => {
                console.log('ini login');
                this.$emit('changePage', 'login')
            })
            .catch(err => {
                console.log(err);
            })
        },
        login() {
            this.$emit('changePage', 'login')
        }
    }

}
</script>

<style>

</style>