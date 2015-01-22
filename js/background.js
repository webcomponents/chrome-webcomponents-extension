'use strict';

var port;
var toggle = false;

chrome.runtime.onConnect.addListener(function(p) {
    port = p;

    // Listens to messages from content.js
    port.onMessage.addListener(function(msg) {
        // Shows the icon if there's a custom element
        if (msg.hasElements) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.pageAction.show(tabs[0].id);
            });
        }
    });
});

// Sends a message when the icon is clicked
chrome.pageAction.onClicked.addListener(function(tab) {
    toggle = !toggle;
    port.postMessage({open: toggle});
});
