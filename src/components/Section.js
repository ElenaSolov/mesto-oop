export default class Section {
  
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  
  
  render(item) {
     return this._renderer(item);
  }
  
  addItem(el, append) {
    append
      ? this._container.append(el)
      : this._container.prepend(el);
    }
}