const url = chrome.runtime.getURL('tab/receiver.html');

async function closePrevReceiverTab() {
  const tabs = await chrome.tabs.query({ url });

  await Promise.all(tabs.map((tab) => chrome.tabs.remove(tab.id)));
}

chrome.action.onClicked.addListener(async () => {

  await closePrevReceiverTab();

  await chrome.windows.create({ url });
});
