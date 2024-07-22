
const displaySurfaces = [  "screen", "window","tab" ];

async function startCapture() {

  startBtn.remove();

  for (let i = 0; i < displaySurfaces.length; i++) {
    const surface = displaySurfaces[i];
    let mediaStream = await getStream(surface);

    videos[i].srcObject = mediaStream;
    captions[i].innerText = surface;
    const tracks = mediaStream.getVideoTracks();
    console.log('>displaySurface', tracks[0].getSettings().displaySurface)
    tracks.forEach((track, i) => console.log(i, track.getSettings(), track.getConstraints()));
  }
}


startBtn.addEventListener('click', startCapture);

const videos = document.querySelectorAll('video').values().toArray();
const captions = document.querySelectorAll('.caption').values().toArray();



function getStream(surface) {
  console.log('>getStream', surface);
  return new Promise(resolve => {
    const cancelId = chrome.desktopCapture.chooseDesktopMedia([surface], null, onStream)

    async function onStream(streamId) {
      console.log('>streamid', streamId)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
 
            chromeMediaSourceId: streamId
          }
        }
      });
      console.log('>stream', stream);
      resolve(stream);
    }
  });
}