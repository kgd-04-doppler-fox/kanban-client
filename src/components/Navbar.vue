<template>
  <nav class="navbar navbar-light justify-content-between">
    <div>
      <a class="navbar-brand text-dark">Kanban</a>
    </div>
    <div>
      <a>{{ loggedUser }}</a>
      <button id="btn-addtask" class="btn btn-add" @click="addTask">
        Add Task
      </button>
      <button id="btn-logout" class="btn btn-info" @click="logout">
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("switchPage", "login");
    },
    addTask() {
      this.$emit("switchPage", "add");
    },
  },
  data() {
    return {
      loggedUser: localStorage.getItem("email"),
    };
  },
};
</script>

<style scoped>
.navbar {
  background-image: linear-gradient(to bottom right, #fbf7ff, #fefedf);
}
</style>