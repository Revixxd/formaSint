import './styles/overlay.css';
import { createOverlay } from './utils/useOverlay.js';
import preloadImg from './utils/preloadImg.js';

const images = [
  {
    link: '/assets/hero/hero-img.webp',
    priority: 'high',
  },
  {
    link: '/assets/hero/hero-img-tablet.webp',
    priority: 'high',
  },
  {
    link: '/assets/hero/hero-img-desktop.webp',
    priority: 'high',
  },
  {
    link: '/assets/icons/common/logo-bright.svg',
    priority: 'low',
  },
  {
    link: '/assets/icons/common/user.svg',
    priority: 'low',
  },
  {
    link: '/assets/icons/header/menu-burger.svg',
    priority: 'low',
  },
  {
    link: '/assets/icons/common/heart.svg',
    priority: 'low',
  },
];

createOverlay('dialog');
createOverlay('menu');

images.forEach((image) => {
  preloadImg(image);
});
