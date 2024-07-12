<template>
  <div class="ing-navigation">
    <div
        class="ing-navigation__item"
        v-for="item in navigationList"
        :key="item.text"
        :class="{ active: route.path === item.route }"
    >
      <router-link :to="item.route">{{ item.text }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoutePaths } from "@/router/enums";
import { useRoute } from "vue-router";

const route = useRoute()

type NavigationItem = {
  text: string;
  route: RoutePaths;
};

const navigationList: NavigationItem[] = [
  { text: 'Bus Lines', route: RoutePaths.root },
  { text: 'Stops', route: RoutePaths.stops }
]
</script>

<style lang="scss">
.ing-navigation {
  background-color: $color-white;
  border-radius: 4px;
  display: flex;
  padding: 0 24px;
  &__item {
    padding: 20px 24px;
    a {
      text-decoration: none;
      color: $color-gray;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      cursor: pointer;
    }
    &.active {
      border-bottom: 2px solid $color-primary;
      cursor: default;
      a {
        color: $color-black;
      }
    }
  }
}
</style>