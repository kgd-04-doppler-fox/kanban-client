<template>
  <div class="container-fluid" id="addPage" style="min-height: 100vh">
    <!-- title with image starts -->
    <div class="row my-3">
      <div class="col-12 text-center" id="add-page">
        <h2 class="py-3">Add new task</h2>
        <img
          class="reg-img pb-3"
          src="../assets/undraw_Done_checking_re_6vyx.svg"
          alt="Manage tasks"
        />
        <!-- title with image ends  -->

        <!-- Add form starts -->
        <div class="col-md-6 mx-auto">
          <div class="alert alert-warning" role="alert" :style="{ display }">
            Title and category cannot be empty
          </div>

          <form id="add-task" @submit.prevent="addTask">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                v-model="add.title"
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter title"
              />
            </div>
            <div class="form-group">
              <label for="category">Select category</label>
              <select
                v-model="add.category"
                class="form-control"
                id="category"
                name="category"
              >
                <option disabled selected>-- Please select --</option>
                <option value="backlog">Backlog</option>
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                v-model="add.description"
                class="form-control"
                id="description"
                rows="3"
                placeholder="Enter description"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary" @click="isValid">
              Add task
            </button>
          </form>
          <br />
          <a href="#kanban-board" @click="cancel">Cancel</a>
        </div>
        <!-- Add form ends -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddForm",
  data() {
    return {
      add: {
        title: "",
        category: "",
        description: "",
      },
      display: "none",
    };
  },
  methods: {
    cancel() {
      this.$emit("switchPage", "main");
    },
    addTask() {
      axios({
        url: "https://warm-stream-58190.herokuapp.com/tasks",
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: this.add.title,
          description: this.add.description,
          category: this.add.category,
        },
      })
        .then(({ data }) => {
          this.$emit("switchPage", "main");
          this.$emit("refetch");
          this.fetchTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isValid() {
      if (!this.add.title || !this.add.category) {
        this.display = "inline-block";
      }
    },
  },
};
</script>

<style>
</style>