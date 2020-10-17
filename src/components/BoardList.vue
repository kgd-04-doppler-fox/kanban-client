<template>
  <section id="kanban-board">
    <div class="container-fluid-board d-flex justify-content-around">
      <TaskList @editTask="edit" @switchPage="changePage"></TaskList>
    </div>
  </section>
</template>

<script>
import TaskList from "./TaskList";

export default {
  name: "BoardList",
  components: {
    TaskList,
  },
  methods: {
    changePage(page) {
      this.$emit("switchPage", page);
    },
    edit(data) {
      this.$emit("editTask", data);
    },
  },
};
</script>

<style scoped>
#kanban-board {
  max-width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #fbf7ff, #fefedf);
}
</style>