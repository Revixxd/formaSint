/**
 * Converts a string to kebab-case.
 * Examples:
 *   toKebabCase('helloWorld') => 'hello-world'
 *   toKebabCase('Hello World') => 'hello-world'
 *   toKebabCase('hello_world') => 'hello-world'
 *
 * @param {string} str - The string to convert.
 * @returns {string} The kebab-cased string.
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export default toKebabCase;
