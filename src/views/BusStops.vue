<template>
  <div class="bus-stops">
    <div class="bus-stops__list">
      <ing-box :loading="loading">
        <input v-model="busStopSearch" type="text" placeholder="Search...." />

        <ing-table-list
            filter-title="Bus stops"
            :list="filteredBusStops"
            shown-text="stopOrder"
            :filter-by="'order'"
        />
      </ing-box>
    </div>
  </div>
</template>

<script setup lang="ts">

import IngBox from "@/components/ui/box/IngBox.vue";
import IngTableList from "@/components/ui/tableList/IngTableList.vue";
import Api from "@/api";
import { onMounted, Ref, ref, watch } from "vue";
import {ScheduleItem} from "@/types/api";

const busStops: Ref<ScheduleItem[]> = ref([])
const busStopSearch = ref('')
const filteredBusStops = ref<ScheduleItem[]>([])
const loading = ref(true)

const getBusStops = async () => {
  loading.value = true
  try {
    const { data } = await Api.busStops.getBusStops()
    busStops.value = data
        .sort((a, b) => a.order - b.order)
        .filter((stop, index, self) => index === self.findIndex((s) => s.stop === stop.stop))
        .map(stop => ({
          ...stop,
          stopOrder: `${stop.stop} ${stop.order}`
        }))
    filteredBusStops.value = busStops.value
  } catch (e) {
    alert('Error fetching bus stops')
  } finally {
    loading.value = false
  }
}

watch(busStopSearch, () => {
  if (!busStopSearch.value) filteredBusStops.value = busStops.value

  filteredBusStops.value = busStops.value.filter((stop) => stop.stop.toLowerCase().includes(busStopSearch.value.toLowerCase()))
})

onMounted(() => {
  getBusStops()
})
</script>

<style scoped lang="scss">
.bus-stops {
  gap: 16px;
  height: 90%;
  overflow-y: auto;
  &__list {
    gap: 10px;
    max-height: 50%;
    overflow: auto;
    .ing-box {
      min-height: 400px;
      flex: 1;
      input {
        margin-top: 8px;
        border: 1px solid $color-gray-light;
        height: 18px;
        width: 288px;
        padding: 12px 16px;
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        color: $color-gray;
      }
    }
  }
}
</style>