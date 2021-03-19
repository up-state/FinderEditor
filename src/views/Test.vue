<template>
  <div class="test">
    <h1>Alle Resultate</h1>
    <!-- <h1>{{$router.currentRoute.meta.title}}</h1> -->
    <!-- {{$route.params.cathegorie}} -->
    <div class="list">
      <nav v-if="categories.length > 0">
        <ul>
          <li v-for="(category, index) in categories" :key="index">
            <router-link
              :to="'/test/'+category.name+''+query"
              v-bind:class="{active: $route.params.cathegorie == category.name || !$route.params.cathegorie && index == 0}"
            >{{category.name}}</router-link>
          </li>
        </ul>
      </nav>
      <main v-for="(category, index) in categories" :key="index">
        <div
          v-if="$route.params.cathegorie == category.name || !$route.params.cathegorie && index == 0"
        >
          <h2>{{category.name}}</h2>
          <Description
            v-if="!!category.description"
            v-bind:text="category.description"
            v-bind:resultsExist="!!category.offers && category.offers.length > 0"
          ></Description>
          <div class="offers" v-if="indexFilter != null">
            <div v-for="(offer, index) in category.offers" :key="index">
              <ResultCard
                v-if="offer.id == indexFilter"
                v-bind:offer="offer"
                v-bind:link="'/test/'+category.name+'?offer='+offer.id"
              />
            </div>
          </div>
          <div class="offers" v-if="indexFilter == null">
            <ResultCard
              v-for="(offer, index) in category.offers"
              :key="index"
              v-bind:offer="offer"
              v-bind:link="'/test/'+category.name+'?offer='+offer.id"
            />
          </div>
          <!-- <ResultList v-if="!!categories && categories.length>0" v-bind:categories="categories" v-bind:current="current" /> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import ResultList from "../components/ResultList.vue";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FinderService } from "../shared/services/finder.service";
import { ButtonConfig } from "../components/NavFooter/ButtonConfig.class";
import Description from "../components/results/Description.vue";
import ResultCard from "../components/results/ResultCard.vue";

@Component({
  components: {
    ResultList,
    Description,
    ResultCard,
  },
})
export default class Results extends Vue {
  @Prop() private msg!: string;
  public categories: any[] = [];
  public descriptions: any[] = [];
  public current: any = null;
  public query: string = "";
  public indexFilter: any = null;

  backToResults() {
    FinderService.updateValue("index", 0, false);
    this.$router.push({
      path: "/finder" + this.query,
    });
  }
  @Emit("updateStatus")
  updateStatus(): ButtonConfig[] {
    return [
      new ButtonConfig("Zurück zum Finder", false, () => {
        this.backToResults();
      }),
    ];
  }

  beforeUpdate() {
    for (let i = 0; i < this.categories.length; i++) {
      const element = this.categories[i];
      if (!!element && element.name == this.$route.params.cathegorie) {
        this.current = element;
      }
    }
    if (!!this.current) {
      FinderService.updateCurrentOffer(this.current.offers);
    }
  }
  updated() {
    if (!!this.current) {
      FinderService.updateCurrentOffer(this.current.offers);
    }
  }

  mounted() {
    this.updateStatus();
    FinderService.loadStatusFromUrl();
    FinderService.updateValue("index", null, false);
    this.query = FinderService.parseValueToUrl();
    let categories: any[] = [];

    let queryParams = new URLSearchParams(window.location.search);
    this.indexFilter = queryParams.get("id");

    FinderService.getTestResults().then((results: any) => {
      FinderService.getDescriptions().then((descriptions: any) => {
        descriptions.data.forEach((description: any) => {
          let category = {
            name: description.name,
            description: description.html,
            offers: [],
          };
          results.data.forEach((result: any) => {
            if (result.name == description.name) {
              category.offers = result.offers;
            }
          });
          categories.push(category);
        });
        this.categories = categories;

        if (!!this.current) {
          FinderService.updateCurrentOffer(this.current.offers);
        }
      });
    });
  }
}
</script>


<style lang="scss">
.test {
  .list {
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.6));
    main > div {
      padding: 32px 16px 0 16px;
      background-color: #ebe7db;
      @media (min-width: 500px) {
        border-radius: 16px;
        margin-bottom: 128px;
      }
    }
    border-radius: 8px;
    nav {
      ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 16px 0 0 0;
        @media (min-width: 500px) {
          padding: 16px 16px 0px 16px;
        }
        overflow: hidden;
        margin: 0;
        li {
          flex-grow: 1;
          @media (max-width: 499px) {
            width: 100%;
          }
          a {
            display: inline-block;
            color: #007d8c;
            text-decoration: none;
            background-color: #f7f3ed;
            border-radius: 20px 20px 0 0;
            padding: 16px 16px 32px 16px;
            text-transform: uppercase;
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: -16px;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            box-shadow: 0 -2px 2px #00000026;
            &:hover {
              background-color: #fffdf9;
            }
            &.active {
              background: #ebe7db;
              color: #29454e;
            }
          }
        }
      }
    }
    .offers {
      display: flex;
      flex-wrap: wrap;
      & > * {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 16px;

        @media (min-width: 700px) {
          width: calc(50% - 8px);
          box-sizing: border-box;
          &:nth-child(2n) {
            margin-left: 16px;
          }
        }
      }
    }
  }
}
</style>