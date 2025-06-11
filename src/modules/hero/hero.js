import '../../styles/hero.css';
import { subscribeDeviceStatus } from '../../utils/getDeviceStatus.js';

// TODO: Make h1 more figma designed

const hero = document.getElementById('hero');

function updateHero({ isMobile, isTablet, isDesktop }) {
  hero.classList.toggle('hero-mobile', isMobile);
  hero.classList.toggle('hero-tablet', isTablet);
  hero.classList.toggle('hero-desktop', isDesktop);

  hero.innerHTML = `
    <h1 class="hero-title">Forma’sint.</h1>
    <img src="/assets/hero/hero-img.webp" 
      alt="Hero Image" 
      class="hero-image"
      width="1836"
      height="732"
    />
  `;
}

subscribeDeviceStatus(updateHero);
