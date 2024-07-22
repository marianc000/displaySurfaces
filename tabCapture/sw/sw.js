const url = chrome.runtime.getURL('tab/receiver.html');

async function closePrevReceiverTab() {
  const tabs = await chrome.tabs.query({ url });

  await Promise.all(tabs.map((tab) => chrome.tabs.remove(tab.id)));
}

chrome.action.onClicked.addListener(async ({ id }) => {

  await closePrevReceiverTab();

  await chrome.windows.create({ url });

  chrome.runtime.onMessage.addListener(
    function sendStream(request, { tab: { id: consumerTabId } }, sendResponse) {
      console.log(consumerTabId, id);

      sendResponse({
        targetTabId: id,
        consumerTabId
      });

      chrome.runtime.onMessage.removeListener(sendStream);
    }
  );
});
