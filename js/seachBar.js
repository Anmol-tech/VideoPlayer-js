let searchInput = document.querySelector("#searchInput");
let searchRes = document.querySelector("#search-result");

searchRes.classList.add("hideControl");

searchInput.addEventListener("keypress", async function (e) {
	let val = searchInput.value;
	if (e.key == "Enter") {
		console.log("Called Api");

		if (isUrl(val)) {
			directVideo(val);
		} else {
			youtubeSearch(val);
		}
	}
});

searchInput.onfocus = function () {
	let b = this.getBoundingClientRect();
	searchRes.classList.remove("hideControl");
	// set result box position
	searchRes.style.top = b.top + b.height + "px";
	searchRes.style.right = 20 + "px";
	searchRes.style.width = "35%";
	searchRes.style.height = "320px";

	isTyping = true;
};
searchInput.onblur = function () {
	searchRes.classList.add("hideControl");
	setTimeout(() => {}, 300);
	isTyping = false;
};

async function directVideo(val) {
	res = await axios.post("http://localhost:3000/api/getVideo", {
		url: val,
	});
	console.log(val);
	console.log(res.data);

	videoObj = res.data;
	searchInput.value = "";
	searchInput.blur();
	formatFormats();
	setVideoAndAudio();
}

async function youtubeSearch(val) {
	console.log("Not url");
	searchRes.innerHTML = `<div class="loader-search"></div>`;
	searchRes.classList.remove("hideControl");
	let l = searchRes.querySelector(".loader-search");
	l.classList.remove("hideControl");

	res = await axios.post("http://localhost:3000/api/search", {
		str: val,
	});
	console.log(res);
	if (res.data.length == 0) {
		searchRes.innerHTML = `<p> No data found !</p>`;
		return;
	}
	l.classList.add("hideControl");
	// div = `<div class="loader"></div>`;

	for (let x = 0; x < 6; x++) {
		appendList(x, res);
	}
}

async function addMoreResult(e) {
	searchInput.focus();

	e.target.innerHTML = `<div class="loader-search"></div>`;
	e.target.style.height = "40px";

	let moreRes = await axios.post("http://localhost:3000/api/load", {
		str: searchInput.value,
	});
	console.log(moreRes);
	if (moreRes.data.length != 0) {
		e.target.remove();
	} else {
		e.target.textContent = `No data found !`;
	}

	for (let x = 0; x < 6; x++) {
		appendList(x, moreRes);
	}
}

function appendList(x, res) {
	let d = document.createElement("div");

	if (x == 5) {
		d.classList.add("list-view-load-more");
		d.textContent = `Load More..`;
		d.addEventListener("click", addMoreResult);
	} else {
		d.classList.add("list-view");
		d.innerHTML = `	<div class="thumbnail"></div>
						<div class="search-title">
							${res.data[x].title.substring(0, 40)}...
							<div class="channel-title">${res.data[x].channel}</div>
						</div>
					`;

		d.querySelector(
			".thumbnail"
		).style.background = `url(${res.data[x].thumbnail})`;
		d.addEventListener("click", function () {
			videoObj = res.data[x];
			ctime = 0;
			formatFormats();
			setVideoAndAudio();
		});
	}
	searchRes.appendChild(d);
}
