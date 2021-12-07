<script lang="ts">
import { defineComponent, ref, useCssModule } from 'vue';
import { SwitchItem } from '../classes/switchdata';

export default defineComponent({
  name: 'CustomSwitch',
  props: {
    items: {
      type: Array,
      default: () => {
        return new Array<SwitchItem>();
      },
    },
  },
  emits: ['Update:modelValue'],
  setup(props) {
    var key = 0;
    const style = useCssModule();

    if (props.items.length > 1) key = (props.items[0] as SwitchItem).key;
    const selectedKey = ref(key);

    return {
      selectedKey,
      style,
    };
  },
  methods: {
    doChange(value: number) {
      this.$emit('Update:modelValue', value);
      this.selectedKey = value;
    },
    getClass(id: number) {
      var result = [];
      if (this.selectedKey === id) {
        result.push(this.style.selected);
      } else {
        result.push(this.style.nonselected);
      }
      return result;
    },
  },
});
</script>

<template>
  <div v-for="item in items" :key="item.key">
    <div :class="getClass(item.key)" @click="doChange(item.key)">
      {{ item.text }}
    </div>
  </div>
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
  background: url('~@/../assets/add.svg?stroke=#{color.$icon-active}');
}

.icon_disabled {
  @extend %icon-shared;
  background: url('~@/../assets/add.svg?stroke=#{color.$icon-disabled}');
}

.transparent {
  outline: transparent;
  background: transparent;
  border-width: 0px;
}

.selected {
  background: color.$input-active-background;
}

.nonselected {
  background: transparent;
}
</style>
