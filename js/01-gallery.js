import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");

const createItemEl = (acc, { preview, original, description }) =>
  acc +
  `<li class = 'gallery__item'><a class = 'gallery__link' href = ${original}><img class = 'gallery__image' src = ${preview} data-source = ${original} alt = ${description}/></a></li>`;

const createItemsList = galleryItems.reduce(createItemEl, "");

galleryRef.insertAdjacentHTML("beforeend", createItemsList);

galleryRef.addEventListener("click", onGalleryClick);

let instance;

function onGalleryClick(e) {
  e.preventDefault();
  if (e.currentTarget === e.target) {
    return;
  }
  window.addEventListener("keydown", onEscKeyPress);
  createModal(e.target.dataset.source, e.target.alt);
  instance.show();
}

function createModal(original, description) {
  instance = basicLightbox.create(`
  <div class="modal">
    <img src="${original}" alt="${description}" />
  </div>
`);
}

function onEscKeyPress(e) {
  if (e.code === "Escape") {
    onModalClose();
  }
}

function onModalClose() {
  window.removeEventListener("keydown", onEscKeyPress);
  instance.close();
}
