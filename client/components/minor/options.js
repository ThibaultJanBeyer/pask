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
    if (!title.value) {
      title.parentNode.classList.add("unvalid");
    }

    return { date, title: title.value, description };
  }

  validate(event) {
    let eventParent = event.target.parentNode;
    if (eventParent.classList.contains("unvalid")) {
      eventParent.classList.remove("unvalid");
    }
  }

  createBody() {
    let Description = customElements.get("description-el");
    this.description = new Description();
    let title = html`<input type="text" placeholder="Please enter title.." class="text-input" id="tracking-title"/>`;
    let options = html` <label class="legend" for="options"> Options </label>
                      <div id="option-inputs">
                        <div id="title-container" class="option">
                           <span class="label">Title</span>
                           ${title}
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
    title.onchange = this.validate;
    return options;
  }
}

export default Component;
