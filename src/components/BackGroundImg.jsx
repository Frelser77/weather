const getBackgroundImage = (weatherMain) => {
	switch (weatherMain) {
		case "Thunderstorm":
			return `url(/img/bg-thunderstorm.png)`;
		case "Drizzle":
			return "url(/img/bg-drizzle.png)";
		case "Rain":
			return "url(/img/bg-rain.jpg)";
		case "Snow":
			return `/img/bg-snow.jpg`;
		case "Mist":
			return `/img/bg-mist.jpg`;
		case "Smoke":
			return `/img/bg-smoke.jpg`;
		case "Haze":
			return `/img/bg-haze.jpg`;
		case "Dust":
			return `/img/bg-dust.jpg`;
		case "Fog":
			return `/img/bg-fog.jpg`;
		case "Sand":
			return `/img/bg-sand.jpg`;
		case "Ash":
			return `/img/bg-ash.jpg`;
		case "Squall":
			return `/img/bg-squall.jpg`;
		case "Tornado":
			return `/img/bg-tornado.jpg`;
		case "Clear":
			return `/img/bg-sun.jpg`;
		case "Clouds":
			return "url(/img/bg-scatteredClouds.jpg)";
		default:
			return "url(/images/default.jpg)";
	}
};
// console.log(getBackgroundImage("Thunderstorm"));

export default getBackgroundImage;
