module.exports = {
  url: process.env.URL || "http://localhost:8080",
  environment: process.env.ELEVENTY_ENV,

  // Required in certain regions, like USA
  senderAddress: "123 Sesame Street, Alphabet, FL 12345",

  // Company, website, or personal name
  senderName: "11ty Rocks",

  senderWebsite: "https://11ty.rocks",

  // absolute, full URL
  logoUrl: "https://placehold.it/250x80?text=Logo",

  // in pixels, but no unit
  logoHeight: "80",

  logoAlt: "11ty Rocks!",

  // These values required for full
  ctaButtonHeight: "40px",
  ctaButtonWidth: "200px",
  ctaButtonColor: "#c54dbd",

  // Required link to method of unsubscribing from non-transactional emails
  unsubscribe: "#",
};
