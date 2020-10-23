<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col form-inline">
        <form @submit.prevent="addTask">
          <input v-model="title" type="text" placeholder="add task.." />
          <button
            variant="primary"
            class="btn btn-outline-dark ml-3"
          >
            Add
          </button>
        </form>
      </div>
    </div>
    <div class="row mt-5">
      <KanbanBoard
        v-for="category in categories"
        :key="category"
        :tasks="tasks"
        :categoryTitle="category"
        @fetchTask="fetchTask"
      ></KanbanBoard>
    </div>
  </div>
</template>

<script>
import KanbanBoard from "./KanbanBoard";
import axios from 'axios'
export default {
  name: "MainPage",
  data () {
    return {
      title: ''
    }
  },
  props: ["tasks", "categories"],
  components: {
    KanbanBoard,
  },
  methods: {
    addTask() {
      axios({
        url: 'https://tranquil-tundra-97414.herokuapp.com/tasks',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: this.title,
          category: "BackLog"
        }
      })
      .then( (data) =>{
        console.log('SUCCESS')
        this.$emit('fetchTask')
      })
      .catch(err =>{
        console.log(err)
      })
    },
    fetchTask() {
      this.$emit('fetchTask')
    }
  }
};
</script>

<style>
</style>