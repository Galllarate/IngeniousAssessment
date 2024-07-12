<template>
  <div class="bus-lines">
    <select-bus-line
      @update:selected-bus-line="lineHasBeenSelected"
    />

    <div class="bus-lines__lists">
      <bus-stops
          :stops-list="stopsList"
          :selected-line="selectedLine"
          :loading="loading"
          @update:bus-stop-selected="busStopSelected"
      />
      <bus-time
          :timing-list="busStopTiming"
          :selected-line="selectedLine"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectBusLine from "@/components/splitted/busLines/SelectBusLine.vue";
import BusStops from "@/components/splitted/busLines/BusStops.vue";
import { ref } from "vue";
import Api from "@/api";
import {ScheduleItem} from "@/types/api";
import BusTime from "@/components/splitted/busLines/BusTime.vue";

const selectedLine = ref<number | null>(null);
const stopsList = ref<ScheduleItem[] | null>(null);
const busStopTiming = ref<ScheduleItem[] | null>(null);
let loading = ref(false);


const lineHasBeenSelected = (line: number | null) => {
  busStopTiming.value = null;
  stopsList.value = null;
  selectedLine.value = line;
  getBusStops()
}

const getBusStops = async () => {
  loading.value = true
  try {
    const { data } = await Api.busStops.getBusStops()
    stopsList.value  = data.filter(item => item.line === selectedLine.value)
  } catch (e) {
    alert('Error while fetching bus stops')
  } finally {
    loading.value = false
  }
}

const busStopSelected = (selectedStop: ScheduleItem) => {
  if (!stopsList.value) return;

  busStopTiming.value = stopsList.value.filter((stop) => stop.stop === selectedStop.stop);
};


</script>

<style lang="scss">
.bus-lines {
  gap: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__lists {
    height: 100%;
    display: flex;
    gap: 10px;
    .ing-box {
      flex: 1;
    }
  }
}
</style>