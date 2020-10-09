<template>
  <div class="card col-2 p-3" style="max-width: 25rem">
    <div :class="status.color">
      <h1 class="text-center white">{{ status.name }}</h1>
    </div>
    <div>
      <KanbanCard
        class="d-inline-flex p-2 bd-highlight"
        v-for="task in filterTask"
        :key="task.id"
        :card="task"
        @fetchData="fetchData"
      >
      </KanbanCard>
    </div>
  </div>
</template>

<script>
import KanbanCard from "./KanbanCard";

export default {
  name: "KanbanApp",
  props: ["card", "status"],
  components: {
    KanbanCard,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    fetchData() {
      this.$emit("fetchData");
    },
  },
  computed: {
    filterTask() {
      return this.card.filter((task) => task.status == this.status.id);
    },
  },
};
</script>

<style>
</style>