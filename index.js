var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
//載入
window.onload = function () {
	init();
}
function init() {
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp = AdobeAn.getComposition("B3C702FB945454448F8F5D400140133E");
	var lib = comp.getLibrary();
	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", function (evt) { handleFileLoad(evt, comp) });
	loader.addEventListener("complete", function (evt) { handleComplete(evt, comp) });
	var lib = comp.getLibrary();
	loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
	var images = comp.getImages();
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}
function handleComplete(evt, comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib = comp.getLibrary();
	var ss = comp.getSpriteSheet();
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for (i = 0; i < ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
	}
	exportRoot = new lib.dance();
	stage = new lib.Stage(canvas);

	const STEP = 50;
	let canplay = false;
	let step = 1;
	let isKeyDown = false;
	let gold_count = 1;
	var blocks = [1213];
	var block = [];
	let end = false;
	let inittime = 15;
	let time = inittime;
	let type;
	let aim;

	//Player1
	let p1die = false;
	let udlr = true;
	var robot = new lib.roboter();
	var player1_x = 12;
	var player1_y = 1;
	var score1 = 0;
	robot.x = 575;
	robot.y = 25;
	exportRoot.addChild(robot);
	robot.gotoAndPlay("down");

	//Player2
	let p2die = false;
	let step2 = 1;
	let udlr2 = true;
	var robot2 = new lib.roboter2();
	var player2_x = 1;
	var player2_y = 12;
	var score2 = 0;
	robot2.x = 25;
	robot2.y = 575;
	exportRoot.addChild(robot2);
	robot2.gotoAndPlay("up");

	//point block
	pointblock = new lib.blocks();
	pointblock.x = 15 * 50 - 25;
	pointblock.y = 7 * 50 - 25;
	pointblock.gotoAndPlay("gray");
	exportRoot.addChild(pointblock);

	var loadpoint = 0;
	var sounds = [
		{ src: "./assets/bgm1.mp3", id: "bg1" },
		{ src: "./assets/bgm4.mp3", id: "bg4" },
		{ src: "./assets/bgm6.mp3", id: "bg6" },
		{ src: "./assets/bgm8.mp3", id: "bg8" },
		{ src: "./assets/explode1.mp3", id: "exp1" },
		{ src: "./assets/explode2.mp3", id: "exp2" },
		{ src: "./assets/explode3.mp3", id: "exp3" },
		{ src: "./assets/explode4.mp3", id: "exp4" },
		{ src: "./assets/fuse.mp3", id: "fuse" },
		{ src: "./assets/point.mp3", id: "point" },
		{ src: "./assets/dead.mp3", id: "dead" },
	];
	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.addEventListener("fileload", (e) => {
		loadpoint++;
		if (loadpoint === sounds.length) {
			// This is fired for each sound that is registered.
			end = true;
			document.querySelector(".gamePlayBtn").style.display = 'block';
			document.getElementById("reload_back").style.display = "none";
			document.getElementById("reload").style.display = "none";
		}
	})
	createjs.Sound.registerSounds(sounds);

	mapCreate();

	window.addEventListener("keydown", keydownMoveFn)
	window.addEventListener("keyup", keyupMoveFn)

	document.querySelector(".left1").addEventListener("touchstart", function () { touchdownMove(37) })
	document.querySelector(".up1").addEventListener("touchstart", function () { touchdownMove(38) })
	document.querySelector(".right1").addEventListener("touchstart", function () { touchdownMove(39) })
	document.querySelector(".down1").addEventListener("touchstart", function () { touchdownMove(40) })
	document.querySelector(".tnt1").addEventListener("touchstart", function () { touchdownMove(191) })
	document.querySelector(".left2").addEventListener("touchstart", function () { touchdownMove(65) })
	document.querySelector(".up2").addEventListener("touchstart", function () { touchdownMove(87) })
	document.querySelector(".right2").addEventListener("touchstart", function () { touchdownMove(68) })
	document.querySelector(".down2").addEventListener("touchstart", function () { touchdownMove(83) })
	document.querySelector(".tnt2").addEventListener("touchstart", function () { touchdownMove(71) })


	document.querySelector(".gamePlayBtn").addEventListener("click", () => {
		document.querySelector(".gamePlayBtn").style.display = 'none';
		bgAudio = createjs.Sound.play(bgm(), { loop: -1 });
		bgAudio.volume = 0.3;
		end = false;
		canplay = true;
		countDown();
	})

	function countDown() {
		if (time <= 1) {
			if (blocks[(player1_x) * 100 + (player1_y)] != aim) p1die++;
			if (blocks[(player2_x) * 100 + (player2_y)] != aim) p2die++;
			die_detect();
			if (time > 3) inittime -= 1;
			time = inittime;
			mapChange();
		}
		time -= 1;
		document.querySelector(".time").innerHTML = time;
		if (canplay) setTimeout(function () { countDown(); }, 1000);
	}

	function bgm() {
		let exp = Math.floor(Math.random() * (4 - 1 + 1) + 1);
		if (exp === 1) return "bg1";
		if (exp === 2) return "bg4";
		if (exp === 3) return "bg6";
		if (exp === 4) return "bg8";
	}

	function mapChange() {
		for (var i = 0; i < 13; i++) {
			for (var j = 0; j < 13; j++) {
				exportRoot.removeChild(block[i * 100 + j]);
			}
		}
		mapCreate();

	}

	function reset() {
		document.getElementById("reload_back").style.display = "none";
		document.getElementById("reload").style.display = "none";
		document.querySelector(".gamePlayBtn").style.display = 'block';
		document.getElementById("win").className = "win";
		document.getElementById("win").innerHTML = "winner";

		inittime = 15;
		time = inittime;
		document.querySelector(".time").innerHTML = time;

		//Player1
		p1die = false;
		udlr = true;
		player1_x = 12;
		player1_y = 1;
		score1 = 0;
		robot.x = 575;
		robot.y = 25;
		robot.gotoAndPlay("down");

		//Player2
		p2die = false;
		step2 = 1;
		udlr2 = true;
		player2_x = 1;
		player2_y = 12;
		score2 = 0;
		robot2.x = 25;
		robot2.y = 575;
		robot2.gotoAndPlay("up");

		for (var i = 0; i < 13; i++) {
			for (var j = 0; j < 13; j++) {
				exportRoot.removeChild(block[i * 100 + j]);
			}
		}

		mapCreate();
	}



	function mapCreate() {

		let map = Math.floor(Math.random() * (15 - 1 + 1) + 1); //(最大-最小+1)+最小

		if (map === 1) {
			blocks[101] = 2; blocks[102] = 2; blocks[103] = 2; blocks[104] = 2; blocks[105] = 2; blocks[106] = 2; blocks[107] = 2; blocks[108] = 2; blocks[109] = 2; blocks[110] = 2; blocks[111] = 2; blocks[112] = 2; blocks[201] = 10; blocks[202] = 10; blocks[203] = 10; blocks[204] = 10; blocks[205] = 10; blocks[206] = 2; blocks[207] = 8; blocks[208] = 8; blocks[209] = 8; blocks[210] = 2; blocks[211] = 8; blocks[212] = 2; blocks[301] = 10; blocks[302] = 2; blocks[303] = 2; blocks[304] = 2; blocks[305] = 10; blocks[306] = 2; blocks[307] = 8; blocks[308] = 2; blocks[309] = 8; blocks[310] = 2; blocks[311] = 8; blocks[312] = 2; blocks[401] = 2; blocks[402] = 10; blocks[403] = 10; blocks[404] = 10; blocks[405] = 2; blocks[406] = 2; blocks[407] = 8; blocks[408] = 2; blocks[409] = 8; blocks[410] = 8; blocks[411] = 8; blocks[412] = 2; blocks[501] = 2; blocks[502] = 2; blocks[503] = 2; blocks[504] = 2; blocks[505] = 2; blocks[506] = 2; blocks[507] = 2; blocks[508] = 2; blocks[509] = 2; blocks[510] = 2; blocks[511] = 2; blocks[512] = 2; blocks[601] = 2; blocks[602] = 5; blocks[603] = 5; blocks[604] = 5; blocks[605] = 2; blocks[606] = 2; blocks[607] = 3; blocks[608] = 3; blocks[609] = 3; blocks[610] = 3; blocks[611] = 3; blocks[612] = 2; blocks[701] = 5; blocks[702] = 2; blocks[703] = 2; blocks[704] = 2; blocks[705] = 5; blocks[706] = 2; blocks[707] = 2; blocks[708] = 2; blocks[709] = 3; blocks[710] = 2; blocks[711] = 2; blocks[712] = 2; blocks[801] = 5; blocks[802] = 2; blocks[803] = 2; blocks[804] = 2; blocks[805] = 5; blocks[806] = 2; blocks[807] = 2; blocks[808] = 2; blocks[809] = 3; blocks[810] = 2; blocks[811] = 2; blocks[812] = 2; blocks[901] = 2; blocks[902] = 5; blocks[903] = 2; blocks[904] = 5; blocks[905] = 2; blocks[906] = 2; blocks[907] = 3; blocks[908] = 3; blocks[909] = 3; blocks[910] = 3; blocks[911] = 3; blocks[912] = 2; blocks[1001] = 2; blocks[1002] = 2; blocks[1003] = 2; blocks[1004] = 2; blocks[1005] = 2; blocks[1006] = 2; blocks[1007] = 2; blocks[1008] = 2; blocks[1009] = 2; blocks[1010] = 2; blocks[1011] = 2; blocks[1012] = 2; blocks[1101] = 1; blocks[1102] = 4; blocks[1103] = 9; blocks[1104] = 4; blocks[1105] = 1; blocks[1106] = 4; blocks[1107] = 9; blocks[1108] = 4; blocks[1109] = 1; blocks[1110] = 4; blocks[1111] = 9; blocks[1112] = 4; blocks[1201] = 6; blocks[1202] = 7; blocks[1203] = 6; blocks[1204] = 7; blocks[1205] = 6; blocks[1206] = 7; blocks[1207] = 6; blocks[1208] = 7; blocks[1209] = 6; blocks[1210] = 7; blocks[1211] = 6; blocks[1212] = 7;
		} else if (map === 2) {
			blocks[101] = 2; blocks[102] = 10; blocks[103] = 10; blocks[104] = 10; blocks[105] = 1; blocks[106] = 2; blocks[107] = 2; blocks[108] = 5; blocks[109] = 5; blocks[110] = 5; blocks[111] = 1; blocks[112] = 2; blocks[201] = 10; blocks[202] = 1; blocks[203] = 2; blocks[204] = 2; blocks[205] = 10; blocks[206] = 1; blocks[207] = 2; blocks[208] = 2; blocks[209] = 2; blocks[210] = 2; blocks[211] = 5; blocks[212] = 1; blocks[301] = 10; blocks[302] = 1; blocks[303] = 2; blocks[304] = 2; blocks[305] = 10; blocks[306] = 1; blocks[307] = 2; blocks[308] = 5; blocks[309] = 5; blocks[310] = 5; blocks[311] = 1; blocks[312] = 2; blocks[401] = 2; blocks[402] = 2; blocks[403] = 2; blocks[404] = 2; blocks[405] = 2; blocks[406] = 2; blocks[407] = 2; blocks[408] = 2; blocks[409] = 2; blocks[410] = 2; blocks[411] = 2; blocks[412] = 2; blocks[501] = 2; blocks[502] = 3; blocks[503] = 3; blocks[504] = 3; blocks[505] = 3; blocks[506] = 1; blocks[507] = 2; blocks[508] = 4; blocks[509] = 4; blocks[510] = 4; blocks[511] = 4; blocks[512] = 1; blocks[601] = 3; blocks[602] = 3; blocks[603] = 7; blocks[604] = 3; blocks[605] = 2; blocks[606] = 2; blocks[607] = 4; blocks[608] = 4; blocks[609] = 7; blocks[610] = 4; blocks[611] = 2; blocks[612] = 2; blocks[701] = 2; blocks[702] = 3; blocks[703] = 3; blocks[704] = 3; blocks[705] = 3; blocks[706] = 1; blocks[707] = 2; blocks[708] = 4; blocks[709] = 4; blocks[710] = 4; blocks[711] = 4; blocks[712] = 1; blocks[801] = 2; blocks[802] = 2; blocks[803] = 2; blocks[804] = 2; blocks[805] = 2; blocks[806] = 2; blocks[807] = 2; blocks[808] = 2; blocks[809] = 2; blocks[810] = 2; blocks[811] = 2; blocks[812] = 2; blocks[901] = 8; blocks[902] = 8; blocks[903] = 8; blocks[904] = 8; blocks[905] = 8; blocks[906] = 1; blocks[907] = 2; blocks[908] = 6; blocks[909] = 1; blocks[910] = 2; blocks[911] = 6; blocks[912] = 1; blocks[1001] = 2; blocks[1002] = 8; blocks[1003] = 8; blocks[1004] = 1; blocks[1005] = 2; blocks[1006] = 2; blocks[1007] = 6; blocks[1008] = 1; blocks[1009] = 6; blocks[1010] = 1; blocks[1011] = 6; blocks[1012] = 1; blocks[1101] = 2; blocks[1102] = 2; blocks[1103] = 2; blocks[1104] = 8; blocks[1105] = 1; blocks[1106] = 2; blocks[1107] = 6; blocks[1108] = 1; blocks[1109] = 2; blocks[1110] = 6; blocks[1111] = 1; blocks[1112] = 2; blocks[1201] = 8; blocks[1202] = 8; blocks[1203] = 8; blocks[1204] = 8; blocks[1205] = 8; blocks[1206] = 1; blocks[1207] = 2; blocks[1208] = 2; blocks[1209] = 2; blocks[1210] = 2; blocks[1211] = 2; blocks[1212] = 9;
		} else if (map === 3) {
			blocks[101] = 5; blocks[102] = 7; blocks[103] = 7; blocks[104] = 7; blocks[105] = 7; blocks[106] = 7; blocks[107] = 7; blocks[108] = 7; blocks[109] = 7; blocks[110] = 7; blocks[111] = 2; blocks[112] = 1; blocks[201] = 7; blocks[202] = 10; blocks[203] = 4; blocks[204] = 7; blocks[205] = 7; blocks[206] = 7; blocks[207] = 7; blocks[208] = 7; blocks[209] = 10; blocks[210] = 10; blocks[211] = 4; blocks[212] = 2; blocks[301] = 7; blocks[302] = 10; blocks[303] = 4; blocks[304] = 7; blocks[305] = 7; blocks[306] = 7; blocks[307] = 7; blocks[308] = 7; blocks[309] = 2; blocks[310] = 2; blocks[311] = 10; blocks[312] = 4; blocks[401] = 7; blocks[402] = 10; blocks[403] = 10; blocks[404] = 10; blocks[405] = 10; blocks[406] = 10; blocks[407] = 10; blocks[408] = 10; blocks[409] = 10; blocks[410] = 10; blocks[411] = 4; blocks[412] = 7; blocks[501] = 7; blocks[502] = 10; blocks[503] = 4; blocks[504] = 7; blocks[505] = 7; blocks[506] = 7; blocks[507] = 2; blocks[508] = 2; blocks[509] = 2; blocks[510] = 7; blocks[511] = 7; blocks[512] = 7; blocks[601] = 7; blocks[602] = 10; blocks[603] = 4; blocks[604] = 7; blocks[605] = 7; blocks[606] = 2; blocks[607] = 2; blocks[608] = 2; blocks[609] = 7; blocks[610] = 7; blocks[611] = 7; blocks[612] = 9; blocks[701] = 7; blocks[702] = 7; blocks[703] = 8; blocks[704] = 8; blocks[705] = 8; blocks[706] = 3; blocks[707] = 2; blocks[708] = 7; blocks[709] = 7; blocks[710] = 8; blocks[711] = 3; blocks[712] = 7; blocks[801] = 7; blocks[802] = 8; blocks[803] = 3; blocks[804] = 2; blocks[805] = 2; blocks[806] = 8; blocks[807] = 3; blocks[808] = 7; blocks[809] = 7; blocks[810] = 9; blocks[811] = 8; blocks[812] = 3; blocks[901] = 7; blocks[902] = 8; blocks[903] = 3; blocks[904] = 2; blocks[905] = 2; blocks[906] = 8; blocks[907] = 3; blocks[908] = 7; blocks[909] = 9; blocks[910] = 7; blocks[911] = 8; blocks[912] = 3; blocks[1001] = 7; blocks[1002] = 8; blocks[1003] = 3; blocks[1004] = 2; blocks[1005] = 7; blocks[1006] = 8; blocks[1007] = 3; blocks[1008] = 9; blocks[1009] = 7; blocks[1010] = 7; blocks[1011] = 8; blocks[1012] = 3; blocks[1101] = 2; blocks[1102] = 2; blocks[1103] = 8; blocks[1104] = 3; blocks[1105] = 7; blocks[1106] = 7; blocks[1107] = 8; blocks[1108] = 8; blocks[1109] = 8; blocks[1110] = 8; blocks[1111] = 3; blocks[1112] = 7; blocks[1201] = 1; blocks[1202] = 2; blocks[1203] = 7; blocks[1204] = 7; blocks[1205] = 7; blocks[1206] = 9; blocks[1207] = 7; blocks[1208] = 7; blocks[1209] = 7; blocks[1210] = 7; blocks[1211] = 7; blocks[1212] = 6;
		} else if (map === 4) {
			blocks[101] = 6; blocks[102] = 2; blocks[103] = 2; blocks[104] = 2; blocks[105] = 2; blocks[106] = 2; blocks[107] = 2; blocks[108] = 2; blocks[109] = 2; blocks[110] = 2; blocks[111] = 2; blocks[112] = 5; blocks[201] = 2; blocks[202] = 3; blocks[203] = 4; blocks[204] = 4; blocks[205] = 4; blocks[206] = 3; blocks[207] = 10; blocks[208] = 10; blocks[209] = 10; blocks[210] = 10; blocks[211] = 8; blocks[212] = 2; blocks[301] = 2; blocks[302] = 4; blocks[303] = 4; blocks[304] = 2; blocks[305] = 4; blocks[306] = 4; blocks[307] = 10; blocks[308] = 10; blocks[309] = 10; blocks[310] = 10; blocks[311] = 8; blocks[312] = 2; blocks[401] = 2; blocks[402] = 4; blocks[403] = 2; blocks[404] = 1; blocks[405] = 2; blocks[406] = 4; blocks[407] = 10; blocks[408] = 10; blocks[409] = 10; blocks[410] = 10; blocks[411] = 10; blocks[412] = 2; blocks[501] = 2; blocks[502] = 4; blocks[503] = 4; blocks[504] = 2; blocks[505] = 4; blocks[506] = 4; blocks[507] = 10; blocks[508] = 10; blocks[509] = 10; blocks[510] = 10; blocks[511] = 10; blocks[512] = 2; blocks[601] = 2; blocks[602] = 3; blocks[603] = 4; blocks[604] = 4; blocks[605] = 4; blocks[606] = 3; blocks[607] = 10; blocks[608] = 8; blocks[609] = 10; blocks[610] = 8; blocks[611] = 10; blocks[612] = 2; blocks[701] = 2; blocks[702] = 10; blocks[703] = 10; blocks[704] = 10; blocks[705] = 10; blocks[706] = 10; blocks[707] = 10; blocks[708] = 10; blocks[709] = 8; blocks[710] = 8; blocks[711] = 8; blocks[712] = 2; blocks[801] = 2; blocks[802] = 10; blocks[803] = 10; blocks[804] = 10; blocks[805] = 10; blocks[806] = 10; blocks[807] = 10; blocks[808] = 10; blocks[809] = 10; blocks[810] = 8; blocks[811] = 7; blocks[812] = 2; blocks[901] = 2; blocks[902] = 10; blocks[903] = 10; blocks[904] = 10; blocks[905] = 8; blocks[906] = 10; blocks[907] = 8; blocks[908] = 8; blocks[909] = 8; blocks[910] = 8; blocks[911] = 9; blocks[912] = 2; blocks[1001] = 2; blocks[1002] = 8; blocks[1003] = 10; blocks[1004] = 10; blocks[1005] = 10; blocks[1006] = 8; blocks[1007] = 8; blocks[1008] = 8; blocks[1009] = 8; blocks[1010] = 7; blocks[1011] = 9; blocks[1012] = 2; blocks[1101] = 2; blocks[1102] = 10; blocks[1103] = 8; blocks[1104] = 10; blocks[1105] = 8; blocks[1106] = 8; blocks[1107] = 8; blocks[1108] = 7; blocks[1109] = 8; blocks[1110] = 9; blocks[1111] = 9; blocks[1112] = 2; blocks[1201] = 5; blocks[1202] = 2; blocks[1203] = 2; blocks[1204] = 2; blocks[1205] = 2; blocks[1206] = 2; blocks[1207] = 2; blocks[1208] = 2; blocks[1209] = 2; blocks[1210] = 2; blocks[1211] = 2; blocks[1212] = 6;
		} else if (map === 5) {
			blocks[101] = 1; blocks[102] = 1; blocks[103] = 1; blocks[104] = 2; blocks[105] = 2; blocks[106] = 2; blocks[107] = 2; blocks[108] = 2; blocks[109] = 6; blocks[110] = 6; blocks[111] = 6; blocks[112] = 5; blocks[201] = 7; blocks[202] = 1; blocks[203] = 1; blocks[204] = 2; blocks[205] = 2; blocks[206] = 2; blocks[207] = 6; blocks[208] = 6; blocks[209] = 6; blocks[210] = 6; blocks[211] = 6; blocks[212] = 5; blocks[301] = 7; blocks[302] = 7; blocks[303] = 2; blocks[304] = 2; blocks[305] = 6; blocks[306] = 6; blocks[307] = 6; blocks[308] = 6; blocks[309] = 6; blocks[310] = 6; blocks[311] = 5; blocks[312] = 4; blocks[401] = 7; blocks[402] = 7; blocks[403] = 7; blocks[404] = 2; blocks[405] = 6; blocks[406] = 6; blocks[407] = 6; blocks[408] = 6; blocks[409] = 6; blocks[410] = 6; blocks[411] = 5; blocks[412] = 4; blocks[501] = 7; blocks[502] = 7; blocks[503] = 7; blocks[504] = 7; blocks[505] = 2; blocks[506] = 6; blocks[507] = 6; blocks[508] = 6; blocks[509] = 6; blocks[510] = 6; blocks[511] = 5; blocks[512] = 3; blocks[601] = 1; blocks[602] = 2; blocks[603] = 2; blocks[604] = 7; blocks[605] = 7; blocks[606] = 2; blocks[607] = 2; blocks[608] = 6; blocks[609] = 6; blocks[610] = 5; blocks[611] = 4; blocks[612] = 6; blocks[701] = 1; blocks[702] = 1; blocks[703] = 2; blocks[704] = 2; blocks[705] = 7; blocks[706] = 7; blocks[707] = 7; blocks[708] = 6; blocks[709] = 6; blocks[710] = 5; blocks[711] = 4; blocks[712] = 6; blocks[801] = 7; blocks[802] = 7; blocks[803] = 7; blocks[804] = 2; blocks[805] = 2; blocks[806] = 7; blocks[807] = 9; blocks[808] = 8; blocks[809] = 6; blocks[810] = 5; blocks[811] = 3; blocks[812] = 6; blocks[901] = 7; blocks[902] = 7; blocks[903] = 7; blocks[904] = 7; blocks[905] = 7; blocks[906] = 7; blocks[907] = 7; blocks[908] = 8; blocks[909] = 10; blocks[910] = 5; blocks[911] = 6; blocks[912] = 6; blocks[1001] = 7; blocks[1002] = 7; blocks[1003] = 7; blocks[1004] = 7; blocks[1005] = 7; blocks[1006] = 7; blocks[1007] = 7; blocks[1008] = 9; blocks[1009] = 8; blocks[1010] = 6; blocks[1011] = 6; blocks[1012] = 6; blocks[1101] = 1; blocks[1102] = 2; blocks[1103] = 2; blocks[1104] = 7; blocks[1105] = 7; blocks[1106] = 7; blocks[1107] = 7; blocks[1108] = 7; blocks[1109] = 6; blocks[1110] = 6; blocks[1111] = 6; blocks[1112] = 6; blocks[1201] = 1; blocks[1202] = 1; blocks[1203] = 7; blocks[1204] = 7; blocks[1205] = 7; blocks[1206] = 7; blocks[1207] = 2; blocks[1208] = 2; blocks[1209] = 6; blocks[1210] = 6; blocks[1211] = 6; blocks[1212] = 6;
		} else if (map === 6) {
			blocks[101] = 2; blocks[102] = 2; blocks[103] = 2; blocks[104] = 2; blocks[105] = 2; blocks[106] = 2; blocks[107] = 2; blocks[108] = 2; blocks[109] = 2; blocks[110] = 2; blocks[111] = 2; blocks[112] = 2; blocks[201] = 10; blocks[202] = 10; blocks[203] = 10; blocks[204] = 10; blocks[205] = 10; blocks[206] = 4; blocks[207] = 9; blocks[208] = 6; blocks[209] = 6; blocks[210] = 7; blocks[211] = 6; blocks[212] = 7; blocks[301] = 10; blocks[302] = 4; blocks[303] = 9; blocks[304] = 9; blocks[305] = 10; blocks[306] = 4; blocks[307] = 6; blocks[308] = 7; blocks[309] = 6; blocks[310] = 7; blocks[311] = 6; blocks[312] = 7; blocks[401] = 10; blocks[402] = 4; blocks[403] = 9; blocks[404] = 9; blocks[405] = 10; blocks[406] = 4; blocks[407] = 6; blocks[408] = 7; blocks[409] = 6; blocks[410] = 7; blocks[411] = 6; blocks[412] = 7; blocks[501] = 2; blocks[502] = 10; blocks[503] = 10; blocks[504] = 10; blocks[505] = 4; blocks[506] = 9; blocks[507] = 6; blocks[508] = 7; blocks[509] = 9; blocks[510] = 6; blocks[511] = 7; blocks[512] = 2; blocks[601] = 2; blocks[602] = 9; blocks[603] = 9; blocks[604] = 9; blocks[605] = 9; blocks[606] = 9; blocks[607] = 9; blocks[608] = 9; blocks[609] = 9; blocks[610] = 9; blocks[611] = 9; blocks[612] = 2; blocks[701] = 8; blocks[702] = 8; blocks[703] = 8; blocks[704] = 8; blocks[705] = 3; blocks[706] = 9; blocks[707] = 5; blocks[708] = 1; blocks[709] = 9; blocks[710] = 9; blocks[711] = 9; blocks[712] = 2; blocks[801] = 2; blocks[802] = 9; blocks[803] = 9; blocks[804] = 9; blocks[805] = 8; blocks[806] = 3; blocks[807] = 5; blocks[808] = 1; blocks[809] = 9; blocks[810] = 9; blocks[811] = 9; blocks[812] = 2; blocks[901] = 2; blocks[902] = 9; blocks[903] = 9; blocks[904] = 9; blocks[905] = 8; blocks[906] = 3; blocks[907] = 5; blocks[908] = 5; blocks[909] = 5; blocks[910] = 5; blocks[911] = 5; blocks[912] = 1; blocks[1001] = 8; blocks[1002] = 8; blocks[1003] = 8; blocks[1004] = 8; blocks[1005] = 3; blocks[1006] = 9; blocks[1007] = 5; blocks[1008] = 1; blocks[1009] = 9; blocks[1010] = 9; blocks[1011] = 9; blocks[1012] = 2; blocks[1101] = 2; blocks[1102] = 9; blocks[1103] = 9; blocks[1104] = 9; blocks[1105] = 9; blocks[1106] = 9; blocks[1107] = 5; blocks[1108] = 1; blocks[1109] = 9; blocks[1110] = 9; blocks[1111] = 9; blocks[1112] = 2; blocks[1201] = 2; blocks[1202] = 2; blocks[1203] = 2; blocks[1204] = 2; blocks[1205] = 2; blocks[1206] = 2; blocks[1207] = 2; blocks[1208] = 2; blocks[1209] = 2; blocks[1210] = 2; blocks[1211] = 2; blocks[1212] = 2;
		} else if (map === 7) {
			blocks[101] = 3; blocks[102] = 4; blocks[103] = 5; blocks[104] = 2; blocks[105] = 1; blocks[106] = 6; blocks[107] = 1; blocks[108] = 2; blocks[109] = 9; blocks[110] = 7; blocks[111] = 8; blocks[112] = 10; blocks[201] = 4; blocks[202] = 3; blocks[203] = 4; blocks[204] = 5; blocks[205] = 2; blocks[206] = 1; blocks[207] = 2; blocks[208] = 9; blocks[209] = 7; blocks[210] = 8; blocks[211] = 10; blocks[212] = 8; blocks[301] = 5; blocks[302] = 4; blocks[303] = 3; blocks[304] = 4; blocks[305] = 5; blocks[306] = 2; blocks[307] = 9; blocks[308] = 7; blocks[309] = 8; blocks[310] = 10; blocks[311] = 8; blocks[312] = 7; blocks[401] = 2; blocks[402] = 5; blocks[403] = 4; blocks[404] = 3; blocks[405] = 4; blocks[406] = 5; blocks[407] = 7; blocks[408] = 8; blocks[409] = 10; blocks[410] = 8; blocks[411] = 7; blocks[412] = 9; blocks[501] = 1; blocks[502] = 2; blocks[503] = 5; blocks[504] = 4; blocks[505] = 3; blocks[506] = 7; blocks[507] = 8; blocks[508] = 10; blocks[509] = 8; blocks[510] = 7; blocks[511] = 9; blocks[512] = 2; blocks[601] = 6; blocks[602] = 1; blocks[603] = 2; blocks[604] = 5; blocks[605] = 7; blocks[606] = 8; blocks[607] = 10; blocks[608] = 8; blocks[609] = 7; blocks[610] = 9; blocks[611] = 2; blocks[612] = 1; blocks[701] = 1; blocks[702] = 2; blocks[703] = 9; blocks[704] = 7; blocks[705] = 8; blocks[706] = 10; blocks[707] = 8; blocks[708] = 7; blocks[709] = 5; blocks[710] = 2; blocks[711] = 1; blocks[712] = 6; blocks[801] = 2; blocks[802] = 9; blocks[803] = 7; blocks[804] = 8; blocks[805] = 10; blocks[806] = 8; blocks[807] = 7; blocks[808] = 9; blocks[809] = 4; blocks[810] = 5; blocks[811] = 2; blocks[812] = 1; blocks[901] = 9; blocks[902] = 7; blocks[903] = 8; blocks[904] = 10; blocks[905] = 8; blocks[906] = 7; blocks[907] = 5; blocks[908] = 4; blocks[909] = 3; blocks[910] = 4; blocks[911] = 5; blocks[912] = 2; blocks[1001] = 7; blocks[1002] = 8; blocks[1003] = 10; blocks[1004] = 8; blocks[1005] = 7; blocks[1006] = 9; blocks[1007] = 2; blocks[1008] = 5; blocks[1009] = 4; blocks[1010] = 3; blocks[1011] = 4; blocks[1012] = 5; blocks[1101] = 8; blocks[1102] = 10; blocks[1103] = 8; blocks[1104] = 7; blocks[1105] = 9; blocks[1106] = 2; blocks[1107] = 1; blocks[1108] = 2; blocks[1109] = 5; blocks[1110] = 4; blocks[1111] = 3; blocks[1112] = 4; blocks[1201] = 10; blocks[1202] = 8; blocks[1203] = 7; blocks[1204] = 9; blocks[1205] = 2; blocks[1206] = 1; blocks[1207] = 6; blocks[1208] = 1; blocks[1209] = 2; blocks[1210] = 5; blocks[1211] = 4; blocks[1212] = 3;
		} else if (map === 8) {
			blocks[101] = 2; blocks[102] = 7; blocks[103] = 7; blocks[104] = 7; blocks[105] = 7; blocks[106] = 7; blocks[107] = 2; blocks[108] = 7; blocks[109] = 7; blocks[110] = 7; blocks[111] = 7; blocks[112] = 7; blocks[201] = 7; blocks[202] = 6; blocks[203] = 6; blocks[204] = 6; blocks[205] = 6; blocks[206] = 6; blocks[207] = 7; blocks[208] = 7; blocks[209] = 7; blocks[210] = 6; blocks[211] = 6; blocks[212] = 3; blocks[301] = 7; blocks[302] = 6; blocks[303] = 10; blocks[304] = 6; blocks[305] = 6; blocks[306] = 10; blocks[307] = 6; blocks[308] = 6; blocks[309] = 6; blocks[310] = 6; blocks[311] = 6; blocks[312] = 3; blocks[401] = 7; blocks[402] = 6; blocks[403] = 6; blocks[404] = 6; blocks[405] = 10; blocks[406] = 6; blocks[407] = 6; blocks[408] = 6; blocks[409] = 6; blocks[410] = 6; blocks[411] = 7; blocks[412] = 2; blocks[501] = 7; blocks[502] = 6; blocks[503] = 10; blocks[504] = 6; blocks[505] = 6; blocks[506] = 10; blocks[507] = 6; blocks[508] = 6; blocks[509] = 6; blocks[510] = 6; blocks[511] = 6; blocks[512] = 3; blocks[601] = 7; blocks[602] = 6; blocks[603] = 6; blocks[604] = 6; blocks[605] = 6; blocks[606] = 6; blocks[607] = 7; blocks[608] = 7; blocks[609] = 7; blocks[610] = 6; blocks[611] = 6; blocks[612] = 3; blocks[701] = 2; blocks[702] = 7; blocks[703] = 7; blocks[704] = 7; blocks[705] = 7; blocks[706] = 7; blocks[707] = 9; blocks[708] = 2; blocks[709] = 2; blocks[710] = 7; blocks[711] = 7; blocks[712] = 7; blocks[801] = 2; blocks[802] = 2; blocks[803] = 2; blocks[804] = 2; blocks[805] = 2; blocks[806] = 5; blocks[807] = 9; blocks[808] = 9; blocks[809] = 2; blocks[810] = 2; blocks[811] = 7; blocks[812] = 7; blocks[901] = 2; blocks[902] = 2; blocks[903] = 2; blocks[904] = 5; blocks[905] = 5; blocks[906] = 5; blocks[907] = 5; blocks[908] = 2; blocks[909] = 2; blocks[910] = 2; blocks[911] = 2; blocks[912] = 7; blocks[1001] = 9; blocks[1002] = 9; blocks[1003] = 9; blocks[1004] = 5; blocks[1005] = 5; blocks[1006] = 5; blocks[1007] = 5; blocks[1008] = 5; blocks[1009] = 4; blocks[1010] = 4; blocks[1011] = 4; blocks[1012] = 4; blocks[1101] = 1; blocks[1102] = 9; blocks[1103] = 9; blocks[1104] = 5; blocks[1105] = 5; blocks[1106] = 5; blocks[1107] = 5; blocks[1108] = 5; blocks[1109] = 4; blocks[1110] = 4; blocks[1111] = 4; blocks[1112] = 4; blocks[1201] = 9; blocks[1202] = 8; blocks[1203] = 9; blocks[1204] = 5; blocks[1205] = 5; blocks[1206] = 5; blocks[1207] = 5; blocks[1208] = 5; blocks[1209] = 4; blocks[1210] = 4; blocks[1211] = 4; blocks[1212] = 4;
		} else if (map === 9) {
			blocks[101] = 7; blocks[102] = 3; blocks[103] = 4; blocks[104] = 7; blocks[105] = 5; blocks[106] = 1; blocks[107] = 1; blocks[108] = 1; blocks[109] = 1; blocks[110] = 1; blocks[111] = 2; blocks[112] = 6; blocks[201] = 3; blocks[202] = 4; blocks[203] = 4; blocks[204] = 4; blocks[205] = 5; blocks[206] = 1; blocks[207] = 8; blocks[208] = 1; blocks[209] = 8; blocks[210] = 2; blocks[211] = 8; blocks[212] = 6; blocks[301] = 3; blocks[302] = 4; blocks[303] = 7; blocks[304] = 4; blocks[305] = 4; blocks[306] = 1; blocks[307] = 1; blocks[308] = 1; blocks[309] = 1; blocks[310] = 1; blocks[311] = 2; blocks[312] = 6; blocks[401] = 3; blocks[402] = 3; blocks[403] = 4; blocks[404] = 4; blocks[405] = 4; blocks[406] = 7; blocks[407] = 4; blocks[408] = 5; blocks[409] = 1; blocks[410] = 1; blocks[411] = 8; blocks[412] = 2; blocks[501] = 7; blocks[502] = 3; blocks[503] = 4; blocks[504] = 4; blocks[505] = 4; blocks[506] = 4; blocks[507] = 4; blocks[508] = 5; blocks[509] = 1; blocks[510] = 1; blocks[511] = 1; blocks[512] = 2; blocks[601] = 3; blocks[602] = 3; blocks[603] = 4; blocks[604] = 9; blocks[605] = 4; blocks[606] = 4; blocks[607] = 7; blocks[608] = 1; blocks[609] = 1; blocks[610] = 1; blocks[611] = 8; blocks[612] = 6; blocks[701] = 3; blocks[702] = 3; blocks[703] = 1; blocks[704] = 10; blocks[705] = 1; blocks[706] = 1; blocks[707] = 1; blocks[708] = 1; blocks[709] = 1; blocks[710] = 1; blocks[711] = 2; blocks[712] = 6; blocks[801] = 3; blocks[802] = 3; blocks[803] = 4; blocks[804] = 9; blocks[805] = 4; blocks[806] = 4; blocks[807] = 4; blocks[808] = 4; blocks[809] = 1; blocks[810] = 1; blocks[811] = 8; blocks[812] = 2; blocks[901] = 3; blocks[902] = 7; blocks[903] = 3; blocks[904] = 4; blocks[905] = 4; blocks[906] = 4; blocks[907] = 7; blocks[908] = 4; blocks[909] = 5; blocks[910] = 1; blocks[911] = 1; blocks[912] = 2; blocks[1001] = 3; blocks[1002] = 3; blocks[1003] = 3; blocks[1004] = 4; blocks[1005] = 4; blocks[1006] = 4; blocks[1007] = 1; blocks[1008] = 1; blocks[1009] = 1; blocks[1010] = 1; blocks[1011] = 2; blocks[1012] = 2; blocks[1101] = 3; blocks[1102] = 3; blocks[1103] = 4; blocks[1104] = 7; blocks[1105] = 4; blocks[1106] = 4; blocks[1107] = 4; blocks[1108] = 1; blocks[1109] = 1; blocks[1110] = 1; blocks[1111] = 8; blocks[1112] = 6; blocks[1201] = 3; blocks[1202] = 3; blocks[1203] = 4; blocks[1204] = 4; blocks[1205] = 4; blocks[1206] = 7; blocks[1207] = 4; blocks[1208] = 5; blocks[1209] = 1; blocks[1210] = 2; blocks[1211] = 2; blocks[1212] = 6;
		} else if (map === 10) {
			blocks[101] = 1; blocks[102] = 1; blocks[103] = 2; blocks[104] = 2; blocks[105] = 5; blocks[106] = 5; blocks[107] = 5; blocks[108] = 5; blocks[109] = 5; blocks[110] = 5; blocks[111] = 5; blocks[112] = 5; blocks[201] = 1; blocks[202] = 2; blocks[203] = 5; blocks[204] = 5; blocks[205] = 5; blocks[206] = 5; blocks[207] = 5; blocks[208] = 5; blocks[209] = 5; blocks[210] = 5; blocks[211] = 5; blocks[212] = 5; blocks[301] = 2; blocks[302] = 2; blocks[303] = 5; blocks[304] = 5; blocks[305] = 5; blocks[306] = 5; blocks[307] = 5; blocks[308] = 6; blocks[309] = 6; blocks[310] = 5; blocks[311] = 5; blocks[312] = 5; blocks[401] = 2; blocks[402] = 5; blocks[403] = 5; blocks[404] = 5; blocks[405] = 5; blocks[406] = 6; blocks[407] = 6; blocks[408] = 7; blocks[409] = 7; blocks[410] = 6; blocks[411] = 5; blocks[412] = 5; blocks[501] = 5; blocks[502] = 5; blocks[503] = 5; blocks[504] = 6; blocks[505] = 6; blocks[506] = 6; blocks[507] = 7; blocks[508] = 8; blocks[509] = 8; blocks[510] = 7; blocks[511] = 6; blocks[512] = 5; blocks[601] = 5; blocks[602] = 5; blocks[603] = 6; blocks[604] = 7; blocks[605] = 8; blocks[606] = 7; blocks[607] = 8; blocks[608] = 10; blocks[609] = 8; blocks[610] = 8; blocks[611] = 7; blocks[612] = 6; blocks[701] = 5; blocks[702] = 6; blocks[703] = 7; blocks[704] = 8; blocks[705] = 8; blocks[706] = 9; blocks[707] = 8; blocks[708] = 7; blocks[709] = 8; blocks[710] = 4; blocks[711] = 4; blocks[712] = 4; blocks[801] = 4; blocks[802] = 6; blocks[803] = 7; blocks[804] = 8; blocks[805] = 8; blocks[806] = 7; blocks[807] = 7; blocks[808] = 8; blocks[809] = 4; blocks[810] = 4; blocks[811] = 4; blocks[812] = 3; blocks[901] = 4; blocks[902] = 4; blocks[903] = 4; blocks[904] = 6; blocks[905] = 7; blocks[906] = 4; blocks[907] = 4; blocks[908] = 4; blocks[909] = 4; blocks[910] = 3; blocks[911] = 3; blocks[912] = 3; blocks[1001] = 4; blocks[1002] = 4; blocks[1003] = 4; blocks[1004] = 4; blocks[1005] = 4; blocks[1006] = 4; blocks[1007] = 3; blocks[1008] = 3; blocks[1009] = 3; blocks[1010] = 3; blocks[1011] = 3; blocks[1012] = 3; blocks[1101] = 4; blocks[1102] = 4; blocks[1103] = 4; blocks[1104] = 4; blocks[1105] = 4; blocks[1106] = 3; blocks[1107] = 3; blocks[1108] = 3; blocks[1109] = 3; blocks[1110] = 3; blocks[1111] = 3; blocks[1112] = 3; blocks[1201] = 4; blocks[1202] = 4; blocks[1203] = 4; blocks[1204] = 3; blocks[1205] = 3; blocks[1206] = 3; blocks[1207] = 3; blocks[1208] = 3; blocks[1209] = 3; blocks[1210] = 3; blocks[1211] = 3; blocks[1212] = 3;
		} else if (map === 11) {
			blocks[101] = 5; blocks[102] = 5; blocks[103] = 5; blocks[104] = 4; blocks[105] = 2; blocks[106] = 2; blocks[107] = 8; blocks[108] = 2; blocks[109] = 2; blocks[110] = 2; blocks[111] = 10; blocks[112] = 8; blocks[201] = 5; blocks[202] = 5; blocks[203] = 6; blocks[204] = 5; blocks[205] = 5; blocks[206] = 2; blocks[207] = 2; blocks[208] = 10; blocks[209] = 2; blocks[210] = 2; blocks[211] = 2; blocks[212] = 2; blocks[301] = 2; blocks[302] = 5; blocks[303] = 5; blocks[304] = 5; blocks[305] = 6; blocks[306] = 5; blocks[307] = 5; blocks[308] = 2; blocks[309] = 2; blocks[310] = 7; blocks[311] = 5; blocks[312] = 2; blocks[401] = 10; blocks[402] = 4; blocks[403] = 2; blocks[404] = 7; blocks[405] = 2; blocks[406] = 5; blocks[407] = 6; blocks[408] = 5; blocks[409] = 5; blocks[410] = 5; blocks[411] = 3; blocks[412] = 2; blocks[501] = 2; blocks[502] = 4; blocks[503] = 2; blocks[504] = 2; blocks[505] = 10; blocks[506] = 2; blocks[507] = 2; blocks[508] = 5; blocks[509] = 6; blocks[510] = 6; blocks[511] = 9; blocks[512] = 3; blocks[601] = 4; blocks[602] = 2; blocks[603] = 2; blocks[604] = 1; blocks[605] = 2; blocks[606] = 2; blocks[607] = 10; blocks[608] = 2; blocks[609] = 5; blocks[610] = 4; blocks[611] = 4; blocks[612] = 5; blocks[701] = 4; blocks[702] = 2; blocks[703] = 1; blocks[704] = 9; blocks[705] = 9; blocks[706] = 2; blocks[707] = 8; blocks[708] = 2; blocks[709] = 4; blocks[710] = 10; blocks[711] = 4; blocks[712] = 3; blocks[801] = 2; blocks[802] = 1; blocks[803] = 1; blocks[804] = 1; blocks[805] = 9; blocks[806] = 9; blocks[807] = 3; blocks[808] = 4; blocks[809] = 4; blocks[810] = 3; blocks[811] = 3; blocks[812] = 3; blocks[901] = 2; blocks[902] = 1; blocks[903] = 1; blocks[904] = 1; blocks[905] = 9; blocks[906] = 3; blocks[907] = 4; blocks[908] = 8; blocks[909] = 4; blocks[910] = 3; blocks[911] = 3; blocks[912] = 4; blocks[1001] = 3; blocks[1002] = 2; blocks[1003] = 1; blocks[1004] = 1; blocks[1005] = 3; blocks[1006] = 4; blocks[1007] = 4; blocks[1008] = 10; blocks[1009] = 4; blocks[1010] = 4; blocks[1011] = 3; blocks[1012] = 2; blocks[1101] = 3; blocks[1102] = 3; blocks[1103] = 4; blocks[1104] = 4; blocks[1105] = 4; blocks[1106] = 4; blocks[1107] = 4; blocks[1108] = 4; blocks[1109] = 4; blocks[1110] = 4; blocks[1111] = 3; blocks[1112] = 3; blocks[1201] = 2; blocks[1202] = 4; blocks[1203] = 4; blocks[1204] = 8; blocks[1205] = 2; blocks[1206] = 10; blocks[1207] = 4; blocks[1208] = 4; blocks[1209] = 7; blocks[1210] = 4; blocks[1211] = 3; blocks[1212] = 3;
		} else if (map === 12) {
			blocks[101] = 5; blocks[102] = 2; blocks[103] = 3; blocks[104] = 8; blocks[105] = 2; blocks[106] = 2; blocks[107] = 9; blocks[108] = 2; blocks[109] = 2; blocks[110] = 3; blocks[111] = 2; blocks[112] = 8; blocks[201] = 2; blocks[202] = 2; blocks[203] = 2; blocks[204] = 2; blocks[205] = 1; blocks[206] = 2; blocks[207] = 2; blocks[208] = 4; blocks[209] = 10; blocks[210] = 2; blocks[211] = 2; blocks[212] = 2; blocks[301] = 9; blocks[302] = 2; blocks[303] = 10; blocks[304] = 2; blocks[305] = 2; blocks[306] = 6; blocks[307] = 2; blocks[308] = 2; blocks[309] = 2; blocks[310] = 2; blocks[311] = 9; blocks[312] = 2; blocks[401] = 2; blocks[402] = 2; blocks[403] = 2; blocks[404] = 2; blocks[405] = 2; blocks[406] = 7; blocks[407] = 2; blocks[408] = 2; blocks[409] = 8; blocks[410] = 2; blocks[411] = 5; blocks[412] = 2; blocks[501] = 2; blocks[502] = 4; blocks[503] = 2; blocks[504] = 8; blocks[505] = 2; blocks[506] = 2; blocks[507] = 2; blocks[508] = 2; blocks[509] = 2; blocks[510] = 2; blocks[511] = 2; blocks[512] = 1; blocks[601] = 10; blocks[602] = 2; blocks[603] = 2; blocks[604] = 2; blocks[605] = 2; blocks[606] = 2; blocks[607] = 10; blocks[608] = 2; blocks[609] = 4; blocks[610] = 2; blocks[611] = 7; blocks[612] = 2; blocks[701] = 2; blocks[702] = 1; blocks[703] = 2; blocks[704] = 2; blocks[705] = 6; blocks[706] = 2; blocks[707] = 2; blocks[708] = 1; blocks[709] = 2; blocks[710] = 6; blocks[711] = 2; blocks[712] = 3; blocks[801] = 3; blocks[802] = 2; blocks[803] = 5; blocks[804] = 2; blocks[805] = 2; blocks[806] = 2; blocks[807] = 2; blocks[808] = 2; blocks[809] = 9; blocks[810] = 2; blocks[811] = 2; blocks[812] = 2; blocks[901] = 2; blocks[902] = 2; blocks[903] = 2; blocks[904] = 2; blocks[905] = 4; blocks[906] = 2; blocks[907] = 5; blocks[908] = 2; blocks[909] = 2; blocks[910] = 2; blocks[911] = 2; blocks[912] = 6; blocks[1001] = 2; blocks[1002] = 7; blocks[1003] = 2; blocks[1004] = 2; blocks[1005] = 8; blocks[1006] = 2; blocks[1007] = 2; blocks[1008] = 2; blocks[1009] = 4; blocks[1010] = 2; blocks[1011] = 7; blocks[1012] = 2; blocks[1101] = 2; blocks[1102] = 2; blocks[1103] = 10; blocks[1104] = 2; blocks[1105] = 2; blocks[1106] = 2; blocks[1107] = 6; blocks[1108] = 2; blocks[1109] = 2; blocks[1110] = 1; blocks[1111] = 2; blocks[1112] = 2; blocks[1201] = 7; blocks[1202] = 2; blocks[1203] = 2; blocks[1204] = 2; blocks[1205] = 3; blocks[1206] = 2; blocks[1207] = 2; blocks[1208] = 2; blocks[1209] = 9; blocks[1210] = 2; blocks[1211] = 5; blocks[1212] = 2;
		} else if (map === 13) {
			blocks[101] = 9; blocks[102] = 9; blocks[103] = 9; blocks[104] = 9; blocks[105] = 9; blocks[106] = 9; blocks[107] = 9; blocks[108] = 9; blocks[109] = 3; blocks[110] = 1; blocks[111] = 8; blocks[112] = 10; blocks[201] = 9; blocks[202] = 9; blocks[203] = 7; blocks[204] = 7; blocks[205] = 9; blocks[206] = 9; blocks[207] = 9; blocks[208] = 9; blocks[209] = 4; blocks[210] = 1; blocks[211] = 8; blocks[212] = 10; blocks[301] = 9; blocks[302] = 9; blocks[303] = 7; blocks[304] = 7; blocks[305] = 9; blocks[306] = 9; blocks[307] = 9; blocks[308] = 9; blocks[309] = 4; blocks[310] = 1; blocks[311] = 8; blocks[312] = 10; blocks[401] = 9; blocks[402] = 9; blocks[403] = 9; blocks[404] = 9; blocks[405] = 9; blocks[406] = 9; blocks[407] = 9; blocks[408] = 9; blocks[409] = 5; blocks[410] = 1; blocks[411] = 8; blocks[412] = 10; blocks[501] = 9; blocks[502] = 9; blocks[503] = 9; blocks[504] = 9; blocks[505] = 9; blocks[506] = 9; blocks[507] = 9; blocks[508] = 9; blocks[509] = 5; blocks[510] = 1; blocks[511] = 8; blocks[512] = 10; blocks[601] = 9; blocks[602] = 9; blocks[603] = 9; blocks[604] = 9; blocks[605] = 9; blocks[606] = 9; blocks[607] = 9; blocks[608] = 9; blocks[609] = 6; blocks[610] = 2; blocks[611] = 8; blocks[612] = 10; blocks[701] = 9; blocks[702] = 9; blocks[703] = 9; blocks[704] = 9; blocks[705] = 9; blocks[706] = 9; blocks[707] = 9; blocks[708] = 9; blocks[709] = 6; blocks[710] = 2; blocks[711] = 8; blocks[712] = 10; blocks[801] = 9; blocks[802] = 9; blocks[803] = 9; blocks[804] = 9; blocks[805] = 9; blocks[806] = 9; blocks[807] = 9; blocks[808] = 6; blocks[809] = 2; blocks[810] = 2; blocks[811] = 8; blocks[812] = 10; blocks[901] = 9; blocks[902] = 9; blocks[903] = 9; blocks[904] = 9; blocks[905] = 9; blocks[906] = 2; blocks[907] = 2; blocks[908] = 2; blocks[909] = 2; blocks[910] = 2; blocks[911] = 2; blocks[912] = 10; blocks[1001] = 9; blocks[1002] = 9; blocks[1003] = 9; blocks[1004] = 9; blocks[1005] = 2; blocks[1006] = 2; blocks[1007] = 2; blocks[1008] = 2; blocks[1009] = 2; blocks[1010] = 2; blocks[1011] = 2; blocks[1012] = 2; blocks[1101] = 9; blocks[1102] = 9; blocks[1103] = 9; blocks[1104] = 9; blocks[1105] = 9; blocks[1106] = 9; blocks[1107] = 2; blocks[1108] = 2; blocks[1109] = 2; blocks[1110] = 2; blocks[1111] = 2; blocks[1112] = 10; blocks[1201] = 9; blocks[1202] = 9; blocks[1203] = 9; blocks[1204] = 9; blocks[1205] = 9; blocks[1206] = 9; blocks[1207] = 9; blocks[1208] = 6; blocks[1209] = 2; blocks[1210] = 2; blocks[1211] = 8; blocks[1212] = 10;
		} else if (map === 14) {
			blocks[101] = 7; blocks[102] = 7; blocks[103] = 7; blocks[104] = 7; blocks[105] = 7; blocks[106] = 2; blocks[107] = 2; blocks[108] = 2; blocks[109] = 2; blocks[110] = 2; blocks[111] = 2; blocks[112] = 3; blocks[201] = 7; blocks[202] = 7; blocks[203] = 2; blocks[204] = 2; blocks[205] = 2; blocks[206] = 2; blocks[207] = 2; blocks[208] = 2; blocks[209] = 2; blocks[210] = 3; blocks[211] = 3; blocks[212] = 3; blocks[301] = 2; blocks[302] = 2; blocks[303] = 1; blocks[304] = 1; blocks[305] = 1; blocks[306] = 2; blocks[307] = 2; blocks[308] = 2; blocks[309] = 5; blocks[310] = 3; blocks[311] = 4; blocks[312] = 3; blocks[401] = 1; blocks[402] = 9; blocks[403] = 9; blocks[404] = 9; blocks[405] = 9; blocks[406] = 9; blocks[407] = 2; blocks[408] = 5; blocks[409] = 5; blocks[410] = 4; blocks[411] = 3; blocks[412] = 3; blocks[501] = 1; blocks[502] = 9; blocks[503] = 9; blocks[504] = 1; blocks[505] = 9; blocks[506] = 9; blocks[507] = 9; blocks[508] = 9; blocks[509] = 5; blocks[510] = 3; blocks[511] = 3; blocks[512] = 3; blocks[601] = 1; blocks[602] = 9; blocks[603] = 9; blocks[604] = 9; blocks[605] = 8; blocks[606] = 8; blocks[607] = 1; blocks[608] = 9; blocks[609] = 6; blocks[610] = 3; blocks[611] = 3; blocks[612] = 4; blocks[701] = 1; blocks[702] = 1; blocks[703] = 9; blocks[704] = 1; blocks[705] = 9; blocks[706] = 8; blocks[707] = 1; blocks[708] = 9; blocks[709] = 5; blocks[710] = 4; blocks[711] = 4; blocks[712] = 4; blocks[801] = 2; blocks[802] = 1; blocks[803] = 1; blocks[804] = 9; blocks[805] = 9; blocks[806] = 9; blocks[807] = 9; blocks[808] = 5; blocks[809] = 5; blocks[810] = 4; blocks[811] = 4; blocks[812] = 4; blocks[901] = 2; blocks[902] = 2; blocks[903] = 1; blocks[904] = 1; blocks[905] = 2; blocks[906] = 2; blocks[907] = 2; blocks[908] = 2; blocks[909] = 5; blocks[910] = 4; blocks[911] = 4; blocks[912] = 4; blocks[1001] = 7; blocks[1002] = 2; blocks[1003] = 2; blocks[1004] = 2; blocks[1005] = 2; blocks[1006] = 2; blocks[1007] = 2; blocks[1008] = 2; blocks[1009] = 2; blocks[1010] = 2; blocks[1011] = 4; blocks[1012] = 4; blocks[1101] = 7; blocks[1102] = 7; blocks[1103] = 7; blocks[1104] = 7; blocks[1105] = 2; blocks[1106] = 2; blocks[1107] = 2; blocks[1108] = 2; blocks[1109] = 2; blocks[1110] = 2; blocks[1111] = 2; blocks[1112] = 4; blocks[1201] = 7; blocks[1202] = 7; blocks[1203] = 7; blocks[1204] = 7; blocks[1205] = 7; blocks[1206] = 7; blocks[1207] = 7; blocks[1208] = 7; blocks[1209] = 7; blocks[1210] = 2; blocks[1211] = 2; blocks[1212] = 2;
		} else if (map === 15) {
			blocks[101] = 1; blocks[102] = 2; blocks[103] = 1; blocks[104] = 1; blocks[105] = 1; blocks[106] = 1; blocks[107] = 1; blocks[108] = 1; blocks[109] = 1; blocks[110] = 1; blocks[111] = 1; blocks[112] = 9; blocks[201] = 1; blocks[202] = 1; blocks[203] = 1; blocks[204] = 1; blocks[205] = 3; blocks[206] = 4; blocks[207] = 4; blocks[208] = 3; blocks[209] = 1; blocks[210] = 1; blocks[211] = 2; blocks[212] = 1; blocks[301] = 2; blocks[302] = 1; blocks[303] = 1; blocks[304] = 3; blocks[305] = 4; blocks[306] = 4; blocks[307] = 4; blocks[308] = 3; blocks[309] = 3; blocks[310] = 1; blocks[311] = 1; blocks[312] = 1; blocks[401] = 1; blocks[402] = 1; blocks[403] = 3; blocks[404] = 4; blocks[405] = 3; blocks[406] = 4; blocks[407] = 5; blocks[408] = 4; blocks[409] = 4; blocks[410] = 4; blocks[411] = 1; blocks[412] = 1; blocks[501] = 1; blocks[502] = 3; blocks[503] = 6; blocks[504] = 6; blocks[505] = 6; blocks[506] = 6; blocks[507] = 5; blocks[508] = 5; blocks[509] = 5; blocks[510] = 5; blocks[511] = 5; blocks[512] = 1; blocks[601] = 1; blocks[602] = 4; blocks[603] = 4; blocks[604] = 6; blocks[605] = 6; blocks[606] = 6; blocks[607] = 6; blocks[608] = 5; blocks[609] = 5; blocks[610] = 5; blocks[611] = 5; blocks[612] = 1; blocks[701] = 1; blocks[702] = 4; blocks[703] = 6; blocks[704] = 6; blocks[705] = 6; blocks[706] = 6; blocks[707] = 5; blocks[708] = 6; blocks[709] = 5; blocks[710] = 6; blocks[711] = 6; blocks[712] = 1; blocks[801] = 1; blocks[802] = 5; blocks[803] = 5; blocks[804] = 6; blocks[805] = 6; blocks[806] = 5; blocks[807] = 6; blocks[808] = 5; blocks[809] = 5; blocks[810] = 6; blocks[811] = 6; blocks[812] = 1; blocks[901] = 1; blocks[902] = 1; blocks[903] = 5; blocks[904] = 6; blocks[905] = 5; blocks[906] = 5; blocks[907] = 5; blocks[908] = 5; blocks[909] = 5; blocks[910] = 6; blocks[911] = 1; blocks[912] = 1; blocks[1001] = 1; blocks[1002] = 1; blocks[1003] = 1; blocks[1004] = 5; blocks[1005] = 5; blocks[1006] = 5; blocks[1007] = 5; blocks[1008] = 5; blocks[1009] = 5; blocks[1010] = 1; blocks[1011] = 7; blocks[1012] = 7; blocks[1101] = 1; blocks[1102] = 1; blocks[1103] = 2; blocks[1104] = 1; blocks[1105] = 5; blocks[1106] = 5; blocks[1107] = 5; blocks[1108] = 5; blocks[1109] = 1; blocks[1110] = 7; blocks[1111] = 7; blocks[1112] = 8; blocks[1201] = 1; blocks[1202] = 9; blocks[1203] = 1; blocks[1204] = 1; blocks[1205] = 1; blocks[1206] = 1; blocks[1207] = 1; blocks[1208] = 1; blocks[1209] = 1; blocks[1210] = 7; blocks[1211] = 8; blocks[1212] = 10;
		}

		type = Math.floor(Math.random() * (9 - 1 + 1) + 1); //(最大-最小+1)+最小
		for (var i = 0; i < 13; i++) {
			for (var j = 0; j < 13; j++) {
				if (blocks[i * 100 + j] > 0) {
					blocks[i * 100 + j] = blocks[i * 100 + j] + type;
					if (blocks[i * 100 + j] > 10) {
						blocks[i * 100 + j] -= 10;
					}
				}
			}
		}

		for (var i = 0; i < 13; i++) {
			for (var j = 0; j < 13; j++) {
				block[i * 100 + j] = new lib.blocks();
				block[i * 100 + j].x = i * 50 - 25;
				block[i * 100 + j].y = j * 50 - 25;
				if (blocks[i * 100 + j] === 0) {
					block[i * 100 + j].gotoAndPlay("air");
				} else if (blocks[i * 100 + j] === 1) {
					block[i * 100 + j].gotoAndPlay("gray");
				} else if (blocks[i * 100 + j] === 2) {
					block[i * 100 + j].gotoAndPlay("sliver");
				} else if (blocks[i * 100 + j] === 3) {
					block[i * 100 + j].gotoAndPlay("purple");
				} else if (blocks[i * 100 + j] === 4) {
					block[i * 100 + j].gotoAndPlay("dark_blue");
				} else if (blocks[i * 100 + j] === 5) {
					block[i * 100 + j].gotoAndPlay("blue");
				} else if (blocks[i * 100 + j] === 6) {
					block[i * 100 + j].gotoAndPlay("green");
				} else if (blocks[i * 100 + j] === 7) {
					block[i * 100 + j].gotoAndPlay("yellow");
				} else if (blocks[i * 100 + j] === 8) {
					block[i * 100 + j].gotoAndPlay("orange");
				} else if (blocks[i * 100 + j] === 9) {
					block[i * 100 + j].gotoAndPlay("pink");
				} else if (blocks[i * 100 + j] === 10) {
					block[i * 100 + j].gotoAndPlay("red");
				} else {
					block[i * 100 + j].gotoAndPlay("air");
				}
				exportRoot.addChildAt(block[i * 100 + j], 0);
			}
		}

		colorChange();
	}

	//手機板
	function touchdownMove(e) {
		//console.log(e.keyCode);

		if (end) return reset();

		//Player1

		if (!canplay) return;

		if (e === 37) {
			udlr = true;
			step = STEP * -1;
			isKeyDown = true;
			robot.gotoAndPlay("left");
			if (player1_x === 1) return;
			moveFn();
		} else if (e === 38) {
			udlr = false;
			step = STEP * -1;
			isKeyDown = true;
			robot.gotoAndPlay("up");
			if (player1_y === 1) return;
			moveFn();
		} else if (e === 39) {
			udlr = true;
			step = STEP;
			isKeyDown = true;
			robot.gotoAndPlay("right");
			if (player1_x === 12) return;
			moveFn();
		} else if (e === 40) {
			udlr = false;
			step = STEP;
			isKeyDown = true;
			robot.gotoAndPlay("down");
			if (player1_y === 12) return;
			moveFn();
		} else if (e === 191 && blocks[(player1_x) * 100 + (player1_y)] != 100) {
			var tnt = new lib.tnt();
			tnt.x = robot.x;
			tnt.y = robot.y;
			let data = [];
			data.push((player1_x) * 100 + (player1_y));
			blocks[(player1_x) * 100 + (player1_y)] = 100;
			tnt.gotoAndPlay("shing");
			exportRoot.addChild(tnt);
			createjs.Sound.play("fuse");
			setTimeout(function () {
				let location = data.shift();
				tnt.gotoAndPlay("explore");
				blocks[location] = 0;
				createjs.Sound.play(explore_sound());
				setTimeout(function () { exportRoot.removeChild(tnt); }, 500);
				if (!canplay) return;
				let u = location - 1;
				let d = location + 1;
				let l = location - 100;
				let r = location + 100;
				if (location === (player1_x) * 100 + (player1_y)) p1die++;
				if (location === (player2_x) * 100 + (player2_y)) p2die++;
				if (u === (player1_x) * 100 + (player1_y)) p1die++;
				if (u === (player2_x) * 100 + (player2_y)) p2die++;
				if (d === (player1_x) * 100 + (player1_y)) p1die++;
				if (d === (player2_x) * 100 + (player2_y)) p2die++;
				if (l === (player1_x) * 100 + (player1_y)) p1die++;
				if (l === (player2_x) * 100 + (player2_y)) p2die++;
				if (r === (player1_x) * 100 + (player1_y)) p1die++;
				if (r === (player2_x) * 100 + (player2_y)) p2die++;
				die_detect();
			}, 2500);

		}

		//Player2
		if (e === 65) {
			udlr2 = true;
			step2 = STEP * -1;
			isKeyDown = true;
			robot2.gotoAndPlay("left");
			if (player2_x === 1) return;
			moveFn2();
		} else if (e === 87) {
			udlr2 = false;
			step2 = STEP * -1;
			isKeyDown = true;
			robot2.gotoAndPlay("up");
			if (player2_y === 1) return;
			moveFn2();
		} else if (e === 68) {
			udlr2 = true;
			step2 = STEP;
			isKeyDown = true;
			robot2.gotoAndPlay("right");
			if (player2_x === 12) return;
			moveFn2();
		} else if (e === 83) {
			udlr2 = false;
			step2 = STEP;
			isKeyDown = true;
			robot2.gotoAndPlay("down");
			if (player2_y === 12) return;
			moveFn2();
		} else if (e === 71 && blocks[(player2_x) * 100 + (player2_y)] != 100) {
			var tnt2 = new lib.tnt();
			tnt2.x = robot2.x;
			tnt2.y = robot2.y;
			let data2 = [];
			data2.push((player2_x) * 100 + (player2_y));
			blocks[(player2_x) * 100 + (player2_y)] = 100;
			tnt2.gotoAndPlay("shing");
			exportRoot.addChild(tnt2);
			createjs.Sound.play("fuse");
			setTimeout(function () {
				let location2 = data2.shift();
				tnt2.gotoAndPlay("explore");
				blocks[location2] = 0;
				setTimeout(function () { exportRoot.removeChild(tnt2); }, 500);
				if (!canplay) return;
				createjs.Sound.play(explore_sound());
				let u2 = location2 - 1;
				let d2 = location2 + 1;
				let l2 = location2 - 100;
				let r2 = location2 + 100;
				if (location2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (location2 === (player2_x) * 100 + (player2_y)) p2die++;
				if (u2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (u2 === (player2_x) * 100 + (player2_y)) p2die++;
				if (d2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (d2 === (player2_x) * 100 + (player2_y)) p2die++;
				if (l2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (l2 === (player2_x) * 100 + (player2_y)) p2die++;
				if (r2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (r2 === (player2_x) * 100 + (player2_y)) p2die++;
				die_detect();

			}, 2500);

		}
		document.querySelector(".left1").onclick = null;
		document.querySelector(".up1").onclick = null;
		document.querySelector(".right1").onclick = null;
		document.querySelector(".down1").onclick = null;
		document.querySelector(".tnt1").onclick = null;
		document.querySelector(".left2").onclick = null;
		document.querySelector(".up2").onclick = null;
		document.querySelector(".right2").onclick = null;
		document.querySelector(".down2").onclick = null;
		document.querySelector(".tnt2").onclick = null;

	}

	function explore_sound() {
		let exp = Math.floor(Math.random() * (4 - 1 + 1) + 1);
		if (exp === 1) return "exp1";
		if (exp === 2) return "exp2";
		if (exp === 3) return "exp3";
		if (exp === 4) return "exp4";
	}


	//左上右下37~40
	function keydownMoveFn(e) {
		//console.log(e.keyCode);
		if (end) return reset();
		//Player1

		if (!canplay) return;

		if (e.keyCode === 37) {
			udlr = true;
			step = STEP * -1;
			isKeyDown = true;
			robot.gotoAndPlay("left");
			if (player1_x === 1) return;
			moveFn();
		} else if (e.keyCode === 38) {
			udlr = false;
			step = STEP * -1;
			isKeyDown = true;
			robot.gotoAndPlay("up");
			if (player1_y === 1) return;
			moveFn();
		} else if (e.keyCode === 39) {
			udlr = true;
			step = STEP;
			isKeyDown = true;
			robot.gotoAndPlay("right");
			if (player1_x === 12) return;
			moveFn();
		} else if (e.keyCode === 40) {
			udlr = false;
			step = STEP;
			isKeyDown = true;
			robot.gotoAndPlay("down");
			if (player1_y === 12) return;
			moveFn();
		} else if (e.keyCode === 191 && blocks[(player1_x) * 100 + (player1_y)] != 100) {
			var tnt = new lib.tnt();
			tnt.x = robot.x;
			tnt.y = robot.y;
			let data = [];
			data.push((player1_x) * 100 + (player1_y));
			blocks[(player1_x) * 100 + (player1_y)] = 100;
			tnt.gotoAndPlay("shing");
			exportRoot.addChild(tnt);
			createjs.Sound.play("fuse");
			setTimeout(function () {
				let location = data.shift();
				tnt.gotoAndPlay("explore");
				blocks[location] = 0;
				createjs.Sound.play(explore_sound());
				setTimeout(function () { exportRoot.removeChild(tnt); }, 500);
				if (!canplay) return;
				console.log(p1die)
				let u = location - 1;
				let d = location + 1;
				let l = location - 100;
				let r = location + 100;
				if (location === (player1_x) * 100 + (player1_y)) p1die++;
				if (location === (player2_x) * 100 + (player2_y)) p2die++;
				if (u === (player1_x) * 100 + (player1_y)) p1die++;
				if (u === (player2_x) * 100 + (player2_y)) p2die++;
				if (d === (player1_x) * 100 + (player1_y)) p1die++;
				if (d === (player2_x) * 100 + (player2_y)) p2die++;
				if (l === (player1_x) * 100 + (player1_y)) p1die++;
				if (l === (player2_x) * 100 + (player2_y)) p2die++;
				if (r === (player1_x) * 100 + (player1_y)) p1die++;
				if (r === (player2_x) * 100 + (player2_y)) p2die++;
				die_detect();
			}, 2500);

		}

		//Player2
		if (e.keyCode === 65) {
			udlr2 = true;
			step2 = STEP * -1;
			isKeyDown = true;
			robot2.gotoAndPlay("left");
			if (player2_x === 1) return;
			moveFn2();
		} else if (e.keyCode === 87) {
			udlr2 = false;
			step2 = STEP * -1;
			isKeyDown = true;
			robot2.gotoAndPlay("up");
			if (player2_y === 1) return;
			moveFn2();
		} else if (e.keyCode === 68) {
			udlr2 = true;
			step2 = STEP;
			isKeyDown = true;
			robot2.gotoAndPlay("right");
			if (player2_x === 12) return;
			moveFn2();
		} else if (e.keyCode === 83) {
			udlr2 = false;
			step2 = STEP;
			isKeyDown = true;
			robot2.gotoAndPlay("down");
			if (player2_y === 12) return;
			moveFn2();
		} else if (e.keyCode === 71 && blocks[(player2_x) * 100 + (player2_y)] != 100) {
			var tnt2 = new lib.tnt();
			tnt2.x = robot2.x;
			tnt2.y = robot2.y;
			let data2 = [];
			data2.push((player2_x) * 100 + (player2_y));
			blocks[(player2_x) * 100 + (player2_y)] = 100;
			tnt2.gotoAndPlay("shing");
			exportRoot.addChild(tnt2);
			createjs.Sound.play("fuse");
			setTimeout(function () {
				let location2 = data2.shift();
				tnt2.gotoAndPlay("explore");
				blocks[location2] = 0;
				createjs.Sound.play(explore_sound());
				setTimeout(function () { exportRoot.removeChild(tnt2); }, 500);
				if (!canplay) return;
				console.log(p1die)
				let u2 = location2 - 1;
				let d2 = location2 + 1;
				let l2 = location2 - 100;
				let r2 = location2 + 100;
				if (location2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (location2 === (player2_x) * 100 + (player2_y)) p2die++;
				if (u2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (u2 === (player2_x) * 100 + (player2_y)) p2die++;
				if (d2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (d2 === (player2_x) * 100 + (player2_y)) p2die++;
				if (l2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (l2 === (player2_x) * 100 + (player2_y)) p2die++;
				if (r2 === (player1_x) * 100 + (player1_y)) p1die++;
				if (r2 === (player2_x) * 100 + (player2_y)) p2die++;
				die_detect();

			}, 2500);

		}

	}

	function keyupMoveFn(e) {
		isKeyDown = false;
	}

	//createjs.Ticker.addEventListener("tick", tickFn)
	function moveFn() {

		if (!isKeyDown) return;
		if (udlr) {
			player1_x += step / 50
			robot.x += step;
		} else {
			player1_y += step / 50
			robot.y += step;
		}
		//console.log("("+player1_x+","+player1_y+")");
	}
	function moveFn2() {

		if (!isKeyDown) return;
		if (udlr2) {
			player2_x += step2 / 50
			robot2.x += step2;
		} else {
			player2_y += step2 / 50
			robot2.y += step2;
		}
		//console.log("(" + player2_x + "," + player2_y + ")");
	}

	function die_detect() {
		if (!canplay) return;
		if (p1die && p2die) {
			if (gold_count === score1 + score2) {
				if (score1 - score2 === 0) {
					canplay = false;
					document.getElementById("win").classList.remove("win");
					document.getElementById("win").innerHTML = "WTF?"
					document.getElementById("win").classList.add("drew");
				} else if (score1 - score2 > 0) {
					canplay = false;
					document.getElementById("win").classList.remove("win");
					document.getElementById("win").classList.add("p1win");
				} else {
					canplay = false;
					document.getElementById("win").classList.remove("win");
					document.getElementById("win").classList.add("p2win");
				}
				end_detect();
				return;
			}
			canplay = false;
			robot.gotoAndPlay("explore");
			robot2.gotoAndPlay("explore");
			document.getElementById("win").classList.remove("win");
			document.getElementById("win").innerHTML = "drew"
			document.getElementById("win").classList.add("drew");
			end_detect();
			return;
		} else if (p1die) {
			canplay = false;
			robot.gotoAndPlay("explore");
			document.getElementById("win").classList.remove("win");
			document.getElementById("win").classList.add("p2win");
			end_detect();
			return;
		} else if (p2die) {
			canplay = false;
			robot2.gotoAndPlay("explore");
			document.getElementById("win").classList.remove("win");
			document.getElementById("win").classList.add("p1win");
			end_detect();
			return;
		}
		if (gold_count === score1 + score2) {
			if (score1 - score2 === 0) {
				canplay = false;
				document.getElementById("win").classList.remove("win");
				document.getElementById("win").innerHTML = "drew"
				document.getElementById("win").classList.add("drew");
			} else if (score1 - score2 > 0) {
				canplay = false;
				document.getElementById("win").classList.remove("win");
				document.getElementById("win").classList.add("p1win");
			} else {
				canplay = false;
				document.getElementById("win").classList.remove("win");
				document.getElementById("win").classList.add("p2win");
			}
			end_detect();
		}


	}
	function end_detect() {
		if (!canplay) {
			document.getElementById("reload_back").innerHTML = "按任意鍵重置遊戲";
			document.getElementById("reload").innerHTML = "按任意鍵重置遊戲";
			document.getElementById("reload_back").style.display = "block";
			document.getElementById("reload").style.display = "block";
			end = true;
			bgAudio.stop();
		}
	}

	function colorChange() {
		let last_aim = aim;
		aim = Math.floor(Math.random() * (10 - 1 + 1) + 1); //(最大-最小+1)+最小
		if (aim === last_aim) return colorChange();
		if (aim === 0) {
			pointblock.gotoAndPlay("air");
		} else if (aim === 1) {
			pointblock.gotoAndPlay("gray");
		} else if (aim === 2) {
			pointblock.gotoAndPlay("sliver");
		} else if (aim === 3) {
			pointblock.gotoAndPlay("purple");
		} else if (aim === 4) {
			pointblock.gotoAndPlay("dark_blue");
		} else if (aim === 5) {
			pointblock.gotoAndPlay("blue");
		} else if (aim === 6) {
			pointblock.gotoAndPlay("green");
		} else if (aim === 7) {
			pointblock.gotoAndPlay("yellow");
		} else if (aim === 8) {
			pointblock.gotoAndPlay("orange");
		} else if (aim === 9) {
			pointblock.gotoAndPlay("pink");
		} else if (aim === 10) {
			pointblock.gotoAndPlay("red");
		}
		createjs.Sound.play("point");
	}













	//Registers the "tick" event listener.
	fnStartAnimation = function () {
		stage.addChild(exportRoot);
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage)
		stage.addEventListener("tick", handleTick)
		function getProjectionMatrix(container, totalDepth) {
			var focalLength = 528.25;
			var projectionCenter = { x: lib.properties.width / 2, y: lib.properties.height / 2 };
			var scale = (totalDepth + focalLength) / focalLength;
			var scaleMat = new createjs.Matrix2D;
			scaleMat.a = 1 / scale;
			scaleMat.d = 1 / scale;
			var projMat = new createjs.Matrix2D;
			projMat.tx = -projectionCenter.x;
			projMat.ty = -projectionCenter.y;
			projMat = projMat.prependMatrix(scaleMat);
			projMat.tx += projectionCenter.x;
			projMat.ty += projectionCenter.y;
			return projMat;
		}
		function handleTick(event) {
			var cameraInstance = exportRoot.___camera___instance;
			if (cameraInstance !== undefined && cameraInstance.pinToObject !== undefined) {
				cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
				cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
				if (cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
					cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
			}
			applyLayerZDepth(exportRoot);
		}
		function applyLayerZDepth(parent) {
			var cameraInstance = parent.___camera___instance;
			var focalLength = 528.25;
			var projectionCenter = { 'x': 0, 'y': 0 };
			if (parent === exportRoot) {
				var stageCenter = { 'x': lib.properties.width / 2, 'y': lib.properties.height / 2 };
				projectionCenter.x = stageCenter.x;
				projectionCenter.y = stageCenter.y;
			}
			for (child in parent.children) {
				var layerObj = parent.children[child];
				if (layerObj == cameraInstance)
					continue;
				applyLayerZDepth(layerObj, cameraInstance);
				if (layerObj.layerDepth === undefined)
					continue;
				if (layerObj.currentFrame != layerObj.parent.currentFrame) {
					layerObj.gotoAndPlay(layerObj.parent.currentFrame);
				}
				var matToApply = new createjs.Matrix2D;
				var cameraMat = new createjs.Matrix2D;
				var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
				var cameraDepth = 0;
				if (cameraInstance && !layerObj.isAttachedToCamera) {
					var mat = cameraInstance.getMatrix();
					mat.tx -= projectionCenter.x;
					mat.ty -= projectionCenter.y;
					cameraMat = mat.invert();
					cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
					cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
					if (cameraInstance.depth)
						cameraDepth = cameraInstance.depth;
				}
				if (layerObj.depth) {
					totalDepth = layerObj.depth;
				}
				//Offset by camera depth
				totalDepth -= cameraDepth;
				if (totalDepth < -focalLength) {
					matToApply.a = 0;
					matToApply.d = 0;
				}
				else {
					if (layerObj.layerDepth) {
						var sizeLockedMat = getProjectionMatrix(parent, layerObj.layerDepth);
						if (sizeLockedMat) {
							sizeLockedMat.invert();
							matToApply.prependMatrix(sizeLockedMat);
						}
					}
					matToApply.prependMatrix(cameraMat);
					var projMat = getProjectionMatrix(parent, totalDepth);
					if (projMat) {
						matToApply.prependMatrix(projMat);
					}
				}
				layerObj.transformMatrix = matToApply;
			}
		}
	}
	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {
		var lastW, lastH, lastS = 1;
		window.addEventListener('resize', resizeCanvas);
		resizeCanvas();
		function resizeCanvas() {
			var w = lib.properties.width, h = lib.properties.height;
			var iw = window.innerWidth, ih = window.innerHeight;
			var pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
			if (isResp) {
				if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
					sRatio = lastS;
				}
				else if (!isScale) {
					if (iw < w || ih < h)
						sRatio = Math.min(xRatio, yRatio);
				}
				else if (scaleType == 1) {
					sRatio = Math.min(xRatio, yRatio);
				}
				else if (scaleType == 2) {
					sRatio = Math.max(xRatio, yRatio);
				}
			}
			canvas.width = w * pRatio * sRatio;
			canvas.height = h * pRatio * sRatio;
			canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
			canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
			stage.scaleX = pRatio * sRatio;
			stage.scaleY = pRatio * sRatio;
			lastW = iw; lastH = ih; lastS = sRatio;
			stage.tickOnUpdate = false;
			stage.update();
			stage.tickOnUpdate = true;
		}
	}
	makeResponsive(false, 'both', false, 1);
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}