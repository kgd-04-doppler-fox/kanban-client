<template>
  <div>
    <Navbar
      v-if="currentPage != 'loginPage' && currentPage != 'registerPage'"
      @changePage="changePage"
      @logout="changePage"
    ></Navbar>
    <RegisterForm
      v-if="currentPage == 'registerPage'"
      @backtologin="changePage"
      @toLogin="changePage"
    ></RegisterForm>
    <LoginForm
      v-if="currentPage == 'loginPage'"
      @loginSucced="changePage"
      @changePage="changePage"
      @afterLogin="fetchTask"
    ></LoginForm>
    <AddForm
      v-else-if="currentPage == 'addPage'"
      @succeed="homeLoading"
      @fetch="fetchTask"
      @backtohome="changePage"
    ></AddForm>
    <MainPage
      v-else-if="currentPage == 'dashboard'"
      :tasks="tasks"
      :categories="categories"
      @changePage="changePage"
    ></MainPage>
  </div>
</template>

<script>
import axios from "axios";
import AddForm from "./components/AddForm";
import MainPage from "./components/MainPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./components/Navbar";
export default {
  name: "app",
  data() {
    return {
      currentPage: "loginPage",
      tasks: [],
      categories: ["BackLog", "Todo", "On Going", "Done"],
    };
  },
  components: {
    Navbar,
    MainPage,
    LoginForm,
    RegisterForm,
    AddForm,
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    homeLoading(){
      this.checkAuth()
    },
    fetchTask() {
      axios({
        url: `http://localhost:3000/tasks`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          console.log(response);
          this.tasks = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkAuth() {
      if (!localStorage.access_token) {
        this.currentPage = "login-page";
      } else {
        this.fetchTask();
        this.currentPage = "main-page";
      }
    },
  },
  created() {
    if (!localStorage.getItem("access_token")) {
      this.currentPage = "loginPage";
    } else {
      this.currentPage = "dashboard";
      this.fetchTask();
      
    }
  },
};
</script>

<style>
</style>