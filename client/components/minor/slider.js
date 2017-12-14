import html from "dom-template-strings";

class Component extends HTMLElement {
  constructor() {
    super();
    this.slidesLenght = 30;
    this.input = this.input.bind(this);
  }

  connectedCallback() {
    const body = this.createBody();
    body.forEach(item => {
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
      columns.push(column);
    }

    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMinYMax meet" viewBox="0 200 500 400" width="250" height="40">
              ${columns.map(col => col).join(" ")};
            </svg>`;
  }

  createLine(value = 10) {
    let x = 5,
      x2 = 40;

    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="500" height="10">
              <line x1="20" y1="0" x2="100" y2="0" stroke-width="2" stroke="black"/>
            </svg>`;
  }

  getClassType(index, selection) {
    let classtype = "";
    selection = Math.ceil(selection / 3.5);
    switch (true) {
      case selection > index:
        classtype = "range-lower";
        break;
      case selection < index:
        classtype = "range-higher";
        break;
      case selection == index:
        classtype = "range-selected";
        break;
    }
    return classtype;
  }

  input(event) {
    const svg = this.getElementsByTagName("svg")[0],
      inputValue = event.target.value - 1;

    for (let index in svg.children) {
      const child = svg.children[index];
      index = Number(index);
      if (child.nodeType == 1) {
        child.classList = this.getClassType(index, inputValue);
      }
    }
  }

  createBody() {
    const defaultValue = 10,
      rangeVisual = html`${this.createSlider(defaultValue)}`,
      rangeLine = html`${this.createLine(defaultValue)}`,
      rangeInput = html`<input min="1" max="100" step="1" value=${
        defaultValue
      } type="range" />`;

    rangeInput.oninput = this.input;
    return [rangeVisual, rangeInput];
  }
}

export default Component;
