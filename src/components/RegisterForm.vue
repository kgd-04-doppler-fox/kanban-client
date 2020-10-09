<template>
  <div class="login-form">
        <form action="/examples/actions/confirmation.php" method="post" @submit.prevent="register"> 
          <h2 class="text-center">Register</h2>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Email" required="required" v-model="user.email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" required="required" v-model="user.password">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block bg-dark rounded">Register</button>
          </div>
          <div class="clearfix">
            <a href="#" class="float-right" @click.prevent="toLogin">Back to Login</a>
          </div>
        </form>
      </div>
</template>

<script>
import axios from 'axios'
export default {
  name:"RegisterForm",
  data(){
    return{
      user:{
        email:'',
        password:''
      }
    }
  },
  methods:{
    register(){
      axios({
        method:"POST",
        url:"http://localhost:3000/register",
        data:{
          email:this.user.email,
          password:this.user.password
        }
      })
      .then(response=>{
        console.log('succeed')
        this.toLogin()
      })
      .catch(err=>{
        console.log(err)
      })
    },
    toLogin(){
      this.$emit("toLogin","loginPage")
    }
  }
}
</script>

<style>

</style>