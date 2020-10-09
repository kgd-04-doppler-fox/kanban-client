<template>
  <div class="card border-black">
    <p>{{ card.title }}</p>
    <p>{{ card.category }}</p>
    <p>{{ card.description }}</p>
    <p>{{ card}}</p>
    <div class="flex-button">
      <button class="btn-warning" v-if="card.status>1" @click="changeStatus(card.id, card.status-1)">Back</button>
      <button class="btn-success" v-if="card.status<=3" @click="changeStatus(card.id, card.status+1)">Next</button>
      <button class="btn-danger" @click="deleteCard(card.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000";

export default {
  name: "KanbanCard",
  props: ["card"],
  methods: {
    deleteCard(id) {
      axios({
        method: "DELETE",
        url: `${baseUrl}/tasks/${id}`, 
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(_ => {
          this.$emit("fetchData");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeStatus(id, statusId){
      axios({
        method: "PATCH",
        url: `${baseUrl}/tasks/${id}`,
        data: {
          status: statusId
        } ,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(_ => {
          this.$emit("fetchData");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style>
</style>