import html from "dom-template-strings";

class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const body = this.createBody();
    body.forEach(item => {
      this.appendChild(item);
    });
  }

  createSlider(value = 10) {
    let columns = [];
    let x = 5,
      x2 = 25;

    for (let i = 0; i < 100; i++) {
      const coneHeight = [302, 498];
      const className = value > i ? "range-lower" : "range-higher";
      const column = `<path class=${className} d="M${x} ${coneHeight[0]}L${x2} ${
        coneHeight[0]
      }L${x2} ${coneHeight[1]}L${x} ${coneHeight[1]}L${x} 302Z" ></path>`;
      x += 30;
      x2 += 30;
      columns.push(column);
    }

    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMinYMax slice" viewBox="0 0 3200 600" width="500" height="80">
              ${columns.map(col => col).join(" ")};
            </svg>`;
  }

  input(event) {
    console.log(this.children);
  }

  createBody() {
    const defaultValue = 10;
    const illustration = html`${this.createSlider(defaultValue)}`;
    const rangeInput = html`<input min="1" max="100" step="1" value=${defaultValue} type="range" />`;
    rangeInput.oninput = this.input;
    return [illustration, rangeInput];
  }
}

export default Component;
