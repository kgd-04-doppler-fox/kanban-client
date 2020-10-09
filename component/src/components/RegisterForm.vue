<template>
    <section style="min-height: 100vh; background-color: #1F7FE3;">
        <div class="container-fluid">
          <div class="card bg-light">
            <article class="card-body mx-auto" style="width: 50%;">
              <h4 class="card-title mt-3 text-center">Create Account</h4>
              <form @submit.prevent="resgister" id="register">
                <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                  </div>
                  <input v-model="user.email" id="email-reg" name="email_reg" class="form-control" placeholder="Email address" type="email">
                </div>
    
                <div class="form-group input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                  </div>
                  <input v-model="user.password" id="password-reg" name="pass_reg" class="form-control" placeholder="Create password" type="password">
                </div>
    
                <div class="form-group mt-4">
                  <button type="submit" class="btn btn-primary btn-block"> Create Account </button>
                </div>
                <p class="text-center">Have an account? <a @click="toLogin" href="#login" id="login-form">Log In</a> </p>
              </form>
            </article>
          </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegisterForm',
    data () {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
      register () {
          axios({
              method: 'POST',
              url: 'http://localhost:3000/register',
          })
          .then(respone => {
            this.$emit('toPage', 'loginPage')
          })
          .catch(err => {
            console.log(err.respone)
          })
      },
      toLogin () {
        this.$emit('toLogin', 'loginPage')
      }
    }
}
</script>

<style>

</style>