export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById('modal-template');
  }

  show() {
    if ('content' in document.createElement('template')) {
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalElement = modalElements.querySelector('.modal');
      this.backdropElement = modalElements.querySelector('.backdrop');
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      // fallback code
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement); // this.modalElement.remove()
      document.body.removeChild(this.backdropElement);
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}



// let backdrop;
// let fallbackText;
// let contentTemplate;
// const modalTemplate = document.getElementById('modal-template');
// const isLegacyBrowser = !document.createElement('template').content;
 
// export function config(contentId, message) {
//   contentTemplate = document.getElementById(contentId);
//   fallbackText = message;
// }
 
// export function show() {
//   if (isLegacyBrowser) {
//     alert(fallbackText);
//   } else {
//     backdrop = clone(modalTemplate).querySelector('.backdrop');
//     backdrop.firstElementChild.append(clone(contentTemplate));
//     document.body.append(backdrop);
//   }
// };
 
// export function hide() {
//   if (backdrop) {
//     backdrop.remove();    
//     backdrop = null;
//   }
// };
 
// function clone(template) {
//   return template.content.cloneNode(true);
// }  