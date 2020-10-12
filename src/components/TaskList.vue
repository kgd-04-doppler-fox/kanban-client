<template>
  <div class="row m-0" style="width: 80rem">
    <!-- backlog category  -->
    <div class="col-lg-3 col-md-6 col-sm-12 pb-3">
      <!-- backlog header  -->
      <div class="card-board-header py-2 rounded-top d-flex">
        <h4 class="mx-3 my-2">Backlog</h4>
      </div>
      <!-- backlog header ends -->
      <!-- backlog content  -->
      <div
        class="card-board-content py-1 px-3 overflow-auto"
        style="background-color: #f8f9fc; max-height: 80vh"
      >
        <!-- single card -->
        <TaskCard
          v-for="task in taskBacklog"
          :key="task.id"
          :task="task"
          @refetch="fetchTasks"
          @editTask="taskEdited"
          @switchPage="changePage"
        ></TaskCard>
        <!-- card ends  -->
      </div>
      <!-- backlog content ends  -->
    </div>
    <!-- backlog category ends -->

    <!-- Todo category  -->
    <div class="col-lg-3 col-md-6 col-sm-12 pb-3">
      <!-- Todo header  -->
      <div class="card-board-header py-2 rounded-top d-flex">
        <h4 class="mx-3 my-2">To-do</h4>
      </div>
      <!-- Todo header ends -->
      <!-- Todo content  -->
      <div
        class="card-board-content py-1 px-3 overflow-auto"
        style="background-color: #f8f9fc; max-height: 80vh"
      >
        <!-- single card -->
        <TaskCard
          v-for="task in taskTodo"
          :key="task.id"
          :task="task"
          @refetch="fetchTasks"
          @editTask="taskEdited"
          @switchPage="changePage"
        ></TaskCard>
        <!-- card ends  -->
      </div>
      <!-- Todo content ends  -->
    </div>
    <!-- Todo category ends -->

    <!-- Doing category  -->
    <div class="col-lg-3 col-md-6 col-sm-12 pb-3">
      <!-- Doing header  -->
      <div class="card-board-header py-2 rounded-top d-flex">
        <h4 class="mx-3 my-2">Doing</h4>
      </div>
      <!-- Doing header ends -->
      <!-- Doing content  -->
      <div
        class="card-board-content py-1 px-3 overflow-auto"
        style="background-color: #f8f9fc; max-height: 80vh"
      >
        <!-- single card -->
        <TaskCard
          v-for="task in taskDoing"
          :key="task.id"
          :task="task"
          @refetch="fetchTasks"
          @editTask="taskEdited"
          @switchPage="changePage"
        ></TaskCard>
        <!-- card ends  -->
      </div>
      <!-- Doing content ends  -->
    </div>
    <!-- Doing category ends -->

    <!-- Done category  -->
    <div class="col-lg-3 col-md-6 col-sm-12 pb-3">
      <!-- Done header  -->
      <div class="card-board-header py-2 rounded-top d-flex">
        <h4 class="mx-3 my-2">Done</h4>
      </div>
      <!-- Done header ends -->
      <!-- Done content  -->
      <div
        class="card-board-content py-1 px-3 overflow-auto"
        style="background-color: #f8f9fc; max-height: 80vh"
      >
        <!-- single card -->
        <TaskCard
          v-for="task in taskDone"
          :key="task.id"
          :task="task"
          @refetch="fetchTasks"
          @editTask="taskEdited"
          @switchPage="changePage"
        ></TaskCard>
        <!-- card ends  -->
      </div>
      <!-- Done content ends  -->
    </div>
    <!-- Done category ends -->
  </div>
</template>


<script>
import axios from "axios";
import TaskCard from "./TaskCard";

export default {
  name: "TaskList",
  data() {
    return {
      tasks: [],
    };
  },
  components: {
    TaskCard,
  },
  methods: {
    changePage(page) {
      this.$emit("switchPage", page);
    },
    fetchTasks() {
      axios({
        url: "https://warm-stream-58190.herokuapp.com/tasks",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    taskEdited(data) {
      this.$emit("editTask", data);
    },
  },
  created() {
    this.fetchTasks();
  },
  computed: {
    taskBacklog() {
      return this.tasks.filter((el) => el.category === "backlog");
    },
    taskTodo() {
      return this.tasks.filter((el) => el.category === "todo");
    },
    taskDoing() {
      return this.tasks.filter((el) => el.category === "doing");
    },
    taskDone() {
      return this.tasks.filter((el) => el.category === "done");
    },
  },
};
</script>

<style scoped>
.card-board-content {
  background-color: #f8f9fc;
  max-height: 80vh;
}
</style>