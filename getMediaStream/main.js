import { getStream } from './stream.js';

const displaySurfaces = ['monitor', 'window', 'browser'];

async function startCapture() {
    console.log('>startCapture');
    startBtn.remove();
    for (let i = 0; i < displaySurfaces.length; i++) {
        const surface=displaySurfaces[i];
        let mediaStream = await getStream(surface);

        videos[i].srcObject = mediaStream;
        captions[i].innerText=surface;
        const tracks = mediaStream.getVideoTracks();
        console.log('>displaySurface', tracks[0].getSettings().displaySurface)
        tracks.forEach((track, i) => console.log(i, track.getSettings(), track.getConstraints()));
    }
}


startBtn.addEventListener('click', startCapture);

const videos = document.querySelectorAll('video').values().toArray();
const captions = document.querySelectorAll('.caption').values().toArray();
