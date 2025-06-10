/**
 * Creates an overlay element that is hidden off-screen.
 */
function createOverlay() {
  const root = document.documentElement;
  const app = document.getElementById('app');
  const overlay = document.createElement('div');
  const overlayContent = document.createElement('div');
  const mainBgColor = getComputedStyle(root).getPropertyValue('--main-bg-color');

  overlay.id = 'custom-overlay';
  overlay.style.position = 'fixed';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';
  overlay.style.background = 'rgba(0, 0, 0, 0.5)';
  overlay.style.transition = 'opacity .8s ease-in-out,visibility .8s ease-in-out';

  overlayContent.id = 'custom-overlay__content';
  overlayContent.style.position = 'fixed';
  overlayContent.style.transform = 'translateX(100vw)';
  overlayContent.style.transition = 'transform .8s ease-in-out';
  overlayContent.style.background = mainBgColor;
  overlayContent.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';

  app.appendChild(overlay);
  overlay.appendChild(overlayContent);

  return;
}

/**
 * Opens an overlay with customizable size and a callback.
 * @param {Function} callback - Function to call after overlay opens.
 * @param {'full' | '1/2' | '3/4' | '4/5'} size - Overlay size: 'full' (100%), 'half' (50%), 'three-quarters' (75%), or '4/5' (80%).
 */

function openOverlay(callback, { size = 'full', location = 'center', extraClass } = {}) {
  const overlay = document.getElementById('custom-overlay');

  overlay.style.position = 'fixed';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = 10000;
  overlay.style.visibility = 'visible';
  overlay.style.opacity = '1';
  overlay.style.top = '0';

  const content = document.getElementById('custom-overlay__content');
  let width, height, maxWidth;

  switch (size) {
    case '1/2':
      width = '90vw';
      height = '50vh';
      maxWidth = '620px';
      break;
    case '3/4':
      width = '75vw';
      height = '100vh';
      break;
    case '4/5':
      width = '80vw';
      height = '100vh';
      content.style.transform = 'translateX(13vw)';
      break;
    case 'full':
    default:
      width = '100vw';
      height = '100vh';
      break;
  }

  content.style.width = width;
  content.style.height = height;
  content.style.marginLeft = location ? getPosition(location) : null;

  if (maxWidth) {
    content.style.maxWidth = maxWidth;
  }

  if (extraClass && typeof extraClass === 'string') {
    content.classList.add(extraClass);
  }

  if (typeof callback === 'function') {
    callback(content, overlay);
  }

  function getPosition(location) {
    switch (location) {
      case 'right':
        content.style.marginLeft = 'auto';
        content.style.marginRight = '0';
        break;
      case 'left':
        content.style.marginLeft = '0';
        content.style.marginRight = 'auto';
        break;
      case 'center':
      default:
        content.style.marginLeft = '0';
        content.style.marginRight = '0';
        break;
    }
  }
}

/**
 * hide an overlay
 */

function hideOverlay() {
  const overlay = document.getElementById('custom-overlay');
  const content = document.getElementById('custom-overlay__content');

  if (overlay) {
    content.style.transform = 'translateX(100vw)';
    overlay.style.visibility = 'hide';
    overlay.style.opacity = '0';

    setTimeout(() => {
      overlay.style.zIndex = '-1';
    }, 1000);
  }
}

export { createOverlay, hideOverlay, openOverlay };
