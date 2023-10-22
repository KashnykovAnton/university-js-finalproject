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
  instance = basicLightbox.create(
    createHtml(e.target.dataset.source, e.target.alt),
    options
  );
  instance.show();
}

function createHtml(original, description) {
  return ` 
  <div class="modal"> 
    <img src="${original}" alt="${description}" /> 
  </div> 
`;
}

const options = {
  onShow: (instance) => {
    window.addEventListener("keydown", onEscKeyPress);
  },
  onClose: (instance) => {
    window.removeEventListener("keydown", onEscKeyPress);
  },
};

function onEscKeyPress(e) {
  if (e.code === "Escape") {
    instance.close();
  }
}
