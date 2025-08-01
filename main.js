import { Player } from 'https://e-qa1.video-cdn.net/mi-player-sdk-qa/mi-player-sdk.js';

const player = new Player('playerfr');
player.autoplay()
        .then(() => {
            console.log("video playing")
    })
.catch((error)=>{console.log("error",error)});

const playBtn = document.querySelector("#play");
playBtn.addEventListener("click", ()=> {
    player
        .play()
        .then(() => {
            console.log("video playing")
        })
        .catch((error)=>{console.log("error",error)});
});
const pauseBtn = document.querySelector("#pause");
pauseBtn.addEventListener("click", ()=> {
    player
        .pause()
        .then(() => {
            console.log("video pausing")
        })
        .catch((error)=>{console.log("error",error)});
});

const muteBtn = document.querySelector("#mute");
muteBtn.addEventListener("click", ()=> {
    player
        .mute()
        .then(() => {
            console.log("video mute")
        })
        .catch((error)=>{console.log("error",error)});
});
const unmuteBtn = document.querySelector("#unmute");
unmuteBtn.addEventListener("click", ()=> {
    player
        .unmute()
        .then(() => {
            console.log("video unmute")
        })
        .catch((error)=>{console.log("error",error)});
});
document.addEventListener("DOMContentLoaded", () => {
const getVolumeBtn = document.getElementById("getvolume");
getVolumeBtn.addEventListener("click", () => {
    player
        .getVolume()
        .then(result => {
            alert("Volume is "+result);
        })
        .catch((error)=>{console.log("error",error)})});
});

document.addEventListener("DOMContentLoaded", () => {
const slider = document.getElementById("volumeSlider");
const output = document.getElementById("volumeValue");

slider.addEventListener("input", () => {
  output.textContent = slider.value;
});
slider.addEventListener("change", () => {
        player
            .setVolume(Number(slider.value))
            .then(() => {
                console.log("volume is set to "+slider.value);
            })
            .catch((error)=>{console.log("error",error)})});
        player.on("volumechange", () => {
                console.log("Player volume changed to "+slider.value);
            })
});
const isMutedBtn = document.getElementById("ismuted");
isMutedBtn.addEventListener("click", ()=> {
    player
        .isMuted()
        .then(result => {
            alert("[is Mute ]value is "+result)
        })
        .catch((error)=>{console.log("error",error)});
});
