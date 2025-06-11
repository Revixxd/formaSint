function preloadImg(path) {
  const linkElement = document.createElement('link');

  linkElement.rel = 'preload';
  linkElement.as = 'image';
  linkElement.fetchPriority = path.priority || 'auto';
  linkElement.href = path.link;

  document.head.appendChild(linkElement);
}

export default preloadImg;
