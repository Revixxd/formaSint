import '../../styles/products.css';
import getProducts from '../../utils/getProducts.js';
import { subscribeDeviceStatus } from '../../utils/getDeviceStatus.js';
import insertHeroProduct from './insertHeroProduct.js';
import { hideOverlay, openOverlay } from '../../utils/useOverlay.js';
import createProductOverlay from './productOverlay.js';

function updateProducts({ isMobile, isTablet, isDesktop }) {
  const productsSection = document.getElementById('products');

  createBase();

  const productList = document.querySelector('.products-list');
  const loader = document.querySelector('.products-loader');
  let perPage = 14;
  let perPageOptions = [14, 24, 36];
  let currentIndex = 0;

  loader.style.display = 'none';

  loadDropdown();
  loadProducts();

  // infinite scroll
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      loadProducts();
    }
  });

  productsSection.classList.toggle('products-mobile', isMobile);
  productsSection.classList.toggle('products-tablet', isTablet);
  productsSection.classList.toggle('products-desktop', isDesktop);

  function createBase() {
    productsSection.innerHTML = `
      <div class="products__dropdown"></div>
      <div class="products-list"></div>
      <div class="products-loader">Loading...</div>
    `;
  }

  function loadDropdown() {
    const productsDropdown = document.querySelector('.products__dropdown');

    productsDropdown.innerHTML = `
    <p>Number of products per page</p>
      <div class="dropdown">
        <div class="dropdown__select">
          ${perPage}
          <img src="/assets/icons/common/chevron.svg" alt="arrow down icon" class="dropdown__select__arrow-icon" />
        </div>
        <div class="dropdown__options">
          ${perPageOptions
            .map(
              (num, idx) => `
            <div class="dropdown__options__option ${num === perPage ? 'active' : ''}" data-number="${num}">
              <div class="option--number">
                ${num}
                ${
                  idx === 0
                    ? '<img src="/assets/icons/common/chevron.svg" alt="arrow down icon" class="arrow-icon" />'
                    : ''
                }
              </div>
              ${idx < perPageOptions.length - 1 ? '<span class="option--divider"></span>' : ''}
            </div>
          `
            )
            .join('')}
        </div>
      </div>
  `;

    const dropdown = document.querySelector('.dropdown');
    const options = document.querySelectorAll('.dropdown__options__option');

    dropdown.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });

    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        const dropdownOptionValue = parseInt(option.getAttribute('data-number'));
        updateProductsPerPage(dropdownOptionValue);

        dropdown.classList.remove('.open');
        loadDropdown();
      });
    });
  }

  function updateProductsPerPage(dropdownOptionValue) {
    perPage = dropdownOptionValue;

    const fromIndex = perPageOptions.indexOf(perPage);
    const toIndex = 0;

    if (fromIndex !== -1) {
      const [moved] = perPageOptions.splice(fromIndex, 1);
      perPageOptions.splice(toIndex, 0, moved);
    }

    const restSorted = perPageOptions.slice(1).sort((a, b) => a - b);

    perPageOptions = [perPageOptions[0], ...restSorted];
  }

  function generateProduct(product) {
    const div = document.createElement('div');
    div.classList.add('product-item');
    div.classList.add('product-element');
    div.product = product;
    div.innerHTML = `
      <span class="product-item__id">ID: ${product.id}</span>
      <div class="product-item__img-container">
        <img 
          src="${product.image}" 
          alt="Product ${product.id}" 
          loading="lazy"
        />
      </div>
    `;

    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        const product = event.currentTarget.product;
        openOverlay(
          (content) => {
            content.innerHTML = createProductOverlay(product);
          },
          {
            size: '1/2',
            location: 'center',
            extraClass: 'product-overlay',
            type: 'dialog',
          }
        );

        const closeBtn = document.querySelector('.product-overlay__top-container__close-container');
        closeBtn.addEventListener('click', () => {
          hideOverlay('dialog');
        });
      });
    });

    return div;
  }

  async function loadProducts() {
    loader.style.display = 'block';
    console.log('cur:', currentIndex);
    console.log('perpage:', perPage);
    console.log(currentIndex / perPage + 1);

    try {
      const data = await getProducts(currentIndex / perPage + 1, perPage);
      let oneHeroInserted = false;
      data.products.forEach((product, index) => {
        const productItem = generateProduct(product);
        productList.appendChild(productItem);
        let productRow = Math.floor((currentIndex + index) / 4) + 1;
        if ((index + 1) % 4 === 0 && !oneHeroInserted && productRow % 2 === 0) {
          oneHeroInserted = true;
          insertHeroProduct(productList, index);
        }
      });

      currentIndex += data.products.length;
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      isLoading = false;
      loader.style.display = 'none';
    }
  }
}

subscribeDeviceStatus(updateProducts);
