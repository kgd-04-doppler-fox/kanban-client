<template>
  <div>
    <Navbar v-if="currentPage === 'main'" @switchPage="changePage"></Navbar>
    <LoginForm
      v-if="currentPage === 'login'"
      @switchPage="changePage"
    ></LoginForm>
    <RegisterForm
      v-if="currentPage === 'register'"
      @switchPage="changePage"
    ></RegisterForm>
    <BoardList
      v-if="currentPage === 'main'"
      @switchPage="changePage"
    ></BoardList>
    <AddForm
      v-if="currentPage === 'add'"
      @switchPage="changePage"
      @refetch="fetchTasks"
    ></AddForm>
    <EditForm
      v-if="currentPage === 'edit'"
      @editTask="editTask"
      @switchPage="changePage"
      @refetch="fetchTasks"
      :task="task"
    ></EditForm>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import BoardList from "./components/BoardList";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";

export default {
  name: "App",
  data() {
    return {
      currentPage: "login",
      loggedUser: "",
      task: {},
    };
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    editTask(data) {
      this.currentPage = "edit";
      this.task = data;
    },
    fetchTasks() {
      axios({
        url: "http://localhost:3000/tasks",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(() => {
          this.currentPage = "main";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    Navbar,
    LoginForm,
    RegisterForm,
    BoardList,
    AddForm,
    EditForm,
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.changePage("main");
      this.loggedUser = localStorage.getItem("email");
    } else {
      this.changePage("login");
    }
  },
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>