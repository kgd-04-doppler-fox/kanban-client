<template>
  <div class="card-body border border-4 pt-2 bg-light">
        <p class="card-title font-weight-bold"> {{task.title}}</p>
        <small class="text-muted">author: {{task.User.username}}
        <br>
        <small class="text-muted">email: {{task.User.email}}
        <br>
        <div class="btn btn-group ml-auto">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg" v-if="task.category != 'BackLog'" @click.prevent="back(task.category, task.id)">
                <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="hapusTask">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg" v-if="task.category != 'Done'" @click.prevent="next(task.category, task.id)">
                <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
            </svg>
        </div>                 
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "KanbanCard",
  props: ["task", "categories"],
  methods: {
    hapusTask() {
      const answer = window.confirm("serius mau delete?");
      if (answer === true) {
        axios({
          method: "DELETE",
          url: `https://tranquil-tundra-97414.herokuapp.com/tasks/${this.task.id}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
          .then((response) => {
            this.$emit("fetchTask");
          })
          .catch((err) => {
            const answer = window.confirm("maaf bukan punya anda");
            if (answer === true) {
              this.$emit("fetchTask");
            }
          });
      }
    },
    back(category, id) {
      let destination;
      if (category == "Done") {
        destination = "On Going";
      } else if (category == "On Going") {
        destination = "Todo";
      } else {
        destination = "BackLog";
      }
      axios({
        url: `https://tranquil-tundra-97414.herokuapp.com/tasks/${id}`,
        method: "patch",
        data: {
          category: destination,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((task) => {
          this.$emit("fetchTask");
        })
        .catch((err) => {
          const answer = window.confirm("maaf bukan punya anda");
          if (answer === true) {
            this.$emit("fetchTask");
          }
        });
    },
    next(category, id) {
      let destination;
      if (category == "BackLog") {
        destination = "Todo";
      } else if (category == "Todo") {
        destination = "On Going";
      } else {
        destination = "Done";
      }
      axios({
        url: `https://tranquil-tundra-97414.herokuapp.com/tasks/${id}`,
        method: "PATCH",
        data: {
          category: destination,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((task) => {
          this.$emit("fetchTask");
        })
        .catch((err) => {
          const answer = window.confirm("maaf bukan punya anda");
          if (answer === true) {
            this.$emit("fetchTask");
          }
        });
    },
  },
};
</script>

<style>
</style>