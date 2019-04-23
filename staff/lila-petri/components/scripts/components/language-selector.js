"use strict";

/**
 *
 * @param {HTMLElement} select
 * @param {Function} callback
 */

class LanguageSelector extends Component {
  constructor(select, callback) {
    super(select);
    this.onChange = callback;
  }
  set callback(callback) {
    this.container.addEventListener("change", (event)=> {
      callback(event.target.value);
    });
  }
}
