<template>
  <div class="container-fluid" id="editPage" style="min-height: 100vh">
    <!-- title with image starts -->
    <div class="row my-3">
      <div class="col-12 text-center" id="add-page">
        <h2 class="py-3">Edit task</h2>
        <img
          class="reg-img pb-3"
          src="../assets/undraw_User_flow_re_bvfx.svg"
          alt="Manage tasks"
        />
        <!-- title with image ends  -->

        <!-- edit form starts -->
        <div class="col-md-6 mx-auto">
          <div class="alert alert-warning" role="alert" :style="{ display }">
            Title and category cannot be empty
          </div>

          <form id="edit-task" @submit.prevent="edit">
            <div class="form-group">
              <label for="title-edit">Title</label>
              <input
                type="text"
                class="form-control"
                id="title-edit"
                placeholder="Enter title"
                v-model="selected.title"
                value="task.title"
              />
            </div>
            <div class="form-group">
              <label for="category-edit">Select category</label>
              <select
                class="form-control"
                id="category-edit"
                name="category"
                v-model="selected.category"
                value="task.category"
              >
                <option disabled selected>-- Please select --</option>
                <option value="backlog">Backlog</option>
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div class="form-group">
              <label for="description-edit">Description</label>
              <textarea
                v-model="selected.description"
                class="form-control"
                id="description-edit"
                rows="3"
                placeholder="Enter description"
                value="task.description"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary" @click="isValid">
              Edit task
            </button>
          </form>
          <br />
          <a href="#kanban-board" @click="cancel">Cancel</a>
        </div>
        <!-- edit form ends -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditForm",
  props: ["task"],
  data() {
    return {
      selected: {
        title: "",
        category: "",
        description: "",
      },
      formerData: localStorage.getItem("taskId"),
      display: "none",
    };
  },
  methods: {
    cancel() {
      this.$emit("switchPage", "main");
      this.$emit("refetch");
      localStorage.removeItem("taskId");
    },
    edit() {
      axios({
        method: "PUT",
        url: `http://localhost:3000/tasks/${this.formerData}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: this.selected.title,
          category: this.selected.category,
          description: this.selected.description,
        },
      })
        .then(() => {
          this.$emit("switchPage", "main");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isValid() {
      if (!this.selected.title || !this.selected.category) {
        this.display = "inline-block";
      }
    },
  },
};
</script>

<style>
</style>