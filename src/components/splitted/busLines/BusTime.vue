<template>
  <ing-box
      class="bus-time"
      :heading="headingStr"
      :status="timingList ? BoxStatuses.active : BoxStatuses.empty"
      :empty-text="selectedLine ? 'Please select the bus stop first' : 'Please select the bus line first'"
  >
    <ing-table-list
        filter-title="Time"
        :list="sortedTimingList"
        shown-text="time"
        custom-filter
        @clicked:sorting="sortByTime"
    />
  </ing-box>
</template>

<script setup lang="ts">
import IngBox from "@/components/ui/box/IngBox.vue";
import {ScheduleItem} from "@/types/api";
import {computed, defineProps, ref, watchEffect} from "vue";
import IngTableList from "@/components/ui/tableList/IngTableList.vue";
import {BoxStatuses} from "@/components/ui/box/enums";

interface BusStopProps {
  timingList: ScheduleItem[] | null;
  selectedLine?: number | null;
}

const props = defineProps<BusStopProps>();

const sortedTimingList = ref<ScheduleItem[]>([])
let isAscending = ref(false)


const headingStr = computed(() => {
  if (props.timingList) {
    return `Bus stop: ${props.timingList[0].stop} ${props.timingList[0].order}`
  } else return ''
})

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const sortByTime = () => {
  if (!props.timingList) return;
  sortedTimingList.value = sortedTimingList.value.sort((a, b) => {
    return isAscending.value
        ? timeToMinutes(a.time) - timeToMinutes(b.time)
        : timeToMinutes(b.time) - timeToMinutes(a.time);
  });

  isAscending.value = !isAscending.value;
}

watchEffect(() => {
  if (!props.timingList) return
  sortedTimingList.value = [...props.timingList].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))

})
</script>

<style scoped lang="scss">
.bus-time {
  max-height: 444px;
  overflow: hidden;
  overflow-y: auto;
}
</style>