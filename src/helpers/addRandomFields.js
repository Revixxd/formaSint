/**
 * Adds random fields to each product in the given array based on the specified options.
 *
 * @param {Array<Object>} products - The array of product objects to modify.
 * @param {Object} [random={ label: false, price: false }] - Options to determine which fields to randomize.
 * @param {boolean} [random.label=false] - If true, assigns a random label ('bestseller', 'limited edition', or null) to each product.
 * @param {boolean} [random.price=false] - If true, assigns a random price between 10 and 300 (inclusive) to each product.
 * @returns {Array<Object>} A new array of products with the specified random fields added or modified.
 */
function addRandomFields(products, random = { label: false, price: false, name: false }) {
  return products.map((product) => {
    const newProduct = { ...product };
    if (random.label) {
      const labels = ['bestseller', 'limited edition', null];
      newProduct.label = labels[Math.floor(Math.random() * labels.length)];
    }
    if (random.price) {
      newProduct.price = Math.floor(Math.random() * (300 - 10 + 1)) + 10;
    }
    if (random.name) {
      newProduct.name = `Product ${Math.floor(Math.random() * 1000)}`;
    }
    return newProduct;
  });
}

export default addRandomFields;
