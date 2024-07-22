const displayMediaOptions = {
    video: {
        displaySurface: "monitor",
        cursor: "always"
    },

    selfBrowserSurface: "include",
    monitorTypeSurfaces: "include"
};

export async function getStream(type) {
    let stream;

    displayMediaOptions.video.displaySurface = type;

    while (!stream) {
        stream = await navigator.mediaDevices
            .getDisplayMedia(displayMediaOptions)
            .catch(ex => console.error(ex));

        if (stream) {
            const tracks = stream.getVideoTracks();
            if (tracks[0].getSettings().displaySurface !== type) {
                tracks.forEach(track => track.stop());
                stream = null;
            }
        }
    }
    return stream;
}