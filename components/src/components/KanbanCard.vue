<template>
  <div class="card border-black">
    <p>Title :{{ card.title }}</p>
    <p>Category :{{ card.category }}</p>
    <p>Description : {{ card.description }}</p>
    <p>Due Date: {{ card.due_date }}</p>
    <div class="flex-button">
      <button
        class="flex btn-info"
        href="#"
        data-toggle="modal"
        data-target="#updateTaskModal"
      >
        Update
      </button>
      <button
        class="flex btn-warning"
        v-if="card.status > 1"
        @click="changeStatus(card.id, card.status - 1)"
      >
        Back
      </button>
      <button
        class="flex btn-success"
        v-if="card.status <= 3"
        @click="changeStatus(card.id, card.status + 1)"
      >
        Next
      </button>
      <button class="flex btn-danger" @click="deleteCard(card.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "https://shrouded-falls-16636.herokuapp.com";

export default {
  name: "KanbanCard",
  props: ["card"],
  methods: {
    deleteCard(id) {
      let reConfirm = confirm(`You sure want to destroy it ?`);

      if (reConfirm) {
        axios({
          method: "DELETE",
          url: `${baseUrl}/tasks/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
          .then((_) => {
            this.$emit("fetchData");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    changeStatus(id, statusId) {
      axios({
        method: "PATCH",
        url: `${baseUrl}/tasks/${id}`,
        data: {
          status: statusId,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((_) => {
          this.$emit("fetchData");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    computed: {
      convertDate() {
        return moment(this.card.due_date).format("YYYY-MM-DD");
      },
    },
  },
};
</script>

<style>
</style>