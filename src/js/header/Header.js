import { Component } from "../common/Component";
import { Toggler } from "./Toggler";
import { keyData } from "../data/keyData";
export class Header extends Component {
  constructor(config) {
    console.log(config);
    const { $parent, classes } = config;
    super("div", { $parent, classes });
    this.tableHTML = this.getTableHTML(keyData);
  }

  getToggler(target) {
    this.toggler = new Toggler(
      target,
      {
        toggleState: { isOn: true, contentHTML: this.tableHTML },
        toggleClasses: "show",
      },
      { $parent: this.$el, classes: "btn toggler", text: "table" }
    );

    // eventType, callback
    this.toggler.addToggleHandler("click", () => {
      this.toggler.setState("-");
    });
  }

  getTableHTML(data) {
    const thead = `<tr class="thead__row">
                     <th>Key Code</th>
                     <th>Key</th>
                   </tr>`;
    const tbody = Object.keys(data)
      .map(
        (key, i) =>
          `<tr class="tbody__row" data-id="${i}">
             <td>${key}</td>
             <td>${data[key]}</td>
           </tr>`
      )
      .join("");

    return `<thead class="thead">${thead}</thead>
            <tbody class="tbody">${tbody}</tbody>`;
  }
}
