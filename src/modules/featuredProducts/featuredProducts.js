import '../../styles/featuredProducts.css';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Swiper from 'swiper';
import { Scrollbar, Navigation } from 'swiper/modules';
import { getProductsWithRandom } from '../../utils/getProducts.js';
import toKebabCase from '../../helpers/toKebabCase.js';
import { openOverlay, hideOverlay } from '../../utils/useOverlay.js';
import createProductOverlay from '../products/productOverlay.js';

let localProducts = [];
const featuredProductsContainer = document.getElementById('featured-products');

async function initializeProducts() {
  try {
    const products = await getProductsWithRandom(1, 10, { label: true, price: true, name: true });
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('No products found');
    }
    localProducts = products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function renderFeaturedProducts() {
  const productItems = localProducts
    .map(
      (product) => `
      <div class="swiper-slide">
        <div class="featured-products__item">
          <div class="featured-products__item--img-container">
            <div class="featured-products__top-info">
              <span class="featured-products--label ${toKebabCase(`label-${product.label}`)}">
                ${product.label ? product.label.toUpperCase() : ''}
              </span>
              <img 
                class="featured-products--fav" 
                src="/assets/icons/common/heart.svg" 
                alt="Add to favorites" 
              >
            </div>
            <img 
              data-product-id="${product.id}" 
              class="featured-products--img" 
              src="${product.image}"
              alt="${product.name}"
              loading="lazy" 
            >
          </div>
          <div class="featured-products__item-description">
            <h3 class="featured-products--name">Grey alpine climbing jacket</h3>
            <p class="featured-products--price">€${product.price} EUR</p>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  featuredProductsContainer.innerHTML = `
    <div class="featured-products__header">
      <p>Featured Products</p>
      <h2>Browse featured</h2>
    </div>
    <div class="featured-products__swiper">
      <div class="swiper-wrapper">
        ${productItems}
      </div>
        <div class="swiper-button swiper-button-next">
          <img src="/assets/icons/common/arrow-right.svg" alt="Next slide" loading="lazy">  
        </div>
        <div class="swiper-button swiper-button-prev">
          <img src="/assets/icons/common/arrow-right.svg" alt="Next slide" loading="lazy">  
        </div>
      <div class="swiper-scrollbar"></div>
    </div>
  `;
}

function initFeaturedProducts() {
  initializeProducts()
    .then(() => {
      renderFeaturedProducts();
      // TODO: add swiper initialization to other function
      // TODO: Fix on mobile buttons position
      const swiper = new Swiper('.featured-products__swiper', {
        modules: [Scrollbar, Navigation],
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
          draggable: true,
          snapOnRelease: true,
          dragSize: 'auto',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
      });
      swiper.update();
      const productItems = document.querySelectorAll('.featured-products--img');
      productItems.forEach((item) => {
        item.addEventListener('click', (event) => {
          const productId = event.currentTarget.getAttribute('data-product-id');
          const product = localProducts.find((p) => p.id === parseInt(productId, 10));
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
    })
    .catch((error) => {
      console.error('Error initializing featured products:', error);
    });
}

initFeaturedProducts();
