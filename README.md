# Smart Smooth Scrolling

Lightweight vanilla smooth scrolling based on native browser scrollbar. 

It intends to smooth mouse scrolling, but immediatly cancels easing if user switches to a trackpad or drags on a touch screen (hybrid devices scenario).

Implementing this on a touch only device is not recommanded. You should use a detection library such as [detect-it](https://www.npmjs.com/package/detect-it).