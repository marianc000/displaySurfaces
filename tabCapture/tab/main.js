import { getStream } from './stream.js';

const displaySurfaces = ['monitor' ];

async function startCapture() {
 
    startBtn.remove();
    for (let i = 0; i < displaySurfaces.length; i++) {
        const surface=displaySurfaces[i];
        let mediaStream = await getStream(surface);

        videos[i].srcObject = mediaStream;
        captions[i].innerText=surface;
        const tracks = mediaStream.getVideoTracks();
        tracks.forEach((track, i) => console.log(i, track.getSettings(), track.getConstraints()));
    }
}


startBtn.addEventListener('click', startCapture);

const videos = document.querySelectorAll('.displayMedia video').values().toArray();
const captions = document.querySelectorAll('.displayMedia .caption').values().toArray();
