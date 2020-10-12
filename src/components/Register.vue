<template>
  <div id="start-page" class="shadow-lg p-3 mb-5 bg-white rounded" style="width: 250px; margin:auto; margin-top: 40px;" >  
        <h1>Registration</h1>
        <p v-bind:style="{ color: color }">{{msg_inform}}</p>
        <form @submit.prevent="registration">
            <label for="name" required>First name</label>
            <input class="form-control form-control-sm" type="text" v-model="first_name">
            <label for="last_name" class="mt-3">Last name</label>
            <input class="form-control form-control-sm" type="text" v-model="last_name">
            <label for="email-reg" class="mt-3">Email</label>
            <input class="form-control form-control-sm" type="email" v-model="email_reg">
            <label for="password-reg" class="mt-3">password</label>
            <input class="form-control form-control-sm" type="password" v-model="password_reg"> 
            <button class="btn btn-primary btn-sm mt-3">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Register',
    data(){
        return {
            first_name : '',
            last_name: '',
            email_reg: '',
            password_reg: '',
            msg_inform: 'Registration Success',
            color: 'transparent'
        }
    },
    methods: {
        registration(){
            axios({
                url: 'http://localhost:3000/register',
                method: 'post',
                data: {
                    name: `${this.first_name} ${this.last_name}`,
                    email: this.email_reg,
                    password: this.password_reg
                }
            })
            .then(response => {
                this.color = 'green'
            })
            .catch(err => {
                this.msg_inform = err
                this.color = 'red'
            })
            this.first_name = '',
            this.last_name = '',
            this.email_reg = '',
            this.password_reg = ''

        },
    
      
    },
    computed: {
        fullName (){
            return `${this.first_name} ${this.last_name}`
        }
    }

}
</script>

<style>

</style>