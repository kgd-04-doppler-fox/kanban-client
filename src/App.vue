<template>
  <div>
      <Navbar :page="currentPage" @logout="changePage('login')" @signin="changePage('login')"></Navbar>
      <Login id="loginPage" v-if="currentPage === 'login'" @changePage="changePage('home')" @registrationPage="changePage('register')" @fetchRead="fetchTask()"></Login>
      <Register v-if="currentPage === 'register'"></Register>

      <h1 v-if="currentPage === 'home'" id="home_title">Task Lists</h1>
      <div><button @click="changePage('create')" class="btn btn-warning btn-sm" id="btn-Add" v-if="currentPage === 'home'">Add Task</button></div>
      <Board v-if="currentPage === 'home'" :tasks="tasks" id="board" @editTask="editData"></Board>
      <AddTask id="create-page" v-if="currentPage === 'create'"  @addDone="changePage('home')" @fetchNewData="fetchTask" ></AddTask>
      <EditPage v-if="currentPage === 'edit'" :editData="editTask" @editSuccess="changePage('home')"></EditPage>

  </div>
</template>

<script>
import axios from 'axios'
import EditPage from './components/EditPage'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Board from './components/Board'
import AddTask from './components/AddTask'

export default {
    name: 'Gate',
    data (){
        return {
            currentPage: 'login',
            tasks: [],
            editTask: {}
        }
    },
    components : {
        Navbar,
        Login,
        Register,
        Board,
        EditPage,
        AddTask
    },
    methods : {
        changePage(page){
            this.currentPage = page
            this.fetchTask()
        },

        fetchTask(){
            axios({
                url: `https://warm-waters-28393.herokuapp.com/tasks`,
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
        },

        editData(data){
            this.editTask = data
            this.currentPage = 'edit'
        },
    },
    created(){
        if(localStorage.getItem('access_token')){
            this.changePage('home')
            this.fetchTask()
        }else {
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

    #addBtn{
        margin-left: auto;
    }

    #home_title{
      text-align: center;
      margin-top: 30px;
      font-family: 'Poppins', sans-serif;
      color: white;
    }

    #btn-Add {
        margin-left: 86%;
        color: white;
        font-family: 'Poppins', sans-serif;

    }
</style>