class EventEmmitter {
  constructor() {
    this.events = {};
  }

  on(name, fnc) {
    if (!this.events[name]) {
      this.events[name] = new Array();
    } else {
      this.events[name].push(fnc);
    }
  }

  emit(name, data) {
    if (this.events[name]) {
      this.events[name].forEach(callFunc => {
        callFunc.bind(this, data);
      });
    } else {
      console.log(`Emmiter ${name} not found`);
    }
  }
}


export default new EventEmmitter();
