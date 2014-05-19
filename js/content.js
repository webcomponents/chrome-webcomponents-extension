'use strict';

// Opens a port to communicate messages
var port = chrome.runtime.connect({name: "channel"});

// Filters all custom elements in the DOM
var allElements = document.all;

allElements = Array.prototype.slice.call(allElements).filter(function(el) {
    return el.localName.indexOf('-') != -1 || el.getAttribute('is');
});

// Detects if there's a custom element
var hasElements = false;

if (allElements.length > 0) {
    hasElements = true;
}

// Sends a message to background.js
port.postMessage({hasElements: hasElements});

// Listens to messages from background.js
port.onMessage.addListener(function(msg) {
    // Highlights all custom elements on the page
    if (msg.open) {
        allElements.forEach(function(element, i) {
            element.style.outline = '1px dashed red';
            element.style.backgroundColor = 'rgba(255,0,0,0.1)';
        });
    }
});
