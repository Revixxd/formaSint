/**
 * Smoothly scrolls to the element with the given selector or DOM node.
 * @param {string|Element} target - CSS selector or DOM element to scroll to.
 * @param {Object} [options] - Optional scroll options.
 * @param {number} [options.offset=0] - Offset in pixels from the top.
 */
function scrollToSection(target, options = {}) {
  const offset = options.offset || 0;
  let element = typeof target === 'string' ? document.querySelector(target) : target;

  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  } else {
    console.error(`Element not found for selector: ${target}`);
  }
}

export default scrollToSection;
