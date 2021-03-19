<template>
  <div class="results max-screen">
    <h1>Deine Resultate</h1>
    <h2>
      <button
        :class="{ btn: true, outline: !isCopied, small: true }"
        v-on:click="copyToClipboard()"
      >
        Link kopieren
        <!-- <i class="fa fa-copy"></i> -->
      </button>
    </h2>
    <div class="list" :class="{ vertical: type }">
      <div class="nav-box" ref="nav">
        <ResultNav
          v-if="categories.length > 0"
          v-bind:categories="categories"
          v-bind:query="query"
          v-on:type="checkNavType"
        ></ResultNav>
      </div>
      <div class="main-box">
        <article v-if="current">
          <h2 v-html="current.name"></h2>
          <p class="description-box" v-if="current.description" v-html="current.description"></p>
          <div class="details">
            <router-link
              class="max-article"
              v-if="current.description"
              :to="'/results/' + current.name + '' + query + '&description=true'"
              >Details anzeigen</router-link
            >
          </div>
        </article>
        <main v-for="(category, index) in categories" :key="index">
          <div
            v-if="
              $route.params.cathegorie == category.name || (!$route.params.cathegorie && index == 0)
            "
          >
            <div class="offers">
              <ResultCard
                v-for="(offer, index) in category.offers"
                :key="index"
                v-bind:offer="offer"
                v-bind:link="'/results/' + category.name + '' + query + '&offer=' + offer.id"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import ResultList from '../components/ResultList.vue';
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import { FinderService } from '../shared/services/finder.service';
import { NotificationService } from '../shared/services/notfication.service';
import { ButtonConfig } from '../components/NavFooter/ButtonConfig.class';
import Description from '../components/results/Description.vue';
import ResultCard from '../components/results/ResultCard.vue';
import ResultNav from '../components/results/ResultNav.vue';
import { Route } from 'vue-router';
import AnalyticsService from '../shared/services/analytics.service';

@Component({
  components: {
    ResultList,
    Description,
    ResultCard,
    ResultNav,
  },
})
export default class Results extends Vue {
  @Prop() private msg!: string;
  public categories: any[] = [];
  public descriptions: any[] = [];
  public current: any = null;
  public query: string = '';
  public isCopied: boolean = false;

  $refs: any;
  public type: boolean = false;

  backToFinder() {
    FinderService.updateValue('index', 0, false);
    this.$router.push({
      path: '/finder' + this.query,
    });
  }

  copyToClipboard(str: string = window.location.href) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.isCopied = true;
  }

  @Emit('updateStatus')
  updateStatus(): ButtonConfig[] {
    return [
      new ButtonConfig('Zurück zum Finder', false, () => {
        this.backToFinder();
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
      FinderService.updateCurrentDescription(this.current);
    } else if (!!this.categories) {
      this.current = this.categories[0];
    }
  }
  updated() {
    if (!!this.current) {
      FinderService.updateCurrentOffer(this.current.offers);
      FinderService.updateCurrentDescription(this.current);
    }
  }
  checkNavType(type: string): void {
    this.type = type == 'vertical';
  }
  mounted() {
    this.updateStatus();
    FinderService.loadStatusFromUrl();
    FinderService.updateValue('index', null, false);
    this.query = FinderService.parseValueToUrl();
    let categories: any[] = [];
    FinderService.getResults().then((results: any) => {
      FinderService.getDescriptions().then((descriptions: any) => {
        descriptions.data.forEach((description: any) => {
          let category = {
            name: description.name,
            description: FinderService.filterText(description.html),
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
          FinderService.updateCurrentDescription(this.current);
        }
      });
    });
    // NotificationService.main();
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    AnalyticsService.sendGAEvent('Load', 'Results', 'Navigate', FinderService.values);
  }
}
</script>

<style lang="scss">
.results {
  article {
    display: block;
    position: relative;
    text-align: left;
    p {
      max-height: 300px;
      overflow: hidden;
    }
    button {
    }
    .details {
      // position: absolute;
      // bottom: 8px;
      // left: 0;
      text-align: center;
      width: 100%;
      display: block;

      a.max-article {
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
  .list {
    display: flex;
    flex-wrap: wrap;
    .main-box {
      background-color: var(--brown);
    }
    @media (min-width: 701px) {
      &.vertical {
        .nav-box {
          width: 200px;
        }
        .main-box {
          width: calc(100% - 200px);
        }
        .offers {
          @media (max-width: 1100px) {
            --card-width: 100%;
          }
        }
      }
    }

    @media (max-width: 700px) {
      .nav-box,
      .main-box {
        width: 100%;
      }
    }
  }
  main > div {
    padding: 20px;
    @media (max-width: 700px) {
      padding: 0;
    }
    display: flex;
    flex-wrap: wrap;
    .offers {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      --card-width: 50%;
      @media (max-width: 900px) {
        --card-width: 100%;
      }
      > * {
        width: calc(var(--card-width) - 10px);
        box-sizing: border-box;
      }
    }
  }
}
</style>
