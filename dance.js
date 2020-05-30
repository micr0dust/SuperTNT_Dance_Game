(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"dance_atlas_", frames: [[0,0,1500,1499]]},
		{name:"dance_atlas_2", frames: [[1890,510,100,100],[1890,612,100,100],[1890,714,100,100],[1890,816,100,100],[1073,1720,100,100],[1890,306,100,100],[1890,408,100,100],[1890,102,100,100],[1890,204,100,100],[1890,0,100,100],[0,1501,640,480],[858,1720,213,176],[858,1501,210,217],[1070,1501,210,217],[1282,1501,217,210],[1282,1713,217,210],[1502,1008,502,386],[1502,1396,502,386],[1502,504,386,502],[1502,0,386,502],[642,1501,214,394],[0,0,1500,1499]]}
];


// symbols:



(lib.CachedTexturedBitmap_26 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_28 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_30 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_32 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_34 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_36 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_38 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_40 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_42 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_44 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.die = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.explosion = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.mach1 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.mach2 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.mach3 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.mach4 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.R1 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.R2 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.R3 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.R4 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.score_background = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.tnt1 = function() {
	this.initialize(ss["dance_atlas_"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.tnt2 = function() {
	this.initialize(ss["dance_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.tnt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{explore:0,shing:10});

	// timeline functions:
	this.frame_8 = function() {
		this.stop()
	}
	this.frame_9 = function() {
		this.stop();
	}
	this.frame_28 = function() {
		this.gotoAndPlay("shing");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(8).call(this.frame_8).wait(1).call(this.frame_9).wait(19).call(this.frame_28).wait(1));

	// 圖層_1
	this.instance = new lib.explosion();
	this.instance.parent = this;
	this.instance.setTransform(-36,-29,0.3287,0.3284);

	this.instance_1 = new lib.explosion();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-15,-29,0.2388,0.2891);

	this.instance_2 = new lib.explosion();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-26,-16,0.2388,0.2891);

	this.instance_3 = new lib.explosion();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-26,-39,0.2388,0.2891);

	this.instance_4 = new lib.explosion();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-38,-29,0.2388,0.2891);

	this.instance_5 = new lib.explosion();
	this.instance_5.parent = this;
	this.instance_5.setTransform(8,-29,0.2388,0.2891);

	this.instance_6 = new lib.explosion();
	this.instance_6.parent = this;
	this.instance_6.setTransform(-26,0,0.2388,0.2891);

	this.instance_7 = new lib.explosion();
	this.instance_7.parent = this;
	this.instance_7.setTransform(-26,-58,0.2388,0.2891);

	this.instance_8 = new lib.explosion();
	this.instance_8.parent = this;
	this.instance_8.setTransform(-64,-29,0.2388,0.2891);

	this.instance_9 = new lib.tnt1();
	this.instance_9.parent = this;
	this.instance_9.setTransform(-25,-26,0.0333,0.0334);
	this.instance_9._off = true;

	this.instance_10 = new lib.tnt2();
	this.instance_10.parent = this;
	this.instance_10.setTransform(-25,-26,0.0334,0.0334);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{scaleX:0.3287,scaleY:0.3284,x:-36}}]}).to({state:[{t:this.instance_4,p:{x:-38,y:-29}},{t:this.instance_3,p:{y:-39}},{t:this.instance_2,p:{y:-16,x:-26}},{t:this.instance_1,p:{x:-15,y:-29}},{t:this.instance,p:{scaleX:0.2388,scaleY:0.2891,x:-26}}]},1).to({state:[{t:this.instance_4,p:{x:-43,y:-29}},{t:this.instance_3,p:{y:-39}},{t:this.instance_2,p:{y:-14,x:-26}},{t:this.instance_1,p:{x:-9,y:-29}},{t:this.instance,p:{scaleX:0.2388,scaleY:0.2891,x:-26}}]},1).to({state:[{t:this.instance_4,p:{x:-52,y:-28}},{t:this.instance_3,p:{y:-56}},{t:this.instance_2,p:{y:-7,x:-27}},{t:this.instance_1,p:{x:-3,y:-29}},{t:this.instance,p:{scaleX:0.2388,scaleY:0.2891,x:-26}}]},1).to({state:[{t:this.instance_8,p:{x:-64}},{t:this.instance_7,p:{y:-58}},{t:this.instance_6,p:{y:0}},{t:this.instance_5,p:{x:8}},{t:this.instance_4,p:{x:-51,y:-29}},{t:this.instance_3,p:{y:-18}},{t:this.instance_2,p:{y:-29,x:0}},{t:this.instance_1,p:{x:-26,y:-43}},{t:this.instance,p:{scaleX:0.2388,scaleY:0.2891,x:-26}}]},1).to({state:[{t:this.instance_8,p:{x:-77}},{t:this.instance_7,p:{y:-74}},{t:this.instance_6,p:{y:13}},{t:this.instance_5,p:{x:25}},{t:this.instance_4,p:{x:-51,y:-29}},{t:this.instance_3,p:{y:-12}},{t:this.instance_2,p:{y:-29,x:0}},{t:this.instance_1,p:{x:-26,y:-49}},{t:this.instance,p:{scaleX:0.2388,scaleY:0.2891,x:-26}}]},1).to({state:[{t:this.instance_8,p:{x:-77}},{t:this.instance_7,p:{y:-74}},{t:this.instance_6,p:{y:13}},{t:this.instance_5,p:{x:25}},{t:this.instance_4,p:{x:-51,y:-29}},{t:this.instance_3,p:{y:-12}},{t:this.instance_2,p:{y:-29,x:0}},{t:this.instance_1,p:{x:-26,y:-49}},{t:this.instance,p:{scaleX:0.2388,scaleY:0.2891,x:-26}}]},1).to({state:[{t:this.instance_8,p:{x:-77}},{t:this.instance_7,p:{y:-74}},{t:this.instance_6,p:{y:13}},{t:this.instance_5,p:{x:25}},{t:this.instance_4,p:{x:-51,y:-29}},{t:this.instance_3,p:{y:-12}},{t:this.instance_2,p:{y:-29,x:0}},{t:this.instance_1,p:{x:-26,y:-49}},{t:this.instance,p:{scaleX:0.2388,scaleY:0.2891,x:-26}}]},1).to({state:[{t:this.instance_8,p:{x:-77}},{t:this.instance_7,p:{y:-74}},{t:this.instance_6,p:{y:13}},{t:this.instance_5,p:{x:25}},{t:this.instance_4,p:{x:-51,y:-29}},{t:this.instance_3,p:{y:-12}},{t:this.instance_2,p:{y:-29,x:0}},{t:this.instance_1,p:{x:-26,y:-49}},{t:this.instance,p:{scaleX:0.2388,scaleY:0.2891,x:-26}}]},1).to({state:[]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(10).to({_off:false},0).wait(9).to({_off:true},1).wait(9));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(20).to({_off:false},0).wait(9));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77,-74,152.9,137.9);


(lib.roboter2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{up:0,down:2,right:4,left:6,"explore":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}
	this.frame_3 = function() {
		this.stop();
	}
	this.frame_4 = function() {
		this.stop();
	}
	this.frame_5 = function() {
		this.stop();
	}
	this.frame_6 = function() {
		this.stop();
	}
	this.frame_7 = function() {
		this.stop();
	}
	this.frame_27 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(20).call(this.frame_27).wait(1));

	// 圖層_1
	this.instance = new lib.mach1();
	this.instance.parent = this;
	this.instance.setTransform(-25,-23,0.238,0.2304);

	this.instance_1 = new lib.mach2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-25,-27,0.2381,0.2304);

	this.instance_2 = new lib.mach3();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-27,-25,0.2304,0.2381);

	this.instance_3 = new lib.mach4();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-24,-25,0.2304,0.2381);

	this.instance_4 = new lib.die();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-26,-28,0.0781,0.1042);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[]},19).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27,-28,53,55);


(lib.roboter = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"up":0,"down":2,"right":4,"left":6,"explore":8});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}
	this.frame_3 = function() {
		this.stop();
	}
	this.frame_4 = function() {
		this.stop();
	}
	this.frame_5 = function() {
		this.stop();
	}
	this.frame_6 = function() {
		this.stop();
	}
	this.frame_7 = function() {
		this.stop();
	}
	this.frame_27 = function() {
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(20).call(this.frame_27).wait(1));

	// 圖層_1
	this.instance = new lib.R1();
	this.instance.parent = this;
	this.instance.setTransform(-24,-19,0.0996,0.0996);

	this.instance_1 = new lib.R2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-26,-19,0.0996,0.0996);

	this.instance_2 = new lib.R3();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-20,-25,0.0997,0.0996);

	this.instance_3 = new lib.R4();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-19,-25,0.0995,0.0996);

	this.instance_4 = new lib.die();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-25,-28,0.0781,0.1042);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1,p:{x:-26}}]},1).to({state:[{t:this.instance_1,p:{x:-25}}]},1).to({state:[{t:this.instance_2,p:{scaleX:0.0997,x:-20,y:-25}}]},1).to({state:[{t:this.instance_2,p:{scaleX:0.0995,x:-19,y:-24}}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[]},19).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26,-28,52,54);


(lib.blocks = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{red:0,"red":1,pink:2,"pink":3,orange:4,"orange":5,yellow:6,"yellow":7,green:8,"green":9,blue:10,"blue":11,dark_blue:12,"dark_blue":13,purple:14,"purple":15,sliver:16,"sliver":17,gray:18,"gray":19});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}
	this.frame_3 = function() {
		this.stop();
	}
	this.frame_4 = function() {
		this.stop();
	}
	this.frame_5 = function() {
		this.stop();
	}
	this.frame_6 = function() {
		this.stop();
	}
	this.frame_7 = function() {
		this.stop();
	}
	this.frame_8 = function() {
		this.stop();
	}
	this.frame_9 = function() {
		this.stop();
	}
	this.frame_10 = function() {
		this.stop();
	}
	this.frame_11 = function() {
		this.stop();
	}
	this.frame_12 = function() {
		this.stop();
	}
	this.frame_13 = function() {
		this.stop();
	}
	this.frame_14 = function() {
		this.stop();
	}
	this.frame_15 = function() {
		this.stop();
	}
	this.frame_16 = function() {
		this.stop();
	}
	this.frame_17 = function() {
		this.stop();
	}
	this.frame_18 = function() {
		this.stop();
	}
	this.frame_19 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(1).call(this.frame_8).wait(1).call(this.frame_9).wait(1).call(this.frame_10).wait(1).call(this.frame_11).wait(1).call(this.frame_12).wait(1).call(this.frame_13).wait(1).call(this.frame_14).wait(1).call(this.frame_15).wait(1).call(this.frame_16).wait(1).call(this.frame_17).wait(1).call(this.frame_18).wait(1).call(this.frame_19).wait(1));

	// 圖層_1
	this.instance = new lib.CachedTexturedBitmap_26();
	this.instance.parent = this;
	this.instance.setTransform(-25,-25,0.5,0.5);

	this.instance_1 = new lib.CachedTexturedBitmap_28();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-25,-25,0.5,0.5);

	this.instance_2 = new lib.CachedTexturedBitmap_30();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-25,-25,0.5,0.5);

	this.instance_3 = new lib.CachedTexturedBitmap_32();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-25,-25,0.5,0.5);

	this.instance_4 = new lib.CachedTexturedBitmap_34();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-25,-25,0.5,0.5);

	this.instance_5 = new lib.CachedTexturedBitmap_36();
	this.instance_5.parent = this;
	this.instance_5.setTransform(-25,-25,0.5,0.5);

	this.instance_6 = new lib.CachedTexturedBitmap_38();
	this.instance_6.parent = this;
	this.instance_6.setTransform(-25,-25,0.5,0.5);

	this.instance_7 = new lib.CachedTexturedBitmap_40();
	this.instance_7.parent = this;
	this.instance_7.setTransform(-25,-25,0.5,0.5);

	this.instance_8 = new lib.CachedTexturedBitmap_42();
	this.instance_8.parent = this;
	this.instance_8.setTransform(-25,-25,0.5,0.5);

	this.instance_9 = new lib.CachedTexturedBitmap_44();
	this.instance_9.parent = this;
	this.instance_9.setTransform(-25,-25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25,-25,50,50);


(lib.場景_1_圖層_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層_1
	this.instance = new lib.score_background();
	this.instance.parent = this;
	this.instance.setTransform(600,0,1.1215,1.5228);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.場景_1_圖層_1, null, null);


// stage content:
(lib.dance = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.getNumChildren() - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// 圖層_1_obj_
	this.圖層_1 = new lib.場景_1_圖層_1();
	this.圖層_1.name = "圖層_1";
	this.圖層_1.parent = this;
	this.圖層_1.setTransform(720,299.9,1,1,0,0,0,720,299.9);
	this.圖層_1.depth = 0;
	this.圖層_1.isAttachedToCamera = 0
	this.圖層_1.isAttachedToMask = 0
	this.圖層_1.layerDepth = 0
	this.圖層_1.layerIndex = 0
	this.圖層_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.圖層_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1020,300,-180,300);
// library properties:
lib.properties = {
	id: 'B3C702FB945454448F8F5D400140133E',
	width: 840,
	height: 600,
	fps: 24,
	color: "#FFCC99",
	opacity: 1.00,
	manifest: [
		{src:"images/dance_atlas_.png?1590836370466", id:"dance_atlas_"},
		{src:"images/dance_atlas_2.png?1590836370499", id:"dance_atlas_2"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['B3C702FB945454448F8F5D400140133E'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


// Layer depth API : 

AdobeAn.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;