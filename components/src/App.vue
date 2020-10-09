<template>
  <div id="app">
    <Signin @page="changePage"></Signin>
    <Signup></Signup>
    <Navbar @logoutSuccess="changePage" :page="currentPage"></Navbar>
    <AddTask @fetchData="fetchData"></AddTask>
    <Home v-if="currentPage === 'login'"></Home>
    <div v-else-if="currentPage === 'mainPage'">

    <KanbanApp
      v-for="status in status"
      :key="status.id"
      :status="status"
      :card="tasks"
      class="flex row" 
      @card="fetchData"
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
import KanbanApp from "./components/KanbanApp";
import axios from "axios";
const baseUrl = "http://localhost:3000";

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
    },
  },
  components: {
    Home,
    Navbar,
    Signin,
    Signup,
    AddTask,
    KanbanApp,
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.changePage("mainPage");
      this.fetchData();
    } else this.changePage("login");
  },
};
</script>

<style>
</style>