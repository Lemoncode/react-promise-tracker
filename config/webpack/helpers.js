const path = require('path');

// String helpers
const capitalizeString = s => s.charAt(0).toUpperCase() + s.slice(1);
const camelCaseString = dashedName => dashedName.split("-").map(
  (s, i) => i > 0 ? capitalizeString(s) : s
).join("");

// Name helpers
const packageName = process.env.npm_package_name;
const packageNameCamelCase = camelCaseString(packageName);
const version = JSON.stringify(process.env.npm_package_version).replace(/"/g, '');
const getBundleFileName = min => `${packageName}-${version}${min ? ".min" : ''}.js`;

// Path helpers
const rootPath = path.resolve(__dirname, "../..");
const resolveFromRootPath = (...args) => path.join(rootPath, ...args);

// Export constants
exports.srcPath = resolveFromRootPath("src");
exports.buildPath = resolveFromRootPath("build",);
exports.distPath = resolveFromRootPath("build", "dist");
exports.version = version;
exports.packageNameCamelCase = packageNameCamelCase;
exports.getBundleFileName = getBundleFileName;
