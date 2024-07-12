<template>
  <div
      class="ing-box"
      :class="{
        'box-empty': props.status === BoxStatuses.empty,
        'box-loading': props.status === BoxStatuses.loading
      }"
  >
    <template v-if="props.status === BoxStatuses.active">
      <div v-if="props.heading" class="ing-box__heading">
        <span>{{ props.heading }}</span>
      </div>
      <div class="ing-box__content" :class="contentClass ? contentClass : ''">
      <slot/>
      </div>
    </template>
    <template v-if="props.status === BoxStatuses.empty">
      <span class="empty-text">{{ props.emptyText }}</span>
    </template>
    <template v-if="props.status === BoxStatuses.loading">
      <ing-loader/>
    </template>
  </div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from 'vue';
import {BoxStatuses} from "@/components/ui/box/enums";
import IngLoader from "@/components/ui/loader/IngLoader.vue";


interface BoxProps {
  heading?: string;
  status?: BoxStatuses;
  emptyText?: string;
  contentClass?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<BoxProps>(), {
  status: BoxStatuses.active,
  emptyText: 'No data'
})

</script>

<style scoped lang="scss">
.ing-box {
  background-color: $color-white;
  padding: 0 24px;
  border-radius: 4px;
  &__heading {
    padding: 24px 0 8px 0;
    top: 0;
    span {
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;
      color: $color-black;
    }
  }
  &.box-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed #ccc;
    .empty-text {
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      color: $color-gray-dark;
    }
  }
  &.box-loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>