<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CancelIcon',
  props: {
    isactive: Boolean,
  },
  emits: ['click'],
});
</script>

<template>
  <button :class="$style.transparent" @click="$emit('click')">
    <img :class="isactive ? $style.icon_active : $style.icon_disabled" />
  </button>
</template>

<style lang="scss" module>
@use 'sass/color';

%icon-shared {
  width: 24px;
  height: 24px;
  border-width: 0px;
  border: transparent;
}

.icon_active {
  @extend %icon-shared;
  background: url('~@/../assets/cancel.svg?stroke=#{color.$icon-critical}');
}

.icon_disabled {
  @extend %icon-shared;
  background: url('~@/../assets/cancel.svg?stroke=#{color.$icon-disabled}');
}

.transparent {
  outline: transparent;
  background: transparent;
  border-width: 0px;
}
</style>
