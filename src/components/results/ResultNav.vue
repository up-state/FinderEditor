<template>
  <nav class="result-nav">
    <ul ref="linkList">
      <li v-for="(category, index) in categories" :key="index" ref="categoryLink">
        <router-link
          :to="'/results/' + category.name + '' + query"
          v-bind:class="{
            active:
              $route.params.cathegorie == category.name ||
              (!$route.params.cathegorie && index == 0),
          }"
        >
          {{ category.name }}
          <span class="number-of-offers" v-if="category.offers.length > 1">{{
            category.offers.length
          }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import AnalyticsService from '../../shared/services/analytics.service';

@Component
export default class ResultNav extends Vue {
  @Prop()
  categories!: any[];
  @Prop()
  query!: string;

  type: string = 'horizontal';
  $refs: any;
  @Emit('type')
  checkType() {
    let navWidth = 0;
    this.$refs.categoryLink.forEach((link: any) => {
      navWidth += link.offsetWidth;
    });
    if (window.innerWidth - 32 >= navWidth) {
      this.type = 'horizontal';
    } else {
      this.type = 'vertical';
    }
    return this.type;
  }

  mounted() {
    this.checkType();
    window.addEventListener('resize', () => {
      this.checkType();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vertical .result-nav ul {
  justify-content: flex-end;
}
.result-nav {
  &.vertical {
    width: 200px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      @media (max-width: 700px) {
        width: 100%;
      }
      a {
        position: relative;
        font-size: 16px;
        font-weight: 500;
        color: var(--prim-700);
        text-decoration: none;
        // text-transform: uppercase;
        padding: 20px;
        display: block;
        border-radius: 7px 7px 0 0;
        &.active {
          color: black;
          background-color: var(--brown);
        }
        @media (max-width: 700px) {
          text-align: center;
        }
        .number-of-offers {
          position: absolute;
          top: -12px;
          right: 0;
          color: white;
          background-color: #b00020;
          padding: 3px 7.8px;
          border-radius: 12px;
          @media (max-width: 700px) {
            right: 16px;
            top: 17px;
          }
        }
      }
    }
  }
}
</style>
