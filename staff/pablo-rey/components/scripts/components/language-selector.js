"use strict";
class LanguageSelector extends Component {
  constructor({ container, onChange }) {
    super(container);
    this.onChange = onChange;
  }

  set onChange(callback) {
    this.container.addEventListener("change", event => {
      callback(event.target.value);
    });
  }
}
