
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", async function () {
    const searchText = document.getElementById("input-field").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySongs(data.data);

    } catch (error) {
        displayError(error);
    }
    // fetch(url)
    // .then(response => response.json())
    // .then(data => displaySongs(data.data))
    // .catch(error => console.log(error));
    document.getElementById("song-lyrics").innerText = "";
});

const displaySongs = songs => {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = "";
    document.getElementById("error-message").innerText = "";
    songs.forEach(song => {
        //console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        const songInfo = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>

        `;
        songDiv.innerHTML = songInfo;
        songContainer.appendChild(songDiv);
    });
}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayLyric(data.lyrics);
    } catch (error) {
        const errorMessage = document.getElementById("error-message");
        errorMessage.innerText = "Sorry! something went wrong. Please try again later!!";
    }
}
// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(response => response.json())
//     .then(data => displayLyric(data.lyrics))
// }

const displayLyric = lyric => {
    const lyricDiv = document.getElementById("song-lyrics");
    lyricDiv.innerText = lyric;
}
const displayError = error => {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = "Sorry! something went wrong. Please try again later!!";
    document.getElementById("song-container").innerHTML = "";
}