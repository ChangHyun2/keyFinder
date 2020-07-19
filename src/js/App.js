import { ShowCase } from "./main/ShowCase";
import { Modal } from "./utility/Modal";
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
      this.showCase.updateKeyCode(e);
      this.showCase.updateKeyCards(e);
    });
  }

  paragraphModal() {
    const paragraph = `<p class="modal__message">Enter any key to get keyCode</p>`;
    return new Modal(this.$el, "modal", paragraph);
  }

  hideModal() {
    const handler = (e) => {
      this.showCase = new ShowCase(this.$el.querySelector("#main"), "showCase");
      this.showCase.render();
      this.showCase.fetchCards();

      this.Modal.setState(false);
      window.removeEventListener("keydown", handler);
    };
    window.addEventListener("keydown", handler);
  }
}

// this.Modal = new Modal("modal");
// new Message(".modal", "modal__message", "Press any key to get the keyCode");

// this.init();

// init() {
// this.updateKeyCode();
// this.hideBackDrop();
// }

// hideBackDrop() {
// const Modal = this.Modal; // to solve bind issue in addEventListener
// async function hideBackDropHandler(e) {
// await Modal.hide(); // async 1 second
// window.removeEventListener("keydown", hideBackDropHandler);
// }
//
// window.addEventListener("keydown", hideBackDropHandler);
// }
const app = new App();
