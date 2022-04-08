<template>
  <SearchBar
    v-model="SearchText"
    :is-exact-match="isExactMatch"
    @add="doAdd($event)"
    @remove="doRemove($event)" />

  <div :class="$style.row">
    <div :class="$style.column">
      <ul id="array-rendering">
        <li
          v-for="item in SearchList"
          :key="item.key"
          :class="getClass(item.key)">
          {{ item.text }}
        </li>
      </ul>
    </div>

    <div :class="$style.orderselect">
      <CustomSwitch
        v-model="SelectedKey"
        :items="[
          { key: 0, text: 'by Value' },
          { key: 1, text: 'by Date' },
        ]" />
    </div>
  </div>
</template>

<script lang="ts">
import SearchBar from 'components/SearchBar.vue'; //
import CustomSwitch from 'components/CustomSwitch.vue'; //
import { LoadData, SaveData, StorageItem } from './classes/storage';
import { computed, defineComponent, ref, useCssModule, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { mainOidc } from 'main';

export default defineComponent({
  name: 'App',
  components: {
    SearchBar,
    CustomSwitch,
  },
  setup() {
    console.log('Define component');
    console.log(mainOidc.isAuthenticated);

    if (!mainOidc.isAuthenticated) {
      console.log('authentication');
      mainOidc.signIn();
      console.log(mainOidc.isAuthenticated);
    }

    // Setup
    const { result } = useQuery(
      gql`
        {
          users {
            id
            name
          }
        }
      `
    );

    console.log('Define component ok');

    const Style = useCssModule();

    const Store = ref(LoadData());
    const SearchText = ref('');
    const SelectedKey = ref(0);
    const isExactMatch = computed(() => {
      return Store.value.find((x) => x.text === SearchText.value);
    });
    const SearchList = computed(() => {
      if (SearchText.value === '') return Store.value;
      else
        return Store.value.filter((x) => x.text.startsWith(SearchText.value));
    });

    watch(SelectedKey, (key, last) => {
      console.log(key, last);

      if (key === 0) Store.value.sort((x, y) => (x.text > y.text ? 1 : -1));
      else Store.value.sort((x, y) => (x.timestamp > y.timestamp ? 1 : -1));
    });

    watch(result, (value) => {
      console.log(value);
    });

    return {
      result,
      SelectedKey,
      SearchText,
      isExactMatch,
      SearchList,
      Store,
      Style,
    };
  },
  methods: {
    doAdd(value: string) {
      this.Store.push(new StorageItem(this.Store.length, value, Date.now()));

      if (this.SelectedKey === 0)
        this.Store.sort((x, y) => (x.text > y.text ? 1 : -1));
      else this.Store.sort((x, y) => (x.timestamp > y.timestamp ? 1 : -1));

      SaveData(this.Store);
      this.SearchText = '';
    },
    doRemove(value: string) {
      var item = this.Store.findIndex((x) => x.text === value);
      this.Store.splice(item, 1);
      SaveData(this.Store);
      this.SearchText = '';
    },
    getClass(id: number) {
      var result = [];
      if (this.isExactMatch?.key === id) {
        result.push(this.Style.selected);
      } else {
        result.push(this.Style.nonselected);
      }
      return result;
    },
  },
});
</script>

<style lang="scss" module>
@use 'sass/global';
@use 'sass/color';

.row {
  display: flex;
}

.column {
  width: 50%;
  flex: 100%;
  align-content: center;
}

.orderselect {
  flex: 20%;
}

.selected {
  background: color.$input-active-background;
}

.nonselected {
  background: transparent;
}

// Style
</style>

<style src="vue3-date-time-picker/dist/main.css"></style>
