<template>
  <div class="card-deck border-black">
    <div class="row justify-content-center">
      <div class="col-auto">
        <table class="table">
        <tbody>
            <tr>
              <th>Title</th>
                <td>{{ card.title}}</td>
            </tr>
            <tr>
              <th>Category</th>
                <td>{{ card.category }}</td>
            </tr>
            <tr>
              <th>Description</th>
                <td>{{ card.description }}</td>
            </tr>
            <tr>
              <th>Due Date</th>
                <td>{{ card.due_date.split('T')[0] }}</td>
            </tr>
            <tr>
              <th>Uploaded By</th>
                <td>{{card.User.email}}</td>
            </tr>
            <tr>
              <th>Uploaded At</th>
                <td>{{card.createdAt.split('T')[0]}}</td>
            </tr>
            <tr>
              <th>Organization</th>
                <td>{{card.User.organization}}</td>
            </tr>
        </tbody>
        </table>
      </div>
    </div>
    <td>{{error}}</td>
    <div class="flex-button" >
      <button
        class="flex btn-info"
        href="#"
        data-toggle="modal"
        data-target="#updateTaskModal"
        @click="fetchOneData(card.id)"
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
      <div class="card-footer">
      <small class="text-muted">Last updated {{card.updatedAt.split('T')[0]}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "https://shrouded-falls-16636.herokuapp.com";

export default {
  name: "KanbanCard",
  data() {
    return {
      error: "",
      task: ""
    };
  },
  props: ["card", "task"],
  methods: {
    fetchData() {
      this.$emit("fetchData");
    },
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
    fetchOneData(id) {
      axios({
        method: "GET",
        url: `${baseUrl}/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.task = data;
          console.log(data, `<<<This is from fetchone`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>