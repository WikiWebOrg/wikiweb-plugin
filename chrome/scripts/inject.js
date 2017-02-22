chrome.storage.local.get(['wikiwebFooterActive'], function (res) {
  if (res.wikiwebFooterActive === true) {
    const script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = '//localhost:4000/js/popup.bundle.js'; // use this for linked script
    document.body.appendChild(script);
  }
});
