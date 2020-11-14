# 11ty Email Generator

> Generate simple, responsive email templates, with inlined CSS on build.

Create branded emails with ease by writing the content in Markdown.

This generator is setup to use Sass by default, but you may use vanilla CSS. The benefit of Sass is ease of re-theming of the default template by changing a handful of variables, detailed below.

Skip to the **[Email Terminology and Tips](#email-terminology-and-tips)**

## Getting Started

1. You may choose to Fork or "Use this template" to create a copy of this email generator.
1. Update the meta data found in `_data/meta.js` to your company/personal info and brand details.
1. Run `npm install`
1. Run `npm start` for the development build - _this will not inline styles_
1. Copy/update the draft email located in `src/emails/thanks.md` ([more info below](#creating-new-emails))
1. Adjust the theme in use in `src/sass/emails.scss` ([more info below](#customizing-the-theme))
1. Run `npm run build` to create a send-ready build with inlined styles
1. Load up the HTML produced by the build in `public/emails/[email-file-name]` into your sending platform of choice or use in automated email workflows
1. Send yourself a test email using a tool such as [Putsmail](https://putsmail.com/tests/new), and optionally check it via more comprehensive (paid) tools like [Email on Acid](https://www.emailonacid.com/) or [Litmus](https://www.litmus.com/), or by sending from within yor email service provider

## Development Scripts

**`npm start`**

> Run 11ty with hot reload at localhost:8080, including reload based on Sass changes

**`npm run build`**

> Production build includes inlining and autoprefixing of CSS

## Creating New Emails

A starter email showing all available frontmatter keys is included in `src/emails/thanks.md`.

These keys are used to compose an email within the layout of `src/_includes/email`. All emails will automatically use this layout by default due to it being defined in the directory data file. If you create alternate layouts, you can add the `layout` frontmatter key to override this default.

The body of the Markdown file will be used as the main email content. You may also create your emails as one of the other [template languages](https://www.11ty.dev/docs/languages/) supported by 11ty.

New emails will be added to the site index, which is a convenience for quickly jumping to the email during development.

### Frontmatter Keys

Keys marked as optional mean that excluding them will remove that section of the rendered email, making the base template flexible for various use cases.

Review the **[Email Terminology and Tips](#email-terminology-and-tips)** for help on deciding when to use these keys.

| Key           | Description                                                                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subject       | Intended to be the sending subject line, also is included as the `<title>`                                                                                                                     |
| preheader     | _Optional_ - refers to the bit of content that appears _first_ in the email body, and therefore ends up appearing after the subject line in most email clients                                 |
| hidePreheader | Set to `true` to add CSS to visually hide the preheader, while keeping it available to show in email clients                                                                                   |
| heroImg       | _Optional_ - a full, absolute URL to an image that is 600px wide by any height. Exclude to prevent showing a hero image. Appears below the logo and before the main email content if included. |
| heroImgHeight | _Optional_ - Define if including `heroImg`                                                                                                                                                     |
| headline      | _Optional but encouraged_ - Will be used as the `h1` beginning the email content                                                                                                               |
| ctaText       | _Optional_ - text of the call-to-action (cta) button that if defined will be added at the end of the email content                                                                             |
| ctaLink       | _Optional_ - the full, absolute URL to be used for the call-to-action (cta) button                                                                                                             |

## Customizing the Email Template

The default email template is located at `src/_includes/email.njk`, which feeds up into `emailBase.njk`. This is making use of the 11ty concept of [layout chaining](https://www.11ty.dev/docs/layout-chaining/), where `emailBase` includes a filter that is run against the full, compiled template content during _build_ to inline CSS styles into the HTML elements.

You can rearrange the default template, or create additional templates, as long as they maintain the connection to `emailBase`.

### CSS Classes

Most styles are tied to elements due to the eventual process of the CSS being inlined. A few classes are provided for spacing and color.

There is a series of **text color classes** in the format `.ink-[color]`, by default this includes: `light`, `dark`, and `text`. You can modify which palette colors are used to generate ink classes in by updating the list variable `$ink-colors`.

There is also a similar series of **background color classes** in the format `.background-[color]`, but default this includes `primary` and `secondary`. Update these in the list variable `$background-colors`.

Finally, three layout spacing classes are provided to add left, right, or both left/right padding, intended to be applied around the main email content. Note that these classes should be applied to the `td`.

These classes apply `40px` padding on large viewports, and `16px` padding on small viewports.

- `col-pad` - applies both left and right padding
- `col-pad-[left|right]` - applies padding in only the direction specified

### Layout shortcode: `emailSpacer`

Margin and padding are not reliably supported across email clients. So, to ensure layout spacing is retained, `email.njk` includes the use of the `emailSpacer` shortcode.

The height used for this is defined in `src/sass/email.scss` in the `.spacer` class, and defaults to `40px`.

Optionally, include the shortcode with the parameter `small` to reduce the space to `20px`, ex:

```js
{% emailSpacer 'small' %}
```

You can change the height values used in `src/sass/email.scss` or add more modifiers by updating the shortcode as found in `.eleventy.js`.

## Customizing the Theme

Depending on how you intend to use the generator, there are two paths to customzing the theme:

1. **Single brand/template** - you may want to directly modify the values within `src/sass/_theme.scss`
1. **Multi brand/template** - you may want to re-define variables prior to the import of `theme` within `src/sass/emails.scss`

For option #2, this could mean re-defining the colors such as:

```scss
// at the top of src/sass/emails.scss
$color-primary: blue;
$color-secondary: orange;

@import "theme";
```

### Web Fonts

Web fonts will not be supported in all email clients, but you can include them as a progressive enhancement.

To do this, update the stylesheet link in `src/_includes/email.njk` that is currently pulling in Arbutus Slab from Google fonts.

In addition, update the rule in that file for `h1, h2` to the correct name of your web font to use (and extend/change the selectors if desired).

### Extending Styles

You may of course modify styles found within `src/sass/emails.scss`, but regard the inline comments.

Email development is quite a bit behind modern CSS due to lagging email client support (hence the existence of `<table>` for layout). Be sure to check out [Can I Email](https://www.caniemail.com/) to determine support.

The current styles are setup to be modern and responsive, but also minimal. This increases chances of support across email clients.

## Email Terminology and Tips

| Term         | Definition                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| email client | The service used by the email recipient to view their emails, such as Gmail or Outlook                                                                                                                        |
| preheader    | The short text block that is the first visible text included in the email and which is likely to appear next to/below the subject line in most email clients. Useful to add more context to the subject line. |
| inline CSS   | Inlining CSS is required for the most robust email client support of your styles. This process is completed when using `npm run build`. Media queries are excluded and left in the head.                      |

### Tips

A smattering of tips about emails learned from producing hundreds of them over 8 years as a marketing developer:

- **Include an unsubscribe link** - you can add the link via `src/_data/meta.js` or once you import the HTML into your email sending service, but this is required for non-transactional emails (anything a user doesn't need to know to manage their account, as in all marketing emails)
- **Make use of the preheader** - Defined above, but the importance of the preheader is to prevent something like "Acme Co logo" (the alt text of a logo or hero image) appearing as the first content in the email. Use this to support your subject line. The amount shown varies across email clients, [check this article on tips and examples](https://www.campaignmonitor.com/blog/email-marketing/2019/02/a-practical-guide-to-email-preheaders/).
- **Keep the table layout** - Yes, users still use older versions of Outlook where Word is used as the rendering engine (no, I'm not kidding about either of those points). If you modify the templates, ensure you are maintaining the semantic table layout elements.
- **Accessibility still matters in emails** - Primarily this means ensuring contrast of text, links, and the cta button, and including alt text for the logo, hero, and any other images you add into the body.
- **Test, test, test** - If you intend to modify the template significantly, you will want to sign up for comprehensive (paid) tools like [Email on Acid](https://www.emailonacid.com/) or [Litmus](https://www.litmus.com/) which will generate screenshot previews of your email across clients. Those tools will also let you add a tracking pixel to determine what email clients are in use so you can make more informed layout design decisions (maybe you can ditch tables!).
- **Follow email regulations for your region** - In the USA, there is specific email regulations called [CAN-SPAM](https://blog.hubspot.com/marketing/what-is-can-spam-ht) that if not followed risk a fine up to _\$16,000 per email sent_. This requires an unsubscribe link and for the senders physical mailing address to be included in the email, and some rules around list management like completing unsubscription procesess within 10 business days. Be sure to have all these elements if you are sending to a US market, and be aware of any other regional laws for your sending audience.
