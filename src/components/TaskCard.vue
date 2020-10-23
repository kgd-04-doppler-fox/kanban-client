<template>
  <div class="card my-3" style="width: 100%">
    <div class="card-body">
      <h5 class="card-title">{{ task.title }}</h5>
      <p class="card-text">{{ task.description }}</p>
      <p class="card-text">
        <small class="text-muted">{{ loggedUser }}</small> <br />
        <small class="text-muted">{{ task.createdAt.split("T")[0] }}</small>
      </p>
      <div class="options">
        <button class="btn" @click="edit">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="btn" @click="deleteTask">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TaskCard",
  props: ["task"],
  data() {
    return {
      loggedUser: localStorage.getItem("email"),
    };
  },
  methods: {
    edit(task) {
      this.$emit("editTask", this.task);
      this.$emit("switchPage", "edit");
      localStorage.setItem("task", JSON.stringify(this.task));
    },
    deleteTask() {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/tasks/${this.task.id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(() => {
          this.$emit("refetch");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.card {
  width: 15rem;
}
</style>