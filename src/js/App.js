import { Main } from "./main/Main";
import { Modal } from "./common/Modal";
import { Header } from "./header/Header";
// import { Footer } from "../footer/Footer";
// import { Header } from "../header/Header";

class App {
  constructor() {
    this.render();

    this.modal = this.paragraphModal();

    const headerConfig = {
      $parent: this.$el.querySelector("#header"),
      classes: "header",
    };
    this.header = new Header(headerConfig);
    this.header.getToggler(this.modal); // target : this.modal

    this.main;
    this.bindEvents();
  }

  render() {
    this.$el = document.getElementById("App");
    this.$el.innerHTML = `
      <header id="header"></header>
      <main id="main"></main>
      <footer id="footer"></footer>
      `;
  }

  bindEvents() {
    this.hideModalOnKeyDown();
    window.addEventListener("keydown", (e) => {
      this.main.updateKeyCode(e);
      this.main.updateKeyCards(e);
    });
  }

  paragraphModal() {
    const paragraph = `<p class="modal__message">Enter any key to get keyCode</p>`;
    return new Modal({
      parent: this.$el,
      classes: "modal",
      contentHTML: paragraph,
    });
  }

  hideModalOnKeyDown() {
    const handler = (e) => {
      this.main = new Main({
        $parent: this.$el.querySelector("#main"),
        classes: {
          main: "main",
          keyCode: "keyCode",
          keyCards: "keyCards",
        },
      });
      console.log(this);
      this.main.render();
      this.main.fetchKeyCards();

      this.modal.setState(false);
      window.removeEventListener("keydown", handler);
    };
    window.addEventListener("keydown", handler);
  }
}

const app = new App();
