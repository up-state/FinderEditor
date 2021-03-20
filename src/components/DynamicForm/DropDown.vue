<template>
  <div class="dropdown">
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
    <div
      class="options"
      v-bind:style="{ height: height }"
      v-bind:class="{ open: open }"
      ref="options"
    >
      <div v-for="(option, index) in question.config.options" :key="index">
        <div class="category-title" v-if="option.value == null">
          <span v-html="option.key"></span>
        </div>
        <label
          v-if="option.value != null"
          v-bind:class="{ active: index == value }"
          v-on:click="setInnerHeight(false)"
        >
          <input type="radio" :id="option.key + '_' + index" :value="index" v-model="value" />
          <span v-html="option.key" />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { Question } from '@/store/questions';

@Component({
  components: {
    OverlayScrollbarsComponent,
  },
})
export default class DropDown extends Vue {
  private status: any;
  @Prop() private question!: Question;
  private value = this.question.config.options[0].key;
  private height = '0';
  public $refs: any;

  public buttonText: string = 'bitte wählen';

  setInnerHeight(open: boolean) {
    this.open = open;
    this.height = !this.open ? '0px' : this.$refs.options.scrollHeight + 'px';
  }

  mounted() {
    this.status = {};
    this.open = false;
    window.addEventListener('resize', () => {
      this.setInnerHeight(this.open);
    });
  }

  public open: boolean = false;

  setActive(val: boolean) {
    this.status.isActive = val;

    this.validate(this.value);
    this.emitStatusChange(this.status);
  }

  @Watch('value')
  valueChanged(id: number) {
    let option = this.question.config.options[id];
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
    if (!!this.question.config.required) {
      if (this.value == null || this.value == undefined) {
        this.status.errors.push(this.question.config.required);
      }
    }
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
