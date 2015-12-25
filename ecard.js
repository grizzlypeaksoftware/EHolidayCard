var ECard = function () { };
ECard.prototype.InitSnowStorm = function () {
	this.SkyWidth = 600;
	this.SkyHeight = 400;
	this.StormIntensity = 6;
	this.Message = "Happy Holidays!";	

	this.counter = 0;

	this.CloudBank = this.GenerateFlurry();

	this.Sky = document.getElementById("greetings");

	if (this.Sky.getContext) {
		var ctx = this.Sky.getContext('2d');

		var that = this;

		setInterval(function () {
			that.DumpSnow(ctx);
		}, 10);

	} else {
		// canvas-unsupported code here
		alert("Sorry, can't display the card, please try a modern browser such as Chrome.");
	}	
};

ECard.prototype.GenerateFlurry = function () {

	var cloudBank = [];
	var flakeTypes = ["BFlakeBig.png", "LBFlakeBig.png", "WFlakeBig.png", "BFlakeSmall.png", "LBFlakeSmall.png", "WFlakeSmall.png" ];

	for (var i = 0; i < this.StormIntensity; i++) {

		// random between 0 and cloudbank.length
		var cloudbankImage = flakeTypes[Math.floor((Math.random() * flakeTypes.length))];

		// random between 0 and width;
		var xLoc = Math.floor((Math.random() * this.SkyWidth));		

		// random between 0 and width;
		var yLoc = Math.floor((Math.random() * this.SkyHeight));

		var gravity = Math.floor((Math.random() * 4) + 1);
		var drift = Math.floor((Math.random() * 4));

		var snowFlake = {};
		snowFlake.image = new Image();
		snowFlake.image.src = cloudbankImage;
		snowFlake.x = xLoc;
		snowFlake.y = yLoc;
		snowFlake.gravity = gravity;
		snowFlake.drift = drift;
		cloudBank.push(snowFlake);
	}
	return cloudBank;
};

ECard.prototype.DumpSnow = function (ctx) {

	this.PaintSky(ctx);

	for (var i = 0 ; i < this.CloudBank.length; i++) {
		var flake = this.CloudBank[i];
		if (flake && ctx) {
			this.PrecipitateFlake(flake, ctx);
		}
	}

	this.DisplayMessage(ctx);

};

ECard.prototype.PrecipitateFlake = function (flake, ctx) {	

	flake.y = flake.y + flake.gravity;

	if (flake.y > this.SkyHeight) {
		flake.y = -200;
		flake.x = Math.floor((Math.random() * this.SkyWidth));
	}
	
	ctx.drawImage(flake.image, flake.x, flake.y);
};


ECard.prototype.PaintSky = function (ctx) {
	var lingrad = ctx.createLinearGradient(0, 0, 0, 400);
	lingrad.addColorStop(0, '#4280c3');
	lingrad.addColorStop(1, '#45bbed');
	ctx.fillStyle = lingrad;
	ctx.fillRect(0, 0, this.SkyWidth, this.SkyHeight);
};

ECard.prototype.DisplayMessage = function (ctx) {
	ctx.font = "36px Arial";
	ctx.fillStyle = "rgba(26, 49, 18,1)";	
	ctx.fillText(this.Message, 165, 200);
};

$(document).ready(function () {
	var card = new ECard();
	card.InitSnowStorm();	
});