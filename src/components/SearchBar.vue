<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import AddIcon from 'components/AddIcon.vue'; //
import CancelIcon from 'components/CancelIcon.vue'; //
import Multiselect from '@vueform/multiselect';

export default defineComponent({
  name: 'SearchBar',
  components: {
    AddIcon,
    CancelIcon,
    Multiselect,
  },
  props: {
    isExactMatch: Boolean,
  },
  emits: ['Update:modelValue', 'add', 'remove'],
  setup(props) {
    const date = ref(new Date());

    const searchText = ref('');
    const addIconActive = computed(() => {
      return searchText.value !== '';
    });
    const isExactMatchC = computed(() => {
      return props.isExactMatch;
    });

    return {
      date,
      searchText,
      addIconActive,
      isExactMatchC,
      value: null,
      options: [
        {
          value: 'captainamerica',
          name: 'Captain America',
          icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/03_-_Captain_America_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png',
        },
        {
          value: 'spiderman',
          name: 'Spiderman',
          icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/12_-_Spiderman_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png',
        },
        {
          value: 'ironman',
          name: 'Iron Man',
          icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/02_-_IRONMAN_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png',
        },
      ],
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
  <div>
    <Multiselect v-model="value" :options="options">
      <template #singlelabel="{ value }">
        <div class="multiselect-single-label">
          <img
            class="character-label-icon"
            :src="require('country-flag-icons/1x1/CZ.svg')" />
          <img class="character-label-icon" :src="value.icon" />
          {{ value.name }}
        </div>
      </template>

      <template #option="{ option }">
        <img
          class="character-label-icon"
          :src="require('country-flag-icons/1x1/CZ.svg')" />
        <img class="character-option-icon" :src="option.icon" />
        {{ option.name }}
      </template>
    </Multiselect>
  </div>
</template>

<style lang="scss" module>
:global {
  @import '@vueform/multiselect/themes/default.scss';

  .multiselect {
    position: relative;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    background: var(--ms-bg, transparent);
    font-size: var(--ms-font-size, 1rem);
    min-height: calc(
      2 * var(--ms-border-width, 1px) + var(--ms-font-size, 1rem) *
        var(--ms-line-height, 1.375) + 2 * var(--ms-py, 0.5rem)
    );
  }
  .multiselect.is-open {
    border-radius: var(--ms-radius, 4px) var(--ms-radius, 4px) 0 0;
  }
  .multiselect.is-open-top {
    border-radius: 0 0 var(--ms-radius, 4px) var(--ms-radius, 4px);
  }
  .multiselect.is-disabled {
    cursor: default;
    background: var(--ms-bg-disabled, #0753eb);
  }
  .multiselect.is-active {
    box-shadow: 0 0 0 var(--ms-ring-width, 3px) var(--ms-ring-color, #10b98130);
  }

  .multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #35495e;
    margin: 3px 3px 8px;
  }

  .multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
  }

  .multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;
  }

  .user-image {
    margin: 0 6px 0 0;
    border-radius: 50%;
    height: 22px;
  }

  .character-option-icon {
    margin: 0 6px 0 0;
    height: 22px;
  }

  .character-label-icon {
    margin: 0 6px 0 0;
    height: 26px;
  }
}
</style>

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
