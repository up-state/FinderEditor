<template>
  <div class="toolbar">
    <ul class="tool-list">
      <li>
        <button class="icon-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
              fill="#021343"
            />
          </svg>
        </button>
      </li>
      <li>
        <button class="icon-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 4V7H10.5V19H13.5V7H19V4H5Z" fill="#021343" />
          </svg>
        </button>
      </li>

      <li>
        <button class="icon-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 16H15V10H19L12 3L5 10H9V16ZM5 18H19V20H5V18Z" fill="#021343" />
          </svg>
        </button>
      </li>

      <li>
        <button class="icon-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8C6.85004 8 2.92004 11.03 1.54004 15.22L3.90004 16C4.95004 12.81 7.95004 10.5 11.5 10.5C13.45 10.5 15.23 11.22 16.62 12.38L13 16H22V7L18.4 10.6Z"
              fill="#021343"
            />
          </svg>
        </button>
      </li>

      <li>
        <button class="icon-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 11H9V5H4V11ZM4 18H9V12H4V18ZM10 18H15V12H10V18ZM16 18H21V12H16V18ZM10 11H15V5H10V11ZM16 5V11H21V5H16Z"
              fill="#021343"
            />
          </svg>
        </button>
      </li>

      <li>
        <button class="icon-button" @click="deleteQuestion">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
              fill="#021343"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Question } from '@/store/questions';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Toolbar extends Vue {
  @Prop() private question!: Question;

  deleteQuestion(): void {
    this.$store.commit('removeQuestion', this.question);
  }
}
</script>

<style scoped lang="scss">
.toolbar {
  margin-top: 1rem;
  border-radius: 5px;
  background-color: var(--light-blue);
  padding: 0.5rem 0.1rem;
}

.tool-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.icon-button {
  background-color: transparent;
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
