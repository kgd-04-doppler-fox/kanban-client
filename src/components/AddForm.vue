<template>
  <div>
    <div class="login-form">
      <form @submit.prevent="succeedAdding">
        <h2 class="text-center">Add Task</h2>
        <div class="form-group">
          <input
            v-model="task.title"
            type="text"
            class="form-control"
            placeholder="title"
            required="required"
          />
        </div>
        <div class="form-group">
          <input
            v-model="task.description"
            type="text"
            class="form-control"
            placeholder="description"
            required="required"
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Example multiple select</label>
          <select class="form-control" v-model="task.category">
            <option selected disabled>--select category--</option>
            <option value="BackLog">BackLog</option>
            <option value="Todo">Todo</option>
            <option value="On Going">On Going</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary btn-block bg-dark rounded"
          >
            Add Task
          </button>
        </div>
        <div class="clearfix"></div>
        <input
          type="button"
          class="btn btn-info rounded"
          value="back to home"
          @click="kembali"
        />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddForm",
  data() {
    return {
      task: {
        title: "",
        description: "",
        category: "",
      },
    };
  },
  methods: {
    succeedAdding() {
      axios({
        method: "POST",
        url: "http://localhost:3000/tasks",
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: this.task.title,
          description: this.task.description,
          category: this.task.category,
        },
      })
        .then((response) => {
          console.log("success");
          this.kembali()
          this.$emit("succedd")
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    kembali() {
      this.$emit("backtohome", "dashboard");
      this.$emit("fetch")
      
      
    },
  },
};
</script>

<style>
</style>