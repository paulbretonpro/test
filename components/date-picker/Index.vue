<script setup lang="ts">
import type { Dayjs } from "dayjs";

const date = defineModel<Dayjs | undefined>({ required: true });

defineProps<{
  required?: boolean;
}>();

const displayDate = computed(() =>
  date.value ? date.value.format("YYYY-MM-DD") : ""
);
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UInput :model-value="displayDate" icon="i-heroicons-calendar-days" />

    <template #panel="{ close }">
      <DatePickerCalendar
        v-model="date"
        :is-required="required"
        @close="close"
      />
    </template>
  </UPopover>
</template>
