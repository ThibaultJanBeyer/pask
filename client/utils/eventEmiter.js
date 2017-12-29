class EventEmmitter {
  constructor() {
    this.events = {};
  }

  on(name, fnc) {
    if (!this.events[name]) {
      this.events[name] = new Array();
      this.events[name].push(fnc);
    } else {
      this.events[name].push(fnc);
    }
  }

  destroy(name) {
    if (this.events[name]) {
      delete this.events[name];
    }
  }

  emit(name, data) {
    if (this.events[name]) {
      this.events[name].forEach(callFunc => {
        callFunc.call(this, data);
      });
    } else {
      console.log(`Emit reciever for ${name} not found!`);
    }
  }
}

export default new EventEmmitter();
