<template>
  <div>
    <div class="container-fluid pt-3">
      <h3 class="font-weight-light text-dark">Kanban Board</h3>
      <div class="row flex-row flex-sm-nowrap py-3 rounded">     
            <KanbanBoard
              v-for="category in categories"
              :categories="categories"
              :categoryTitle="category"
              :tasks="tasks"
              :key="category"
            ></KanbanBoard>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanBoard from "./KanbanBoard";

export default {
  name: "MainPage",
  props: ["tasks", "categories"],
  components: {
    KanbanBoard,
  },
};
</script>

<style>
</style>