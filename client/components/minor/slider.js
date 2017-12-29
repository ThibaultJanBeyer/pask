import html from "dom-template-strings";

class Component extends HTMLElement {
  constructor() {
    super();
    this.slidesLenght = 30;
    this.input = this.input.bind(this);
    this.destroy = this.destroy.bind(this);
    this.getData = this.getData.bind(this);
    this.validate = this.validate.bind(this);
  }

  connectedCallback() {
    const elements = this.createBody();
    elements.forEach(item => {
      this.appendChild(item);
    });
  }

  createSlider(value = 10) {
    let columns = [],
      coneHeight = [302, 498],
      x = 5,
      x2 = 40;

    for (let i = 0; i < this.slidesLenght; i++) {
      const className = this.getClassType(i, value);
      const column = `<path class=${className} d="M${x} ${coneHeight[0]}L${
        x2
      } ${coneHeight[0]}L${x2} ${coneHeight[1]}L${x} ${coneHeight[1]}L${
        x
      } 302Z" ></path>`;
      x += 60;
      x2 += 60;
      coneHeight[0] -= 5;
      columns.push(column);
    }

    return `<svg id="slider-cols" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMinYMax meet" viewBox="0 100 100 500" width="180" height="40">
              ${columns.map(col => col).join(" ")};
            </svg>`;
  }

  getClassType(index, selection) {
    let classname = "";
    selection = Math.ceil(selection / 3.5);
    switch (true) {
      case selection > index:
        classname = "range-lower";
        break;
      case selection < index:
        classname = "range-higher";
        break;
      case selection == index:
        classname = "range-selected";
        break;
    }
    return classname;
  }

  getData() {
    let name = this.querySelector(".tracker-name"),
      value = this.querySelector("#range");

    if (!name.value) {
      name.parentNode.classList.add("unvalid");
    }

    return {
      name: name.value,
      value: value.value
    };
  }

  input(event) {
    const svgColumns = this.querySelector("#slider-cols"),
      svgRange = this.querySelector("#range"),
      rangeValue = this.querySelector(".rangeValue"),
      inputValue = event.target.value - 1;

    rangeValue.innerHTML = event.target.value;
    svgRange.style.setProperty("--range-value", `${inputValue + 1}%`);

    for (let index in svgColumns.children) {
      const child = svgColumns.children[index];
      index = Number(index);
      if (child.nodeType == 1) {
        child.classList = this.getClassType(index, inputValue);
      }
    }
  }

  destroy() {
    this.remove();
  }

  validate(event) {
    let eventParent = event.target.parentNode;
    if (eventParent.classList.contains("unvalid")) {
      eventParent.classList.remove("unvalid");
    }
  }

  createBody() {
    const defaultValue = 10,
      rangeVisual = html `${this.createSlider(defaultValue)}`,
      rangeValue = html `<div class="rangeValue">10</div>`,
      deleteButton = html `<div class="destroy-tracker"><img src="public/images/delete3.svg" alt="delete" title="remove tracker" /></div>`,
      rangeName = html `<div class="option range-name">
                          <span class="label">Name</span>
                          <input type="text" title="Tracker name" class="text-input tracker-name" />
                      </div>`,
      rangeInput = html `<input id="range" min="1" max="100" step="1" value=${
        defaultValue
      } type="range" />`;

    deleteButton.onclick = this.destroy;
    rangeInput.oninput = this.input;
    rangeName.children[1].onchange = this.validate;
    return [rangeVisual, rangeValue, rangeName, rangeInput, deleteButton];
  }
}

export default Component;
