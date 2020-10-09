<template>
  <div id='app'>
      <Signin @page="changePage"></Signin>
      <Signup ></Signup>
      <Navbar @logoutSuccess="changePage" :page="currentPage"></Navbar>
      <AddTask @fetchData="fetchData"></AddTask>
      <Home v-if="currentPage === 'login'"></Home>
      <KanbanApp v-else-if="currentPage === 'mainPage'" @fetchData="fetchData"></KanbanApp>
  </div>


</template>

<script>
import Home from './components/Home'
import Navbar from './components/Navbar'
import Signin from './components/Signin'
import Signup from './components/Signup'
import AddTask from './components/AddTask'
import KanbanApp from './components/KanbanApp'

export default {
    name: 'App',
    data(){
        return{
            currentPage:'login',
            user: {
                email: "",
                password: ""
            },
            status: [
                {
                    id: 0,
                    name: "BackLog",
                    color: "col col-xl-2 border border-secondary m-2 p-3"
                },
                {
                    id: 1,
                    name: "To-Do",
                    color: "col col-xl-2 border border-warning m-2 p-3"
                },
                {
                    id: 2,
                    name: "Doing",
                    color: "col col-xl-2 border border-danger m-2 p-3"
                },
                {
                    id: 3,
                    name: "Completed",
                    color: "col col-xl-2 border border-success m-2 p-3"
                }
            ]
        }
    },
    methods:{
        changePage(page){
            this.currentPage= page
        },
        fetchData(){
            axios({
                method: 'GET',
                url: `${baseUrl}/tasks`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data})=>{
                console.log(data)
                this.tasks = data.task
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    components:{
        Home,
        Navbar,
        Signin,
        Signup,
        AddTask,
        KanbanApp
    },
    created(){
        if(localStorage.getItem('access_token')){
            this.changePage('mainPage')
        }else(
            this.changePage('login')
        )
    }
}
</script>

<style>

</style>