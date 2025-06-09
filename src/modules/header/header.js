import '../../styles/header.css';
import { subscribeDeviceStatus } from '../../utils/getDeviceStatus.js';
import { openOverlay, hideOverlay } from '../../utils/useOverlay.js';
import headerMenuContent from './headerMobileMenuContent.js';

const header = document.querySelector('header');
// TODO: Add to nav scrolltohash
// TODO: Make nav elements get from const list
// TODO: Add active class to nav items on click (header-nav-item__active)
// TODO: Add on company logo click scroll to top
// TODO: Overlay stay when from mobile to desktop
// TODO: Fix overly when hide, menu icon is visible

const overlayContent = headerMenuContent([
  {
    title: 'Home',
    link: '#home',
  },
  {
    title: 'Featured Products',
    link: '#featured-products',
  },
  {
    title: 'Product Listing',
    link: '#product-listing',
  },
]);

function updateHeader({ isMobile, isTablet, isDesktop }) {
  header.classList.toggle('header-mobile', isMobile);
  header.classList.toggle('header-tablet', isTablet);
  header.classList.toggle('header-desktop', isDesktop);

  if (isMobile || isTablet) {
    header.innerHTML = `
     <div class="header-logo-container-extra-name">
        <div class="header-logo-container">
          <img src="/src/assets/icons/common/logo-bright.svg" alt="Logo" class="header-logo" />
          <span class="header-logo-container__name">Forma’sint.</span>
        </div>
      </div>
      <div class="header-menu-container">
        <img src="/src/assets/icons/header/menu-burger.svg" alt="burger menu icon" class="header-menu-burger-icon" />
        <span>MENU</span>
      </div>
      `;
  } else {
    header.innerHTML = `
      <div class="header-logo-container-extra-name">
        <div class="header-logo-container">
          <img src="/src/assets/icons/common/logo-bright.svg" alt="Logo" class="header-logo" />
          <span class="header-logo-container__name">Forma’sint.</span>
        </div>
        <span class="header-extra-name">IDOMODS &lt;/&gt;</span>
      </div>
      <nav class="header-nav">
        <ul class="header-nav-list">
          <li class="header-nav-item">HOME</li>
          <li class="header-nav-item">FEATURED PRODUCTS</li>
          <li class="header-nav-item">PRODUCT LISTING</li>
      </nav>
      <div class="header-user">
        <img src="/src/assets/icons/common/user.svg" alt="User Icon" class="header-user-icon" />
        <span>FRONTEND DEVELOPER</span>
      </div>
    `;
  }

  const burgerIcon = header.querySelector('.header-menu-burger-icon');
  burgerIcon?.addEventListener('click', () => {
    openOverlay(
      (content) => {
        content.innerHTML = overlayContent;
      },
      {
        size: '4/5',
        location: 'right',
      }
    );

    const closeBtn = document.querySelector('.header__close-container');
    closeBtn?.addEventListener('click', () => {
      hideOverlay();
    });
  });
}

subscribeDeviceStatus(updateHeader);
