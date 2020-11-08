<template>
  <div id="app">
    <Signin @page="changePage" @fetchData="fetchData"></Signin>
    <Signup></Signup>
    <Navbar @logoutSuccess="changePage" :page="currentPage"></Navbar>
    <AddTask @fetchData="fetchData"></AddTask>
    <EditTask @fetchData="fetchData"></EditTask>
    <Home v-if="currentPage === 'login'"></Home>
    <div v-else-if="currentPage === 'mainPage'" class="row" >
    <KanbanApp
      v-for="status in status"
      :key="status.id"
      :status="status"
      :card="tasks" 
      @fetchData="fetchData"
    ></KanbanApp>
    </div>
  </div>
</template>

<script>
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import KanbanApp from "./components/KanbanApp";
import axios from "axios";
const baseUrl = "https://shrouded-falls-16636.herokuapp.com";

export default {
  name: "App",
  data() {
    return {
      currentPage: "login",
      user: {
        email: "",
        password: "",
      },
      tasks : [],
      status: [
        {
          id: 1,
          name: "BackLog",
          color: "col border border-secondary bg-secondary",
        },
        {
          id: 2,
          name: "To-Do",
          color: "col border border-warning bg-warning",
        },
        {
          id: 3,
          name: "Doing",
          color: "col border border-info bg-info",
        },
        {
          id: 4,
          name: "Completed",
          color: "col border border-success bg-success",
        },
      ],
    };
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    fetchData() {
      axios({
        method: "GET",
        url: `${baseUrl}/tasks`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.tasks = data.task;
          console.log(this.tasks);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  components: {
    Home,
    Navbar,
    Signin,
    Signup,
    AddTask,
    EditTask,
    KanbanApp,
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.changePage("mainPage");
      this.fetchData();
    } else {this.changePage("login")};
  },
};
</script>

<style>
body {
    background-image: url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&w=1000&q=80");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

.row{
    display: flex;
    flex-flow: row wrap;

/* perfect centering */
    justify-content: center;
    align-items: center;
    
    align-content: center;;
}

.border-black{
    border:1px solid black;
}

.card:hover{
    box-shadow: 10px 10px 5px grey;
}

/* Kanban Title */
.white{
    color: floralwhite;
}
/* Jumbotron home */
.jumbotron{
    position: center;
    position: absolute;
    left: 50%!important;
    z-index: 10;
    text-align: center;
    top: 50%!important;
    transform: translate(-50%, -50%);
    width: fit-content;
    padding: 50px
}

.flex-button{
    align-items: center;
    align-content: stretch;
}
</style>