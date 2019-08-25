# Mouse Scroll Smoothing

Lightweight vanilla smooth scrolling based on native browser scrollbar. 


It intends to smooth mouse scrolling, but immediatly cancels easing if user switches to a trackpad or drags on a touch screen (hybrid devices scenario).

Implementing this on a touch only device is not recommanded. You should use a detection library such as [detect-it](https://www.npmjs.com/package/detect-it).

# Installation

```
npm i mouse-scroll-smoothing --save

```

# Implementation

```javascript
import SmoothScroll from 'mouse-scroll-smoothing';

const SmoothScroll = new SmoothScroll(domElement, options);
```

Run `npm i && npm start` to build the demo.

# Documentation

## Constructor

### SmoothScroll(domElement, options)

- `domElement` is the translated DOM.
- `options` is an object of options:  
`options.easing` [0,1]: easing applied on scroll (every browsers but Firefox).  
`options.easingFf` [0,1]: easing applied on scroll (Firefox only).  
`options.autoResize`: automatically adds a resize event on window. Set if to `false` if you already have a listener and want to manually call `resize` method.  
`options.autoRaf`: automatically calls `update` method on requestAnimationFrame. Set if to `false` if you already have a RAF running and call `update` method manually.  
`options.rafCallback`: if `options.autoRaf` is set to true, setting a RAF callback can be useful for animation purposes. The callback with return scroll `percent` as first param.

## Public methods

### resize(wh)

This method has to be called on window `resize` event if `options.autoResize` is false, or anytime you update the `domElement`content.

- `wh` is the window height. Defaults to `window.innerHeight`. You can use a cached value to limit reflow.

Consider [debouncing](https://www.npmjs.com/package/debounce) `resize` call to limit DOM reflow.

### update(now)

This method has to be called on RAF (called automatically if `options.autoRaf` is true).

- `now` is a boolean, set it to `true` to force an update without easing.

### destroy()

Removes listeners.

## Getters & setters

### enabled = [true|false]

Set `enabled` to `false` to disable scrolling, `true` to enable it.

### percent (read only)

Returns the scroll position in percent. Useful to animate a timeline proportionally to scrolling on RAF update.