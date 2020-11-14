const juice = require("juice");
const meta = require("./src/_data/meta");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");

  eleventyConfig.setWatchThrottleWaitTime(100);

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addNunjucksAsyncFilter("emailHtml", (raw, callback) => {
    if (meta.environment === "prod") {
      callback(null, juice(raw));
    } else {
      callback(null, raw);
    }
  });

  eleventyConfig.addShortcode(
    "emailSpacer",
    (size = "") =>
      `<tr><td class="spacer${size ? `-${size}` : ""}">&#32;</td></tr>`
  );

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
