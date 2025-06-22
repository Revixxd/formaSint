/**
 * Determines the current device type (mobile, tablet, desktop) based on window width.
 *
 * @param {number} [defaultWidth=1024] - Default width if window is undefined.
 * @returns {Object} - { isMobile, isTablet, isDesktop }.
 *
 * Example:
 * import { subscribeDeviceStatus } from './getDeviceStatus';
 * const unsubscribe = subscribeDeviceStatus((status) => console.log(status));
 * unsubscribe();
 */

let listeners = [];
let prevStatus = {};

function getDeviceStatus() {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;

  return {
    isMobile: width <= 767,
    isTablet: width > 767 && width <= 1024,
    isDesktop: width > 1024,
  };
}

function notifyListeners() {
  const status = getDeviceStatus();

  if (
    prevStatus.isMobile !== status.isMobile ||
    prevStatus.isTablet !== status.isTablet ||
    prevStatus.isDesktop !== status.isDesktop
  ) {
    prevStatus = status;
    listeners.forEach((callback) => callback(status));
  }
}

function subscribeDeviceStatus(callback) {
  listeners.push(callback);

  const initialStatus = getDeviceStatus();
  prevStatus = initialStatus;
  callback(initialStatus);

  if (listeners.length === 1 && typeof window !== 'undefined') {
    window.addEventListener('resize', notifyListeners);
  }

  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
    if (listeners.length === 0 && typeof window !== 'undefined') {
      window.removeEventListener('resize', notifyListeners);
    }
  };
}

export default getDeviceStatus;
export { subscribeDeviceStatus };
