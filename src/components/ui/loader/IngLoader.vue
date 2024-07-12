<template>
  <div class="ing-loader" data-test-id="ing-loader"/>
</template>

<style scoped lang="scss">
.ing-loader,
.ing-loader:after {
  box-sizing: border-box;
}
.ing-loader {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.ing-loader:after {
  content: " ";
  display: block;
  width: 32px;
  height: 32px;
  margin: 4px;
  border-radius: 50%;
  border: 3px solid currentColor;
  border-color: $color-primary transparent $color-primary transparent;
  animation: ing-loader 1.2s linear infinite;
}
@keyframes ing-loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>