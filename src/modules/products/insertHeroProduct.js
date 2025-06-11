function insertHeroProduct(container, index) {
  const existingHeroProduct = container.querySelector('.product-hero');
  if (existingHeroProduct) {
    existingHeroProduct.remove();
  }

  const heroProduct = document.createElement('div');

  heroProduct.classList.add('product-hero');
  heroProduct.classList.add('product-element');

  heroProduct.innerHTML = `
    <div class="product-hero__content">
      <div class="product-hero__content__up-container">
        <p>Forma’sint.</p>
        <h2>You'll look and feel like the champion.</h2>
      </div>
      <div class="product-hero__content__down-container">
        <button class="btn btn--primary">
          Check this out
          <img 
            src="/assets/icons/common/chevron-right.svg" 
            alt="Arrow right icon" 
            class="product-hero__content__down-container__icon"
            loading="lazy"
            />
        </button>
      </div>
    </div>
    <div class="hero-product__image-container">
      <img 
        src="https://placehold.co/1350x500" 
        alt="Hero Product Image"
        loading="lazy" 
        />
    </div>
  `;

  if (window.innerWidth >= 1024) {
    heroProduct.style.gridColumn = '2 / span 2';
    heroProduct.style.gridRow = `${Math.floor(index / 4) + 1}`;
  } else {
    heroProduct.style.gridColumn = '1 / span 2';
    // TODO: Adjust for mobile layout -> bigger hero product (2-3 rows)
    heroProduct.style.gridRow = `${Math.floor(index / 4) * 2 + 1} / span 3`;
  }

  container.appendChild(heroProduct);
}

export default insertHeroProduct;
