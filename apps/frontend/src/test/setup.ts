import "@testing-library/jest-dom/vitest";

// jsdom gaps used by the app: smooth scrolling and modal dialogs.
Element.prototype.scrollIntoView = () => {};
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
};
