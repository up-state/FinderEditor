<template>
  <div class="result-list">
    <nav v-if="categories.length > 0">
      <ul>
        <li v-for="(category, index) in categories" :key="index">
          <button v-on:click="current = index">{{category.name}}<span v-if="category.offers.length > 0">{{category.offers.length}}</span></button>
        </li>
      </ul>
    </nav>
    <!-- {{current}} -->
    <ResultCard v-for="(offer, index) in categories[current].offers" :key="index" v-bind:offer=offer />
    <span v-html="categories[current].description"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ResultCard from "./results/ResultCard.vue";

@Component({
  components: {
    ResultCard
  }
})
export default class ResultList extends Vue {
  @Prop() public categories!: any[];
  @Prop() public current!: number;
  // public current: any = {};

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.result-list {
}
</style>
