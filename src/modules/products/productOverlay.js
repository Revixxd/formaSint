function createProductOverlay(product) {
  const content = `
    <div class="product-overlay__top-container">
      <span class="product-overlay__top-container--id">ID: ${product.id}</span>
      <div class="product-overlay__top-container__close-container"> 
        <img 
          src="/assets/icons/common/close.svg" 
          alt="Close" class="product-overlay__close-icon" 
          loading="lazy"
          />
        <span class="product-overlay__top-container__close-container--close" aria-label="Close menu">CLOSE</span>
      </div>
    </div>
    <div class="product-overlay__content">
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="product-overlay__image" 
        loading="lazy"
        />
    </div>
  `;

  return content;
}

export default createProductOverlay;
