<template>
  <div
    class="modal fade"
    id="updateTaskModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
  {{task}}
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-body" id="exampleModalLabel">
            Edit Task
          </h5>
          <button
            type="button"
            class="close"
            id="closeCreate"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <form id="createForm" @submit.prevent="signup">
              <div class="form-group">
                <label class="text-body">Title:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newTask.title"
                  placeholder="Ex: Migration Database"
                />
              </div>

              <div class="form-group">
                <label class="text-body">Description:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newTask.description"
                  placeholder="Ex: Ruri, Finish Prototype UI"
                />
              </div>
              <div class="form-group">
                <label class="text-body">Category:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newTask.category"
                  placeholder="FrontEnd, BackEnd, DevOps"
                />
              </div>
              <div class="form-group">
                <label class="text-body">Status:</label>
                <select class="custom-select" v-model="newTask.status">
                  <option value="1">Backlog</option>
                  <option value="2">Todo</option>
                  <option value="3">Doing</option>
                  <option value="4">Done</option>
                </select>
              </div>
              <div class="form-group">
                <div id="alertDate"></div>
                <label class="text-body">Due Date:</label><br />
                <input
                  type="date"
                  v-model="newTask.due_date"
                  min="new Date().getUTCDate()"
                />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="myBtn">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "https://shrouded-falls-16636.herokuapp.com";

export default {
  name: "EditTask",
  props: ["task"],
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        category: "",
        status: "",
        due_date: "",
      },
    };
  },
  methods: {
    autoClose($event) {
      const elem = this.$refs.myBtn;
      elem.click();
    },
    updateTask(id) {
      axios({
        method: "PUT",
        url: `${baseUrl}/tasks/${id}`,
        data: {
          title: this.newTask.title,
          description: this.newTask.description,
          category: this.newTask.category,
          status: this.newTask.status,
          due_date: this.newTask.due_date,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.autoClose()
          this.$emit("fetchData");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style>
</style>