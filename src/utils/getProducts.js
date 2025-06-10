/**
 * Retrieves a paginated list of products and adds random fields to each product as specified.
 *
 * @async
 * @function
 * @param {number} [pageNumber=1] - The page number to retrieve.
 * @param {number} [pageSize=10] - The number of products per page.
 * @param {Object} [random={ label: false, price: false }] - Flags indicating which fields to randomize.
 * @param {boolean} [random.label=false] - Whether to randomize the product label.
 * @param {boolean} [random.price=false] - Whether to randomize the product price.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of products with optional random fields.
 *
 * @example
 * Get the first page of 5 products with random labels
 * const products = await getProductsWithRandom(1, 5, { label: true });
 * console.log(products);
 * Output: [{ id: 1, label: 'RandomLabel', price: 10 }, ...]
 */
async function getProducts(pageNumber = 1, pageSize = 10) {
  const url = new URL('https://brandstestowy.smallhost.pl/api/random');
  url.searchParams.append('pageNumber', pageNumber);
  url.searchParams.append('pageSize', pageSize);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return {
    products: data.data,
    totalPages: data.totalPages,
    currentPage: data.currentPage,
  };
}

/**
 * Adds random fields to each product in the provided array based on the specified flags.
 *
 * @function
 * @param {Array<Object>} products - The array of product objects to modify.
 * @param {Object} [random={ label: false, price: false }] - Flags indicating which fields to randomize.
 * @param {boolean} [random.label=false] - Whether to randomize the product label (e.g., 'bestseller', 'limited edition', or null).
 * @param {boolean} [random.price=false] - Whether to randomize the product price (random integer between 10 and 300).
 * @returns {Array<Object>} The array of products with optional random fields added or modified.
 *
 * @example
 * Add random labels and prices to products
 * const updatedProducts = addRandomFields(products, { label: true, price: true });
 * console.log(updatedProducts);
 * Output: [{ id: 1, label: 'bestseller', price: 123 }, ...]
 */
import addRandomFields from '../helpers/addRandomFields.js';
async function getProductsWithRandom(
  pageNumber = 1,
  pageSize = 10,
  random = { label: false, price: false, name: false }
) {
  const data = await getProducts(pageNumber, pageSize);

  return addRandomFields(data.products, random);
}

export { getProductsWithRandom };
export default getProducts;
