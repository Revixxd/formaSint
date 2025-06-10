function getImagePath(path) {
  return new URL(`../assets/${path}`, import.meta.url).href;
}

export default getImagePath;
