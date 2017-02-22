
/**
 * setThe extensionButtonWith the correctParams
 * @param {[type]} entityCount [description]
 * @param {[type]} tabId       [description]
 */
export const setExtensionButon = (entityCount, tabId) => {
  //Set the badge text
  chrome.browserAction.setBadgeText({
    text: entityCount > 0 ? entityCount.toString() : ''
  });
  // Set the path for the icon
  const path = entityCount > 0 ?
  {
    16: 'img/icon-16-connected.png',
    48: 'img/icon-48-connected.png',
    128: 'img/icon-128-connected.png',
  } :
  {
    16: 'img/icon-16-not-connected.png',
    48: 'img/icon-48-not-connected.png',
    128: 'img/icon-128-not-connected.png',
  };

  chrome.browserAction.setIcon({
    tabId,
    path,
  });
};

/**
 * Set Up the DOM for the WW footer
*/
export const footerDOMSetUp = () => {
  const root = document.createElement('div');
  root.id = 'wikiwebRoot';
  document.body.prepend(root);

  const paddingFooterDiv = document.createElement('div');
  paddingFooterDiv.style.height = 45;
  document.body.append(paddingFooterDiv);
};
