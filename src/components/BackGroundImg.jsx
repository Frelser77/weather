const getBackgroundImage = (weatherMain) => {
	switch (weatherMain) {
		case "Thunderstorm":
			return "url(/img/bg-thunderstorm.png)";
		case "Drizzle":
			return "url(/img/bg-drizzle.png)";
		case "Rain":
			return "url(/img/bg-rain.png)";
		case "Snow":
			return "url(/img/bg-snow.png)";
		case "Mist":
			return "url(/img/bg-mist.png)";
		case "Smoke":
			return "url(/img/bg-smoke.png)";
		case "Haze":
			return "url(/img/bg-haze.png)";
		case "Dust":
			return "url(/img/bg-dust.png)";
		case "Fog":
			return "url(/img/bg-fog.png)";
		case "Sand":
			return "url(/img/bg-sand.png)";
		case "Ash":
			return "url(/img/bg-ash.png)";
		case "Squall":
			return "url(/img/bg-squall.png)";
		case "Tornado":
			return "url(/img/bg-tornado.png)";
		case "Clear":
			return "url(/img/bg-clear.png)";
		case "Clouds":
			return "url(/img/bg-clouds.png)";
		default:
			return "url(/img/bg-default.png)";
	}
};

export default getBackgroundImage;
