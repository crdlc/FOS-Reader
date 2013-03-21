
'use strict';

const UI = (function() {
  function parseURL(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').
                       replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var scanButton = document.querySelector('#scan-button');
  scanButton.addEventListener('click', function(e) {
    var activity = new MozActivity({
      name: 'pick',
      data: {
        type: 'image/jpeg',
        width: window.innerWidth,
        height: window.innerWidth
      }
    });

    activity.onsuccess = function success() {
      qrcode.decode(URL.createObjectURL(this.result.blob));
      qrcode.callback = function parse(data) {
        data = parseURL(data);

        if (data === 'error decoding QR Code') {
          window.alert('Error decoding QR Code!');
        } else {
          new MozActivity({
           name: "view",
            data: {
                type: "url",
                url: data
            }
          });
        }
      }
    };

    activity.onerror = function() {
      window.console.error('Error picking a picture: ', activity.error);
    };
  });
}());
