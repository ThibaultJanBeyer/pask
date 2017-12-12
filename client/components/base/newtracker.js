import html from "dom-template-strings";
import moment from "moment";
import Pikaday from "pikaday";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = container.get("events");
    this.className = "container";
  }

  connectedCallback() {
    const body = this.createBody();

    body.forEach(child => {
      this.appendChild(child);
    });

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

  addSlider(slider) {
    const Slider = customElements.get("slider-el");
    const container = document.getElementById("slider-container");
    container.appendChild(new Slider());
  }

  disconnectedCallback() {
    this.calender.destroy();
  }

  createBody() {
    const Description = customElements.get("description-el"),
      Comments = customElements.get("comments-el"),
      description = new Description(),
      comments = new Comments();

    const addTracker = html`<div id="add-new-tracker">
                                <span>Create new tracker</span>
                            </div>`;
    addTracker.onclick = this.addSlider;

    const options = html`<section class="fieldset" id="options">
                          <label class="legend" for="options"> Options </label>
                          <div id="option-inputs">
                            <div id="title-container" class="option">
                               <span class="label">Title</span>
                               <input type="text" placeholder="Please enter title.." className="text-input" id="tracking-title"/>
                            </div>              
                            ${description}
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
                          ${addTracker}
                        </section>`;

    const slidersContainer = html`<section id="slider-container"></section>`;
    const commentsEl = html`${comments}`;

    return [options, slidersContainer, commentsEl];
  }
}

export default Component;
