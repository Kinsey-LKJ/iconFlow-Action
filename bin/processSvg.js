const { optimize } = require('svgo');
const cheerio = require('cheerio');

/**
 * Convert string to CamelCase.
 * @param {string} str - A string.
 * @returns {string}
 */
function CamelCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
}

/**
 * Optimize SVG with `svgo`.
 * @param {string} svg - An SVG string.
 * @returns {Promise<string>}
 */
async function optimizeSvg(svg) {
  const result = await optimize(svg, {
    // all config fields are also available here
    plugins: [
      { name: 'convertShapeToPath', active: false },
      { name: 'mergePaths', active: false },
      { name: 'removeAttrs', params: { attrs: '(fill|stroke.*)' } },
      { name: 'removeTitle', active: true },
    ],
    multipass: true,
  });

  return result.data;
}


/**
 * remove SVG element.
 * @param {string} svg - An SVG string.
 * @returns {string}
 */
function removeSVGElement(svg) {
  const $ = cheerio.load(svg);
  return $('body').children().html();
}

/**
 * Process SVG string.
 * @param {string} svg - An SVG string.
 * @param {Promise<string>}
 */
async function processSvg(svg) {
  const optimized = await optimizeSvg(svg);
  const svgWithoutSemicolon = optimized.replace(/;/g, '');
  const svgWithoutSVGElement = removeSVGElement(svgWithoutSemicolon);
  const camelCasedAttributes = svgWithoutSVGElement.replace(/([a-z]+)-([a-z]+)=/g, (_, a, b) => `${a}${CamelCase(b)}=`);
  
  return camelCasedAttributes;
}

module.exports = processSvg;
