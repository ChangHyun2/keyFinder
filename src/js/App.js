import { Main } from "./main/Main";
import { Modal } from "./common/Modal";
// import { Footer } from "../footer/Footer";
// import { Header } from "../header/Header";

class App {
  constructor() {
    this.render();
    this.Modal = this.paragraphModal();
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
    this.hideModal();
    window.addEventListener("keydown", (e) => {
      this.main.updateKeyCode(e);
      this.main.updateKeyCards(e);
    });
  }

  paragraphModal() {
    const paragraph = `<p class="modal__message">Enter any key to get keyCode</p>`;
    return new Modal(this.$el, "modal", paragraph);
  }

  hideModal() {
    const handler = (e) => {
      this.main = new Main(this.$el.querySelector("#main"), "main");
      this.main.render();
      this.main.fetchCards();

      this.Modal.setState(false);
      window.removeEventListener("keydown", handler);
    };
    window.addEventListener("keydown", handler);
  }
}

const app = new App();
