let volumeBlock = document.querySelector(".volume");
let volumeBtn = document.querySelector(".volume-btn");
let volumeSlider = document.querySelector("#volume-slider");

volumeSlider.min = 0;
volumeSlider.max = 100;
volumeSlider.step = 1;

let cVol = localStorage.getItem("volume");
if (cVol == null) {
	cVol = 100;
}

audioPlayer.volume = cVol / 100;
volumeSlider.value = cVol;

volumeSlider.addEventListener("input", () => {
	cVol = volumeSlider.value;
	audioPlayer.volume = cVol / 100;
	isChangingVol = true;
});

volumeSlider.addEventListener("change", () => {
	cVol = volumeSlider.value;
	audioPlayer.volume = cVol / 100;
	localStorage.setItem("volume", cVol);
	isChangingVol = false;
});

volumeBlock.addEventListener("mouseenter", function () {
	volumeSlider.classList.remove("hideControl");
});
volumeBlock.addEventListener("mouseleave", function () {
	volumeSlider.classList.add("hideControl");
});
