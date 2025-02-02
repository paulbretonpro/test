<template>
  <UContainer class="flex flex-col gap-8 mt-4">
    <TitlePage :title="`Dashboard ${user?.name}`" />
    <div class="flex flex-col md:flex-row gap-8">
      <DashboardDeadlineWidget class="grow" />
      <DashboardToScheduleWidget class="grow" />
    </div>
    <DashboardWeekViewer class="w-full" />
  </UContainer>

  <TasksButtonAdd />  
</template>
<script setup lang="ts">
const { user } = storeToRefs(useUserStore())
</script>
