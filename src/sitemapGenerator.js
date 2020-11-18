const es2015 = require('babel-preset-es2015');
const presetReact = require('babel-preset-react');
require("babel-register")({
  presets: [es2015, presetReact]
});

const router = require("./sitemapRouter").default;
const Sitemap = require("react-router-sitemap").default;

function sitemapGenerator() {
  return (
  new Sitemap(router())
  .build("https://www.5sungbds.com")
  .save("../public/sitemap.xml")
  );
}

sitemapGenerator();