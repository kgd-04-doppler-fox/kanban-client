<template>
  <div class="content">
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <h3 class="text-white text-center">Kanban</h3>
      <button
        class="btn btn-outline-success ml-auto bg-dark my-2 my-sm-0 text-white"
        @click="addTask"
      >
        Add Task
      </button>

      <button
        class="btn btn-outline-success ml-auto bg-dark my-2 my-sm-0 text-white"
        @click="logout"
      >
        Logout
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name:"Navbar",
  methods:{
    logout(){
      localStorage.clear()
      this.$emit("logout","loginPage")
    },
    addTask(){
      this.$emit("changePage", "addPage")
    }
  }
};
</script>

<style>
</style>