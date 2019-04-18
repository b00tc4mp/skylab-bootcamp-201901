"use strict";

class LanguageSelector extends Component {
  constructor(select, onChange) {
    super(select);
    this.onChange = onChange;
  }

  set onChange(callback) {
    this.container.addEventListener("change", event => {
      callback(event.target.value);
    });
  }
}

// /**
//  *
//  * @param {HTMLElement} select
//  * @param {Function} callback
//  */
// function LanguageSelector(select, callback) {
//     Component.call(this, select);

//     this.onChange = callback;
// }

// LanguageSelector.prototype = Object.create(Component.prototype);
// LanguageSelector.prototype.constructor = LanguageSelector;

// Object.defineProperty(LanguageSelector.prototype, 'onChange', {
//     set: function (callback) {
//         this.container.addEventListener('change', function (event) {
//             callback(event.target.value);
//         });
//     }
// });
