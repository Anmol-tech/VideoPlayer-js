let formatsSelector = document.querySelector("#formats");
let download = document.querySelector(".download");

formatsSelector.addEventListener("change", function () {
	if (videoObj == null) {
		return;
	}
	let currVal = formats.value;
	changeVideoSource(videoObj.validVideoFormat[currVal]);
});

function setAvailableFormats() {
	formatsSelector.innerHTML = "";
	for (let i in videoObj.availableFormats) {
		let opt = document.createElement("option");
		opt.value = videoObj.availableFormats[i];

		opt.innerHTML = videoObj.availableFormats[i];
		formatsSelector.appendChild(opt);
	}
}

function setCurrFormatVal(val) {
	formatsSelector.val = val;
}

download.addEventListener("click", function () {
	axios
		.get(
			"https://r3---sn-qxa7sn7z.googlevideo.com/videoplayback?expire=1623372470&ei=Vl7CYMKaH9XtsALVvKnQAw&ip=34.244.20.147&id=o-AA4lSyEcBVCr0q1CjRjq3N5IB9op6czI1e1QTb4kx7dw&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=smBzMgJ3oTZqbjchnq49mzkF&cnr=14&ratebypass=yes&dur=716.010&lmt=1622584595073767&fexp=24001373,24007246&c=WEB&txp=5532432&n=fhgftfQBwN28R5WR&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAO6UxaBSSu9P-3mRUs8LWjeWzhlM8RgXIW1tYaoh2-jUAiBBVGwSxNwnMRvbvTwcNhFZhVYxI7y9GeyGbL5XrlhGtQ%3D%3D&rm=sn-q0cee76,sn-5pop-qxal7s&req_id=c43ec55495fca3ee&ipbypass=yes&redirect_counter=2&cms_redirect=yes&mh=C9&mip=103.216.143.207&mm=29&mn=sn-qxa7sn7z&ms=rdu&mt=1623350932&mv=m&mvi=3&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgHCnsF-hX8qA-Mrsj6LvoUb-RnS6PfGU-mEU7N11MdZICIQDauZYWSPd0tOOpMNi8BvmC9N66_ibUa6htWb6StL2VOQ%3D%3D"
		)
		.then(function (data) {
			console.log(data);
		});
	// let blob = new Blob([]);
	// console.log(blob);
	let anchor = document.createElement("a");
	anchor.href = videoObj.download.url;
	anchor.download = videoObj.title + ".mp4";
	anchor.style.display = "none";
	// videoPlayer.appendChild(anchor);
	// anchor.click();
});
