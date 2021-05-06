# Simple Cookie Consent in GTM using JS

This is a simple cookie consent management pop-up built using JavaScript to work alongside Google Tag Manager (GTM). It allows blocking GTM tags from firing unless a user has given a 'true' consent.

***Not tested for production use.***

## Functionality

The functionality of this pop-up is:

1. On first page load, fire ‘necessary’ tags only, and prompt user for consent to fire optional tags.

2. Once user gives consent, drop a cookie storing their consent and fire the optional tags.

3. If the consent cookie already exists, check if it is still valid. If yes, respect the past consent and not show the pop-up again.

4. Reset consent if the past consent is no longer valid (in case you’ve made changes to your cookie policy and want fresh consent), and display the pop-up again.

## How To Use

1. Create a new Custom HTML tag in GTM and load the JavaScript within `<script>` tags.

2. Create a new 1st Party Cookie variable, name it “cookie-consent”, with the Cookie Name being our consent cookie’s name (default is `cookie-consent`).

3. Set up a Custom Event trigger, name it “Cookie Consent – No” with:
    * event name name matching `.*` (tick “Use regex matching”)

    * Fire on *Some Custom Events*, where variable `cookie-consent` does not contain `"consent":true`.

4. Set up a Custom Event trigger, name it “Cookie Consent Set”, with the Event Name `cookie-consent` to fire on All Custom Events.

5. Create a tag which shouldn’t fire when consent is false and:

    * Add your regular triggers (e.g. All Pages).
    * Add the new “Coookie Consent Set” trigger to it too.
    * Under Exceptions, add the Add the “Cookie Consent – No” trigger.

## Demo

[Demo available here.](https://www.muhammadali.xyz/demo/js-simple-cookie-consent/)

## Read more
[Read more about this cookie consent pop-up on this blog post.](https://muhammadali.xyz/js-simple-cookie-consent/)

## License
[MIT](https://choosealicense.com/licenses/mit/)