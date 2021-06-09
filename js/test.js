let axios = require("axios");
let fs = require("fs");
let youtube = require("youtube-dl-exec");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const url = "https://www.youtube.com/watch?v=o54aKk5LZdM";
(async function () {
	let video = await youtube(url, {
		dumpSingleJson: true,
		noWarnings: true,
		noCallHome: true,
		noCheckCertificate: true,
		preferFreeFormats: true,
		youtubeSkipDashManifest: true,
	});
	console.log(video);
})();

function useRegex(input) {
	var r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

	return r.test(input);
}
async function testing(x) {
	let a;
	try {
		a = await exec(`youtube-dl.exe  --dump-single-json ${url}`);
	} catch (e) {
		console.log(e);
	}
	console.log(JSON.parse(a.stdout).title + "   " + x);
	// fs.writeFileSync("test.json", a.stdout);
}
let videoIds = [];

async function searchYoutube() {
	let a = await axios.get(
		`https://youtube.googleapis.com/youtube/v3/search?maxResults=5&type=video&key=AIzaSyDyWImLg5NIqHsJvrKybYOp6T4ww8j3u0w&q=yes`
	);
	// console.log(a);
	// console.log(a.data.items);
	for (let x in a.data.items) {
		videoIds.push(
			`https://www.youtube.com/watch?v=` + "" + a.data.items[x].id.videoId
		);
	}
	for (let i in videoIds) {
	}
}
