<template>
  <div class="col-sm-6 col-md-3 col-xl-3">
    <div class="card bg-light">
      <div class="card-body bg-dark rounded">
        <h6
          class="card-title text-truncate py-2 bg-dark text-white text-center rounded"
        >
          {{ categoryTitle }}
        </h6>
        <KanbanCard
          v-for="task in filterTask"
          :categories="categories"
          :task="task"
          :key="task.id"
        ></KanbanCard>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from "./KanbanCard";
export default {
  name: "KanbanBoard",
  props: ["categories", "categoryTitle", "tasks"],
  components: {
    KanbanCard,
  },
  methods: {},
  computed: {
    filterTask: function () {
      let filteredTask = this.tasks.filter(
        (task) => task.category == this.categoryTitle
      );
      return filteredTask;
    },
  },
};
</script>

<style>
</style>