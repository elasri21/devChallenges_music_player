const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-filled");
const player = document.querySelector(".control .play");
const audio = document.querySelector("audio");
const forwardBtn = document.querySelector(".forward");
const backwarddBtn = document.querySelector(".backward");
audio.volume = 0.1;

async function getData() {
    const res = await fetch('./data.json');
    const data = await res.json();
    return data;
}

const data = await getData();

// update song
function updateSong(song) {
    const songCover = document.querySelector(".poster img");
    const songName = document.querySelector("h1");
    const songSinger = document.querySelector(".singer");
    songCover.src = song['cover'];
    songName.textContent = song['name'];
    songSinger.textContent = song['singer'];
}

// handle progress
function handleProgress() {
    let precent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${precent}%`;
}

// skip
function skip() {
    let step = parseFloat(this.dataset.skip);
    audio.currentTime += step;
    handleProgress();
}
player.addEventListener("click", function() {
    if (this.classList.contains('paused')) {
        this.innerHTML = '<i class="fa-solid fa-pause"></i>';
        this.classList.remove("paused");
        this.classList.add("playing");
        audio.play();
    } else {
        this.innerHTML = '<img src="./assets/Play_fill.svg" alt="">';
        this.classList.remove("playing");
        this.classList.add("paused");
        audio.pause();
    }
});
audio.addEventListener("timeupdate", handleProgress);
forwardBtn.addEventListener("click", skip);
backwarddBtn.addEventListener("click", skip);
audio.addEventListener("ended", function() {
    console.log(this.src);
    console.log(data[0]['source']);
    console.log(data[1]['source']);
    if (this.src === data[0]['source']) {
        updateSong(data[1]);
        this.src = data[1]['source'];
        console.log("song 2 playing")
    } else {
        updateSong(data[0]);
        this.src = data[0]['source'];
        console.log("song 1 playing")
    }
    audio.autoplay = 'on';
});