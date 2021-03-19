<template>
  <div class="result-card">
    <h3>{{ offer.name }}</h3>
    <ul>
      <li v-for="(field, i) in offer.fields.main" :key="'main' + i">
        <span class="name">{{ field.name }}:</span>
        <span class="value" v-html="field.value"></span>
      </li>
      <!-- <li v-for="(field, index) in offer.fields.details" :key="'details'+index">
        {{field}}
      </li>-->
    </ul>
    <div class="details">
      <router-link :to="link">
        <!-- <span class="fa fa-plus"></span> -->
        Details anzeigen
      </router-link>
    </div>
    <!-- {{offer}} -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ResultCard extends Vue {
  @Prop() public offer!: any;
  @Prop() public link!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.result-card {
  background-color: var(--brown);
  border-radius: 8px;
  padding: 26px 30px 30px 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
  box-shadow: #00000029 0 1px 8px;
  justify-content: space-between;
  background: white;
  @media (max-width: 700px) {
    border-radius: 0;
  }
  h3 {
    border-bottom: var(--prim-700) 2px solid;
    margin: 0 0 24px 0;
    padding: 0 0 16px 0;
    overflow-wrap: anywhere;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      span {
        display: block;
        width: 100%;
        &.name {
          color: var(--secondary);
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          overflow-wrap: anywhere;
        }
        &.value {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 16px;
          color: black;
          overflow-wrap: anywhere;
        }
      }
    }
  }
  .details {
    text-align: right;
    a {
      background-color: var(--prim-700);
      text-transform: uppercase;
      padding: 9px 16px;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      display: inline-block;
    }
  }
}
</style>
