"use strict";

class List extends Component {
  constructor({ container, itemComponentConstructor, onSelect }) {
    super(container);
    this.__items__ = null;
    this.__itemComponentConstructor__ = itemComponentConstructor;
    this.__onSelect__ = onSelect;
    this.refresh();
  }

  refresh() {
    if (!this.__items__ || this.__items__.length === 0) {
      this.container.innerHTML = "<p>No items to list</p>";
      return;
    }
    this.container.innerHTML = "";
    this.__items__.forEach(item => {
      new this.__itemComponentConstructor__({
        container: this.container,
        duck: item,
        onSelect: this.__onSelect__
       });
    });
  }

  set items(items) {
    this.__items__ = items;
    this.refresh();
  }
}
