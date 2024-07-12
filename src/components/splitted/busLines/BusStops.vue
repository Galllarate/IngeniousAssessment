<template>
  <ing-box
      class="bus-stops"
      :heading="`Bus Line: ${selectedLine}`"
      :status="boxStatus"
      empty-text="Please select the bus line first"
  >
    <div v-if="stopsList">
      <ing-table-list
          :list="sortedWithoutDuplicationsList"
          :shown-text="'stopOrder'"
          :filter-by="'order'"
          filter-title="Bus stops"
          @update:list-item="(item: ScheduleItem) => emits('update:busStopSelected', item)"
      />
    </div>
  </ing-box>
</template>

<script setup lang="ts">
import IngBox from "@/components/ui/box/IngBox.vue";

import {computed, defineEmits, defineProps, ref, watchEffect} from "vue";
import {ScheduleItem} from "@/types/api";
import {BoxStatuses} from "@/components/ui/box/enums";
import IngTableList from "@/components/ui/tableList/IngTableList.vue";

interface BusStopProps {
  stopsList: ScheduleItem[] | null;
  selectedLine?: number | null;
  loading?: boolean;
}

const props = defineProps<BusStopProps>();

const sortedWithoutDuplicationsList = ref<ScheduleItem[]>([]);


const emits = defineEmits<{
  (event: 'update:busStopSelected', value: ScheduleItem): void;
}>();


const boxStatus = computed(() => {
  if (props.loading) return BoxStatuses.loading
  return props.selectedLine ? BoxStatuses.active : BoxStatuses.empty
})

watchEffect(() => {
  if (!props.stopsList) return
  sortedWithoutDuplicationsList.value = [...props.stopsList]
      .sort((a, b) => a.order - b.order)
      .filter((stop, index, self) => index === self.findIndex((s) => s.stop === stop.stop))
      .map(stop => ({
        ...stop,
        stopOrder: `${stop.stop} ${stop.order}`
      }))
})


</script>

<style scoped lang="scss">
.bus-stops {
  max-height: 444px;
  overflow: hidden;
  overflow-y: auto;
}
</style>