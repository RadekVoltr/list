<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import AddIcon from 'components/AddIcon.vue'; //
import CancelIcon from 'components/CancelIcon.vue'; //

export default defineComponent({
  name: 'SearchBar',
  components: {
    AddIcon,
    CancelIcon,
  },
  props: {
    isExactMatch: Boolean,
  },
  emits: ['Update:modelValue', 'add', 'remove'],
  setup(props) {
    const searchText = ref('');
    const addIconActive = computed(() => {
      return searchText.value !== '';
    });
    const isExactMatchC = computed(() => {
      return props.isExactMatch;
    });

    return {
      searchText,
      addIconActive,
      isExactMatchC,
    };
  },
  methods: {
    doAdd() {
      var value = this.searchText;
      if (this.isExactMatch) this.$emit('remove', value);
      else this.$emit('add', value);
      this.searchText = '';

      return true;
    },
    doRemove() {
      var value = this.searchText;
      this.$emit('remove', value);
      this.searchText = '';

      return true;
    },
  },
});
</script>

<template>
  <div :class="$style.panel">
    <input
      ref="textinput"
      v-model="searchText"
      :class="$style.input"
      placeholder="Search or Add..."
      @input="$emit('Update:modelValue', $event.target.value)"
      @keyup.enter="doAdd" />
    <AddIcon :isactive="addIconActive" @click="doAdd" />
    <CancelIcon :isactive="isExactMatchC" @click="doRemove" />
  </div>
</template>

<style lang="scss" module>
@use 'sass/color';

.panel {
  margin: auto;
  margin-top: 50px;
  width: 50%;
  padding: 10px;
  border-radius: 2px;
  background: color.$input-background;
}

.panel:focus-within {
  background: color.$input-active-background;
}

.input {
  width: 80%;
  outline: transparent;
  background: transparent;
  border: transparent;
}
</style>
