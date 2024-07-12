<template>
  <button :class="classes" @click="(e) => emits('click', e)">
    <slot>{{ props.text }}</slot>
  </button>
</template>

<script setup lang="ts">
import {computed, defineProps, withDefaults,defineEmits} from "vue";
import {ButtonTypeVariants} from "@/components/ui/button/enums";

interface ButtonProps {
  variant?: ButtonTypeVariants;
  text: string | number;
}

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: ButtonTypeVariants.primary,
  text: 'default text'
})

const classes = computed(() => {
  return {
    'ing-button': true,
    [`ing-button--${props.variant}`]: true
  }
})

</script>

<style scoped lang="scss">
.ing-button {
  border: none;
  padding: 8px 16px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  &--primary {
    background-color: $color-primary;
    color: $color-white;
    &:hover {
      background-color: $color-primary-dark;
    }
  }
}
</style>