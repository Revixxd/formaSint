import '../../styles/products.css';
import getProducts from '../../utils/getProducts.js';

const hero = document.querySelector('.products');

hero.innerHTML = `
  <div class="products__select-container">
    <p>Number of products per page</p>
    <select id="per-page">
      <option value="14">14</option>
      <option value="24">24</option>
      <option value="36">36</option>
    </select>
  </div>
  <div class="products-list"></div>
  <div id="loader" style="display: none;">Loading...</div>
`;

const productList = document.querySelector('.products-list');
const perPageSelect = document.getElementById('per-page');
const loader = document.getElementById('loader');

let perPage = parseInt(perPageSelect.value, 14);
let currentIndex = 0;
let isLoading = false;

function generateProduct(product) {
  const div = document.createElement('div');
  div.classList.add('product-item');

  div.innerHTML = `
      <span class="product-item__id">ID: ${product.id}</span>
      <div class="product-item__img-container">
        <img src="${product.image}" alt="${product.name}" />
      </div>
    `;

  return div;
}

async function loadProducts() {
  if (isLoading) return;
  isLoading = true;
  loader.style.display = 'block';

  try {
    const data = await getProducts(currentIndex / perPage + 1, perPage);
    data.products.forEach((product) => {
      const productItem = generateProduct(product);
      productList.appendChild(productItem);
    });

    currentIndex += data.products.length;
  } catch (error) {
    console.error('Error loading products:', error);
  } finally {
    isLoading = false;
    loader.style.display = 'none';
  }
}

perPageSelect.addEventListener('change', () => {
  perPage = parseInt(perPageSelect.value, 10);
  productList.innerHTML = '';
  currentIndex = 0;
  loadProducts();
});

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    loadProducts();
  }
});

loadProducts();
