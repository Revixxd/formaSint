import '../../styles/header.css';

function headerMobileMenuContent(list) {
  const menu = `
    <div class="header-mobile-menu-content">
      <div class="header-mobile-menu-content__header">
        <img src="/assets//icons/common/logo-bright.svg" alt="Logo" class="header__logo" />
        <button class="header__close-container">
          <img src="/assets/icons/common/close.svg" alt="Close menu icon" class="header__close-container__icon" />
          <span class="header__close-container__text" aria-label="Close menu">CLOSE</span>
        </button>
      </div>
      <nav>
        <ul class="nav__list">
        ${list
          .map(
            (item) => `
          <li class="nav__list--item" data-target="${item.target}">
            ${item.title}
          </li>
        `
          )
          .join('')}
      </ul>
      </nav>
    </div>
  `;

  return menu;
}

export default headerMobileMenuContent;
