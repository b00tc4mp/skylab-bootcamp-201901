"use strict";

class Component {
  constructor (container) {
    this.container = container;
  }

  getChild (classname) {
    if (classname[0] === ".") {
      const col = this.container.getElementsByClassName(classname.slice(1));
      if (col.length !== 1) return col;
      else return col[0];
    }
  }
  
  set visible(visible) { this.container.style.display = visible ? "" : "none"; }

}
