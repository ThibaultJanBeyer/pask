import dom from "dom-template-strings";
import Pikaday from "pikaday";
import moment from "moment";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = container.get("events");
  }

  connectedCallback() {
    const body = this.createBody();

    this.appendChild(body);

    this.calender = new Pikaday({
      field: document.getElementById("calender"),
      format: "yyyy/mm/dd",
      defaultDate: moment().format("MMM YYYY"),
      setDefaultDate: true,
      onSelect: date => {
        this.calender._o.field.value = moment(date).format("L");
      }
    });
  }

  createBody() {
    const date = dom`<div id="date-container">
                      <label for="calender"> Date: </label>
                      <input
                        id="calender"
                        type="text"
                        value=${moment().format("L")}
                        readonly
                      />
                    </div>
                   `
    const containerElement = dom`<fieldset id="tracker-options">
                                    <legend>Options</legend>
                                    ${date}
                                </fieldset>`;

    return containerElement;
  }
}

export default Component;
