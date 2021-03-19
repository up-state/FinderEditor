<template>
  <div class="dropdown">
    <!-- <div class="content"> -->
    <button
      class="toggle btn"
      v-bind:class="{ active: value != null }"
      v-on:click="setInnerHeight(!open)"
    >
      <span class="content" v-html="buttonText"></span>
      <div class="arrow-box" v-bind:class="{ open: open }">
        <div class="arrow">
          <img src="@/assets/arrow.svg" alt />
        </div>
      </div>
    </button>
    <!-- <OverlayScrollbarsComponent class="options"> -->
    <!-- <button v-on:click="toggle()" class="select">{{value? config.options[value-1].key: 'bitte wählen'}}</button> -->
    <div
      class="options"
      v-bind:style="{ height: height }"
      v-bind:class="{ open: open }"
      ref="options"
    >
      <div v-for="(option, index) in config.options" :key="index">
        <div class="category-title" v-if="option.value == null">
          <span v-html="option.key"></span>
        </div>
        <label
          v-if="option.value != null"
          v-bind:class="{ active: index == value }"
          v-on:click="setInnerHeight(false)"
        >
          <!-- v-bind:class="{closed: true}" -->
          <input type="radio" :id="config.key + '_' + index" :value="index" v-model="value" />
          <span v-html="option.key"></span>
        </label>
      </div>
    </div>
    <!-- </OverlayScrollbarsComponent> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { FinderService } from '../../shared/services/finder.service';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';

@Component({
  components: {
    OverlayScrollbarsComponent,
  },
})
export default class DropDown extends Vue {
  private status: any;
  @Prop() private config!: any;
  private value: any = null;
  private height = '0';
  public $refs: any;

  public buttonText: string = 'bitte wählen';

  setInnerHeight(open: boolean) {
    this.open = open;
    this.height = !this.open ? '0px' : this.$refs.options.scrollHeight + 'px';
  }

  mounted() {
    this.status = {};
    let index: any = FinderService.getValue(this.config.key);
    this.value = index == null ? null : this.findOptionIndex(index);
    this.open = false;

    this.valueChanged(this.value);
    window.addEventListener('resize', () => {
      this.setInnerHeight(this.open);
    });
  }

  public findOptionIndex(value: any): any {
    for (let i = 0; i < this.config.options.length; i++) {
      if (this.config.options[i].value == value) {
        return i;
      }
    }
    return null;
  }

  public open: boolean = false;

  setActive(val: boolean) {
    this.status.isActive = val;

    this.validate(this.value);
    this.emitStatusChange(this.status);
  }
  @Watch('value')
  valueChanged(id: number) {
    let option = this.config.options[id];
    this.buttonText = id != null ? option.key : 'bitte wählen';

    this.validate(id != null ? option.value : null);
    this.emitStatusChange(this.status);
  }
  @Emit('status')
  emitStatusChange(status: any) {
    this.status = status;
  }
  public validate(val: any) {
    this.status.errors = [];

    this.config.validators.forEach((v: any) => {
      if (!v.isValide(val)) {
        this.status.errors.push({
          message: v.message,
        });
      }
    });
    this.status.isValide = this.status.errors.length == 0;
    this.status.value = val;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dropdown {
  display: flex;
  flex-direction: column;
  .btn {
    display: grid;
    grid-template-columns: auto 24px;
    background-color: var(--prim-700);
    &:hover {
      background-color: var(--prim-800);
    }
    &:active {
      background-color: var(--prim-900);
    }
    .content {
      padding: 0 24px;
    }
    .arrow-box {
      .arrow {
        transform: rotate(360deg);
        transition: transform 0.5s;
        img {
          width: 24px;
        }
      }
      &.open .arrow {
        transform: rotate(180deg);
      }
    }
  }
}
.options {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.5s height;
  div {
    margin-top: 8px;
    .category-title,
    label {
      display: block;
      background: none;
      padding: 16px;
      font-size: 1.5rem;
      color: black;
      letter-spacing: 1px;
      font-weight: 400;
      text-align: center;
    }
    label {
      border: none;
      border-radius: 6px;
      box-sizing: content-box;
      background-color: #ffffff;
      outline: none !important;
      cursor: pointer;

      &.active {
        color: var(--white);
        background-color: var(--prim-700);
      }
    }
    input {
      display: none;
    }
  }
}
</style>
