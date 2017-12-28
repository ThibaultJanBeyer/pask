import html from "dom-template-strings";
import Pikaday from "pikaday";
import moment from "moment";

class Component extends HTMLElement {
  constructor() {
    super();
    this.className = "fieldset";
    this.id = "options";
    this.getData = this.getData.bind(this);
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

  getData() {
    let date = this.calender._o.field.value,
      title = this.querySelector("#tracking-title"),
      description = this.description.getData();
  }

  createBody() {
    let Description = customElements.get("description-el");
    this.description = new Description();

    let options = html` <label class="legend" for="options"> Options </label>
                      <div id="option-inputs">
                        <div id="title-container" class="option">
                           <span class="label">Title</span>
                           <input type="text" placeholder="Please enter title.." class="text-input" id="tracking-title"/>
                        </div>
                        ${this.description}
                      </div>
                      <div id="date-container" class="option">
                          <span class="label">Date</span>
                          <input
                            id="calender"
                            class="date"
                            type="text"
                            value=${moment().format("L")}
                            readonly
                          />
                      </div>
                    `;

    return options;
  }
}

export default Component;
