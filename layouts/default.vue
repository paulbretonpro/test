<template>
  <div class="h-screen overflow-hidden bg-slate-50 flex flex-col gap-4 justify-between px-6 pb-4 pt-6">
    <div class="overflow-y-auto grow">
      <slot />
    </div>
    <div
      class="bg-white border border-gray-200 shadow-lg rounded-md flex gap-2 justify-evenly py-4"
    >
      <ClientOnly>
        <NuxtLink>
          <UButton
            :variant="getVariantByRoutePath('/')"
            icon="i-heroicons-calendar-days"
          />
        </NuxtLink>
        <NuxtLink to="/tasks/todo">
          <UChip size="2xl" :text="countTasks.todo" :show="countTasks.todo > 0"
            ><UButton
              :variant="getVariantByRoutePath('/tasks/todo')"
              icon="i-heroicons-clipboard-document-list"
            />
          </UChip>
        </NuxtLink>
        <NuxtLink to="/tasks/pending">
          <UChip
            size="2xl"
            :text="countTasks.pending"
            :show="countTasks.pending > 0"
            ><UButton
              :variant="getVariantByRoutePath('/tasks/pending')"
              icon="i-heroicons-clock"
            />
          </UChip>
        </NuxtLink>
        <NuxtLink to="/tasks/done">
          <UButton
            :variant="getVariantByRoutePath('/tasks/done')"
            icon="i-heroicons-clipboard-document-check"
          />
        </NuxtLink>
        <NuxtLink to="/settings">
          <UButton
            :variant="getVariantByRoutePath('/settings')"
            icon="i-heroicons-adjustments-horizontal"
          />
        </NuxtLink>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { countTasks } = storeToRefs(useTasksStore());

const getVariantByRoutePath = (path: string) =>
  route.path === path ? "solid" : "ghost";
</script>
