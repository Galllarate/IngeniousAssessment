<template>
  <ing-box heading="Select Bus Line">
    <div class="select-bus-lined">
      <ing-button
          v-for="item in busLines"
          :key="item"
          :text="item"
          :class="{ selected: item === selectedBusLine}"
          @click="selectBusLine(item)"
      />
    </div>
  </ing-box>
</template>

<script setup lang="ts">
import IngButton from "@/components/ui/button/IngButton.vue";
import IngBox from "@/components/ui/box/IngBox.vue";
import {defineEmits, ref} from "vue";

const emits = defineEmits<{
  (event: 'update:selectedBusLine', value: number | null): void;
}>();

const busLines: number[] = Array.from({ length: 150 - 100 + 1 }, (_, index) => (100 + index));
const selectedBusLine = ref<number | null>(null);

const selectBusLine = (busLine: number) => {
  if (busLine === selectedBusLine.value) return

  selectedBusLine.value = busLine;
  emits('update:selectedBusLine', selectedBusLine.value)
}


</script>

<style scoped lang="scss">
.select-bus-lined {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 8px;
  padding-bottom: 24px;
  .selected {
    background-color: $color-deep-dark;
  }
}
</style>