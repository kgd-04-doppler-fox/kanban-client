<template>
  <div>
      <Navbar v-if="pageName == 'main-page'" @changePage="showPage"></Navbar>
      <AddTask v-if="pageName == 'add-task'" @changePage="showPage"></AddTask>
      <LoginForm v-if="pageName == 'login-page'" @changePage="showPage"></LoginForm>
      <BoardList 
        v-if="pageName == 'main-page'"
        :categories="categories"
        @changePage="showPage"
        @toEditTask="toEditTask"
      ></BoardList>
      <RegisterForm v-if="pageName== 'register-page' "
      @changePage="showPage"
      ></RegisterForm>
      <EditTask 
        v-if="pageName == 'edit-page' "
        :editedTask="editedTask"
        @changePage="showPage"
      ></EditTask>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import BoardList from './components/BoardList'
import RegisterForm from './components/RegisterForm'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'

export default {
    name: 'App',
    data(){
        return {
            pageName:'login-page',
            categories: [
                {
                    category: 'Backlog'
                },
                {
                    category: 'Todo'
                },
                {
                    category: 'Doing'
                },
                {
                    category: 'Done'
                },

            ],
            editedTask: ''
        }
    },

    methods: {
        showPage(name){
            
            this.pageName = name
        },
        toEditTask(task){
            this.editedTask = task
            this.pageName = 'edit-page'
        }
    },

    components: {
        Navbar,
        LoginForm,
        BoardList,
        RegisterForm,
        AddTask,
        EditTask
    },

    created(){
        if (localStorage.getItem("token")){
            this.showPage('main-page')
        }
    }
}
</script>

<style>

</style>