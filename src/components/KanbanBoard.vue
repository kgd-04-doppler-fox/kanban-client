<template>
      <div class="col-3">
        <div class="p-2 alert alert-info">
          <h3>{{categoryTitle}}</h3>
            <div class="overflow-auto" style="height: 450px;">
                  <KanbanCard
                v-for="task in filterTask"
                :key="task.id"
                :task="task"
                @fetchTask="fetchTask"
                ></KanbanCard>
            </div>
        </div>
</template>

<script>
import KanbanCard from "./KanbanCard";
export default {
  name: "KanbanBoard",
  props: ["categoryTitle", "tasks"],
  components: {
    KanbanCard,
  },
  methods: {
    fetchTask() {
      this.$emit('fetchTask')
    }
  },
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