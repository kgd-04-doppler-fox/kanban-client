<template>
  <section id="main">
    <Navbar
      @logout="logout"
      :currentPage="pageName"
    ></Navbar>
    <Homepage
      v-if="pageName == 'home-page'"
      :stages="stages"
      @changePage="changePage"
      @updateForm="updateForm"
      @deleteTask="deleteTask"
      >
    </Homepage>
    <AddTask
      v-else-if="pageName == 'add-task'"
      @addTask="addTask">
    </AddTask>
    <Login
      v-else-if="pageName == 'login'"
      @changePage="changePage('home-page')"
      @registerPage="changePage('register')"
      >
    </Login>
    <Register
      v-else-if="pageName == 'register'"
      @changePage="changePage('login')"
      >
    </Register>
    <EditPage
      v-else-if="pageName == 'edit-page'"
      :taskDataForEdit="taskDataForEdit"
      @editTask="editTask">
    </EditPage>
  </section>
</template>

<script>
import Navbar from './components/navbar'
import Homepage from './views/Homepage'
import AddTask from './views/AddTask'
import Login from './views/Login'
import Register from './views/Register'
import axios from './config/axios'
import EditPage from './views/EditPage'
export default {
  components : {
    name : 'App',
    Homepage,
    AddTask,
    Login,
    Register,
    EditPage,
    Navbar
  },
  methods : {
    changePage(name) {
      this.pageName = name
    },
    addTask(payload) {
        axios({
            url : '/tasks',
            method : 'post',
            headers : {
              access_token : localStorage.getItem('access_token')
            },
            data : {
                title : payload.title,
                category : payload.category
            }
        })
        .then(({data}) => {
            this.changePage('home-page')
            console.log(data, '<<< data fetch');
        })
        .catch(err => {
            console.log(err, 'error fetch');
      })
    },
    updateForm(task) {
      // console.log(task.title, "<<<<<<< task from edit");
      this.changePage('edit-page')
      this.taskDataForEdit = task
    },
    editTask (payload) {
      axios({
        url : `/tasks/${payload.id}`,
        method : 'PUT',
        headers : {
          access_token : localStorage.getItem('access_token')
        },
        data : {
          title : payload.title,
          category : payload.category
        }
      })
      .then(({data}) => {
            this.changePage('home-page')
        })
        .catch(err => {
            console.log(err, 'error fetch');
      })
    },
    deleteTask(payload) {
        axios({
            url : `/tasks/${payload.id}`,
            method : 'delete',
            headers : {
                access_token : localStorage.getItem('access_token')
            }
        })
        .then(task => {
            this.changePage('home-page')
        })
        .catch(err => {
            console.log(err, "<<<<<< failed deleting");
        })
    },
    logout() {
      localStorage.clear()
      this.changePage('login')
    }
    // fetchTasks() {
    //   axios({
    //     url : '/tasks',
    //     method : 'get',
    //     headers : {
    //       access_token : localStorage.getItem('access_token')
    //     }
    //   })
    //   .then(({data}) => {
    //     this.fetchedTasks = data.tasks
    //     console.log(data, '<<< data fetch');
    //   })
    //   .catch(err => {
    //     console.log(err.response, 'error fetch');
    //   })
    // }
  },
  data() {
    return {
      pageName: 'home-page',
      stages: [
        {
          stage: "Back-Log"
        },
        {
          stage: "To-Do"
        },
        {
          stage: "Doing"
        },
        {
          stage: "Done"
        },
      ],
      taskDataForEdit : {}
    }
  },
  created() {
    if(localStorage.getItem('access_token')){
      this.changePage('home-page')
    } else {
      this.changePage('login')
    }
  }
};
</script>

<style scoped>
</style>