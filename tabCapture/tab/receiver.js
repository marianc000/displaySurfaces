
const { targetTabId, consumerTabId } = await chrome.runtime.sendMessage({});

const streamId = await chrome.tabCapture.getMediaStreamId({ targetTabId, consumerTabId })

const stream = await navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    mandatory: {
      chromeMediaSource: 'tab', // The media source must be 'tab' here.
      chromeMediaSourceId: streamId
    }
  }
});

extensionVideo.srcObject = stream; 