<template>
  <div class="table-list">
    <div
        class="table-list__sorter"
        @click="filterList"
    >
      <span>{{ props.filterTitle }}</span>
    </div>
    <div
        class="table-list__item"
        :class="{ selected: selectedItem ? selectedItem === item : false}"
        v-for="(item, index) in localList"
        :key="index"
        @click="selectItem(item)"
    >
      {{ item[props.shownText as keyof ScheduleItem] }}

    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, Ref, ref, watchEffect} from "vue";
import {ScheduleItem} from "@/types/api";

const props = defineProps<{
  list: ScheduleItem[];
  shownText: string;
  filterTitle: string;
  filterBy?: string;
  customFilter?: boolean;
}>();

const emits = defineEmits<{
  (event: 'update:listItem', value: ScheduleItem): void;
  (event: 'clicked:sorting'): void
}>();

const localList: Ref<ScheduleItem[]> = ref([]);
const selectedItem: Ref<ScheduleItem | null> = ref(null);
const isAscending = ref(false);

watchEffect(() => {
  if (props.list.length > 0) {
    localList.value = props.list
  }
})


const filterList = () => {
  if (props.customFilter) {
    emits('clicked:sorting')
    return
  }

  localList.value = localList.value.sort((a, b) => {
    return isAscending.value
        ? a.order - b.order
        : b.order - a.order
  });

  isAscending.value = !isAscending.value;
}

const selectItem = (item: ScheduleItem) => {
  selectedItem.value = item
  emits('update:listItem', item)
}
</script>

<style scoped lang="scss">
.table-list {
  overflow-x: hidden;
  &__sorter {
    position: relative;
    cursor: pointer;
    border-bottom: 1px solid $color-gray-light;
    margin: 0 -25px;
    padding: 24px 24px;
    span {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        right: -12px;
        top: 10px;
        border: 4px solid transparent;
        border-top: 4px solid $color-gray;
      }
      &::before {
        content: '';
        position: absolute;
        right: -12px;
        top: 0;
        border: 4px solid transparent;
        border-bottom: 4px solid $color-gray;
      }
    }
  }
  &__item {
    border-bottom: 1px solid $color-gray-light;
    margin: 0 -25px;
    padding: 20px 24px;
    cursor: pointer;
    &:hover {
      background-color: $color-gray-light;
    }
    &.selected {
      color: $color-primary;
    }
  }
}
</style>