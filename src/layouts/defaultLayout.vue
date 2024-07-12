<template>
  <div class="ing-layout">
    <div class="ing-layout__content">
      <h1 class="title">Timetable</h1>
      <ing-navigation/>
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
import IngNavigation from "@/components/IngNavigation.vue";
</script>

<style scoped lang="scss">
.ing-layout {
  height: 100vh;
  padding: 40px 32px;
  background-color: $color-main-bg;
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
      margin-bottom: 24px;
    }
    .ing-navigation {
      margin-bottom: 16px;
    }
  }
}
</style>