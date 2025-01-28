<template>
  <UCard class="overflow-x-hidden">
    <div class="container-calendar overflow-x-auto">
      <DashboardWeekDay nameDay="Lundi" :tasks="data" />
      <DashboardWeekDay nameDay="Mardi" :tasks="data" />
      <DashboardWeekDay nameDay="Mercredi" :tasks="data" />
      <DashboardWeekDay nameDay="Jeudi" :tasks="data" />
      <DashboardWeekDay nameDay="Vendredi" :tasks="data" />
    </div>
  </UCard>
</template>
<script setup lang="ts">
const data = []
</script>
<style>
.container-calendar {
  display: grid;
  grid-template-columns: repeat(5, minmax(154px, auto));
  gap: 1rem;
}
</style>