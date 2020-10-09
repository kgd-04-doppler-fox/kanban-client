<template>
  <div>
      <Navbar :page="currentPage" @logout="changePage('login')" @signin="changePage('login')"></Navbar>
      <Login v-if="currentPage === 'login'" @changePage="changePage('home')" @registrationPage="changePage('register')" @fetchRead="fetchTask()"></Login>
      <Register v-if="currentPage === 'register'"></Register>
      <h1 v-if="currentPage === 'home'" id="home_title">Task Lists</h1>
      <Board v-if="currentPage === 'home'" :tasks="tasks" id="board"></Board>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar'
import Login from './Login'
import Register from './Register'
import Board from './Board'

export default {
    data (){
        return {
            currentPage: 'login',
            tasks: [],
        }
    },
    components : {
        Navbar,
        Login,
        Register,
        Board
    },
    methods : {
        changePage(page){
            this.currentPage = page
        },

        fetchTask(){
            axios({
                url: `http://localhost:3000/tasks`,
                method: `get`,
                headers: {
                    access_token : localStorage.getItem('access_token')
                }
            })
            .then(response => {
                this.tasks = response.data
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        if(localStorage.getItem('access_token')){
            this.changePage('home')
            this.fetchTask()
        }
        else {
            this.changePage('login')
        }
    }
}
</script>

<style scope>
    #board{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin-top: 20px;
    

  }

  #home_title{
      text-align: center;
      margin-top: 30px;
      font-family: 'Poppins', sans-serif;
  }
</style>