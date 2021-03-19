<template>
  <header class="navbar" v-bind:class="{ isOpen: isOpen && !isHidden, isHidden: isHidden }">
    <div class="contact">
      <span class="sozial-media">
        <span class="text">Teile, was Dir hilft:</span>
        <a
          class="fa fa-linkedin"
          href="https://www.linkedin.com/shareArticle?mini=true&url=linkedin.com/company/wir-bleiben-liqui-de&title=%23liquidebleiben&summary=&source="
        ></a>
        <a
          class="fa fa-twitter"
          href="https://twitter.com/intent/tweet?text=https%3A//twitter.com/liquidebleiben"
        ></a>
        <!-- <a class="fa fa-envelope"></a> -->
        <!-- TODO: Icon + Link -->
      </span>
      <span class="mail">
        <span class="visible-small">Kontakt:</span>
        <span class="visible-medium">Fragen? Kontaktiere uns:</span>
        <a href="mailto:hallo@wir-bleiben-liqui.de">hallo@wir-bleiben-liqui.de</a>
      </span>
    </div>
    <nav>
      <ul ref="navlist">
        <li class="logo">
          <a href="https://www.wir-bleiben-liquide.de/">
            <img src="@/assets/logo.svg" alt />
          </a>
        </li>
        <li>
          <a href="https://www.wir-bleiben-liquide.de/">Home</a>
        </li>
        <li>
          <a href="https://www.wir-bleiben-liquide.de/presse">Presse</a>
        </li>
        <li>
          <a href="https://www.wir-bleiben-liquide.de/partner">Partner</a>
        </li>
        <li>
          <a href="https://www.wir-bleiben-liquide.de/team">Team</a>
        </li>
        <li>
          <a class="active" href="">Förderfinder</a>
        </li>
        <li class="sozial-links">
          <a
            class="fa fa-linkedin"
            target="blank"
            href="https://www.linkedin.com/shareArticle?mini=true&url=linkedin.com/company/wir-bleiben-liqui-de&title=%23liquidebleiben&summary=&source="
          ></a>
          <a
            class="fa fa-twitter"
            target="blank"
            href="https://twitter.com/intent/tweet?text=https%3A//twitter.com/liquidebleiben"
          ></a>
          <a class="fa fa-envelope" target="blank" href="mailto:hallo@wir-bleiben-liqui.de"></a>
        </li>
      </ul>
      <button class="menu" v-on:click="toggle()">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavHeader extends Vue {
  $refs: any;
  public isOpen = false;
  public isHidden = false;
  public navSize = 75;

  private config = {
    scrollDistance: {
      up: 200,
      down: 200,
    },
  };

  public toggle() {
    this.isOpen = !this.isOpen;
    this.navSize = this.isOpen ? this.$refs.navlist.clientHeight : 75;
  }
  mounted() {
    let scrollPosition = window.scrollY;
    window.addEventListener('scroll', (event) => {
      if (scrollPosition + this.config.scrollDistance.down < window.scrollY) {
        scrollPosition = window.scrollY;
        this.isHidden = true;
        this.isOpen = false;
      } else if (scrollPosition - this.config.scrollDistance.up > window.scrollY) {
        scrollPosition = window.scrollY;
        this.isHidden = false;
      }
    });
  }
}
</script>

<style scoped lang="scss">
@media (max-width: 1023px) {
  .visible-medium {
    display: none;
  }
}

header.navbar {
  z-index: 5;
  position: fixed;
  height: 86px;
  width: 100%;
  top: 0;
  transition: 0.5s height;
  background-color: var(--lightest-grey);
  &.isOpen {
    height: 100%;
  }
  &.isHidden {
    height: 16px;
  }
  .contact {
    min-height: 16px;
    width: 100%;
    background-color: var(--prim-700);
    display: flex;
    justify-content: space-between;
    letter-spacing: 2px;
    font-size: 16px;
    color: var(--white);
    padding: 0 16px;
    box-sizing: border-box;
    overflow: hidden;
    align-items: center;
    height: 0px;
    transition: 0.5s height, 0.5s padding;
    > * {
      pointer-events: none;
      opacity: 0;
      transition: 0.5s opacity;
    }
    .sozial-media {
      .fa {
        display: inline-block;
        color: var(--prim-700);
        background-color: white;

        text-decoration: none;
        padding: 4px;
        width: 24px;
        height: 24px;
        border-radius: 12px;
        box-sizing: border-box;
        margin-left: 12px;
        text-align: center;
        cursor: pointer;
        &:active {
          color: var(--prim-900);
          background-color: var(--prim-300);
        }
        &:hover {
          color: var(--prim-900);
        }
      }
    }
    .mail {
      a {
        color: var(--white);
        margin-left: 8px;
        &:active {
          color: var(--prim-300);
        }
      }
    }
  }
  nav {
    position: relative;
    height: calc(100% - 16px);
    overflow: hidden;
    transition: 0.5s height;
    .menu {
      position: absolute;
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      border: none;
      background: none;
      padding: 17px 21px 17px 21px;
      font-size: 32px;
      color: var(--prim-700);
      outline: none;
      &:hover {
        color: var(--prim-800);
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      padding: 0;
      box-sizing: border-box;
      height: 100%;
      margin: 0;
      transition: 0.5s padding;
      li {
        width: 100%;
        text-align: center;
        &.sozial-links {
          display: flex;
          width: 100%;
          justify-content: space-around;
        }
        a {
          display: block;
          padding: 31px;
          font-size: 17.6px;
          text-decoration: none;
          color: black;
          &.active {
            color: var(--prim-700);
          }
        }
        &.logo {
          width: inherit;
          a {
            display: block;
            padding: 7px;

            img {
              height: 56px;
              display: block;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 700px) {
  header.navbar {
    height: 120px;
    &.isOpen {
      height: 120px;
    }
    &.isHidden {
      height: 120px;
    }
    .contact {
      // padding: 0 72px;
      height: 45px;
      > * {
        opacity: 1;
        pointer-events: initial;
      }
      // .sozial-media {
      // }
      // .mail {
      // }
    }
    nav {
      // height: 56px;
      height: calc(100% - 45px);
      .menu {
        display: none;
      }
      ul {
        flex-direction: row;
        padding: 0;
        // padding: 0 65px;
        li {
          width: initial;
          text-align: center;
          &.sozial-links {
            display: none;
          }
          a {
            // padding: 24px;

            padding: 16px;
          }
          &.logo {
            flex-grow: 1;
            a {
              padding: 0 16px;
              img {
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width: 1024px) {
  header.navbar .contact {
    padding: 0 72px;
  }
  header.navbar nav ul {
    padding: 0 calc(72px - 16px);
  }
  .visible-small {
    display: none;
  }
}
</style>
