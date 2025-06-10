import '../../styles/header.css';
import { subscribeDeviceStatus } from '../../utils/getDeviceStatus.js';
import { openOverlay, hideOverlay } from '../../utils/useOverlay.js';
import headerMenuContent from './headerMobileMenuContent.js';
import scrollToSection from '../../helpers/scrollTo.js';
import { createOverlay } from '../../utils/useOverlay.js';

const header = document.querySelector('header');
// TODO: Overlay stay when from mobile to desktop
// TODO: Fix overly when hide, menu icon is visible
// TODO: Logo on hover should be animated

const sections = [
  { title: 'Home', target: '#hero' },
  { title: 'Featured Products', target: '#featured-products' },
  { title: 'Product Listing', target: '#products' },
];
const overlayContent = headerMenuContent(sections);

function updateHeader({ isMobile, isTablet, isDesktop }) {
  header.classList.toggle('header-mobile', isMobile);
  header.classList.toggle('header-tablet', isTablet);
  header.classList.toggle('header-desktop', isDesktop);

  if (isMobile || isTablet) {
    header.innerHTML = `
     <div class="header-logo-container-extra-name">
        <div class="header-logo-container">
          <img src="/assets//icons/common/logo-bright.svg" alt="Logo" class="header-logo" />
          <span class="header-logo-container__name">Forma’sint.</span>
        </div>
      </div>
      <div class="header-menu-container">
        <img src="/assets//icons/header/menu-burger.svg" alt="burger menu icon" class="header-menu-burger-icon" />
        <span>MENU</span>
      </div>
      `;
  } else {
    header.innerHTML = `
      <div class="header-logo-container-extra-name">
        <div class="header-logo-container">
          <img src="/assets//icons/common/logo-bright.svg" alt="Logo" class="header-logo" />
          <span class="header-logo-container__name">Forma’sint.</span>
        </div>
        <span class="header-extra-name">IDOMODS &lt;/&gt;</span>
      </div>
      <nav class="header-nav">
        <ul class="header-nav-list">
          ${sections
            .map(
              (section) =>
                `<li class="header-nav-item" data-target="${section.target}">${section.title.toUpperCase()}</li>`
            )
            .join('')}
      </nav>
      <div class="header-user">
        <img src="/assets//icons/common/user.svg" alt="User Icon" class="header-user-icon" />
        <span>FRONTEND DEVELOPER</span>
      </div>
    `;
  }

  function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.header-nav-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetElement = document.getElementById(entry.target.getAttribute('id'));
            navItems.forEach((item) => {
              if (item.getAttribute('data-target') === `#${targetElement.id}`) {
                item.classList.add('header-nav-item__active');
              } else {
                item.classList.remove('header-nav-item__active');
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const headerMenuContainer = header.querySelector('.header-menu-container');
  if (headerMenuContainer) {
    headerMenuContainer.addEventListener('click', () => {
      openOverlay(
        (content) => {
          content.innerHTML = overlayContent;
        },
        {
          size: '4/5',
          location: 'right',
          type: 'menu',
        }
      );

      const closeBtn = document.querySelector('.header__close-container');
      closeBtn.addEventListener('click', () => {
        hideOverlay('menu');
      });

      const overlayNavItems = document.querySelectorAll('.nav__list--item');
      overlayNavItems.forEach((item) => {
        item.addEventListener('click', (e) => {
          const link = e.currentTarget.getAttribute('data-target');
          hideOverlay();
          setTimeout(() => {
            scrollToSection(link, { offset: -56 });
          }, 600);
        });
      });
    });
  }

  const navItems = document.querySelectorAll('.header-nav-item');
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const link = e.currentTarget.getAttribute('data-target');
      scrollToSection(link, { offset: -56 });
    });
  });

  highlightActiveSection();
}

subscribeDeviceStatus(updateHeader);
