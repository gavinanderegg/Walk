/* */
var map, geocoder;
var locationPoints = [];
var lines = [];
var currentPosition = null;


// 0
// 547800
// 620400
// 343200
// 250800
// 514800
// 4488000
// 1392600
// 158400


var offices = [
	{
		"name": "MT&L Halifax",
		"location": "1701 Hollis St, NS, Canada",
		"description": "1701 Hollis St, Nova Scotia",
		"steps": 0,
		"lat": 44.647546,
		"lng": -63.5727746,
		"latlng": null
	},
	{
		"name": "MT&L Saint John",
		"location": "75 Prince Street, NB, Canada",
		"description": "75 Prince Street, New Brunswick",
		"steps": 547800,
		"lat": 45.2726012,
		"lng": -66.0622764,
		"latlng": null
	},
	{
		"name": "NATIONAL Quebec City",
		"location": "140 Grande Allée Est, Québec, QC G1R 5N2, Canada",
		"description": "140 Grande All&eacute;e Est, Qu&eacute;bec",
		"steps": 620400,
		"lat": 46.803204,
		"lng": -71.222197,
		"latlng": null
	},
	{
		"name": "NATIONAL Montreal",
		"location": "2001 McGill College Avenue, QC, Canada",
		"description": "2001 McGill College Avenue, Qu&eacute;bec",
		"steps": 343200,
		"lat": 45.503369,
		"lng": -73.574216,
		"latlng": null
	},
	{
		"name": "NATIONAL Ottawa",
		"location": "130 Slater Street, ON, Canada",
		"description": "130 Slater Street, Ontario",
		"steps": 250800,
		"lat": 45.4205993,
		"lng": -75.6966188,
		"latlng": null
	},
	{
		"name": "NATIONAL Toronto",
		"location": "310 Front Street West, ON, Canada",
		"description": "310 Front Street West, Ontario",
		"steps": 514800,
		"lat": 43.6436895,
		"lng": -79.3900288,
		"latlng": null
	},
	{
		"name": "NATIONAL Calgary",
		"location": "800 6th Avenue South, AB, Canada",
		"description": "800 6th Avenue South, Alberta",
		"steps": 4488000,
		"lat": 51.047933,
		"lng": -114.0787925,
		"latlng": null
	},
	{
		"name": "NATIONAL Vancouver",
		"location": "505 Burrard Street, BC, Canada",
		"description": "505 Burrard Street, British Columbia",
		"steps": 1392600,
		"lat": 49.2864812,
		"lng": -123.1179966,
		"latlng": null
	},
	{
		"name": "NATIONAL Victoria",
		"location": "931 Fort Street, BC, Canada",
		"description": "931 Fort Street, British Columbia",
		"steps": 158400,
		"lat": 48.4237976,
		"lng": -123.3586232,
		"latlng": null
	},
	
	
	
	{
		"name": "NATIONAL Vancouver",
		"location": "505 Burrard Street, BC, Canada",
		"description": "505 Burrard Street, British Columbia",
		"steps": 158400,
		"lat": 49.2864812,
		"lng": -123.1179966,
		"latlng": null
	},
	{
		"name": "NATIONAL Calgary",
		"location": "800 6th Avenue South, AB, Canada",
		"description": "800 6th Avenue South, Alberta",
		"steps": 1392600,
		"lat": 51.047933,
		"lng": -114.0787925,
		"latlng": null
	},
	{
		"name": "NATIONAL Toronto",
		"location": "310 Front Street West, ON, Canada",
		"description": "310 Front Street West, Ontario",
		"steps": 4488000,
		"lat": 43.6436895,
		"lng": -79.3900288,
		"latlng": null
	},
	{
		"name": "NATIONAL Ottawa",
		"location": "130 Slater Street, ON, Canada",
		"description": "130 Slater Street, Ontario",
		"steps": 514800,
		"lat": 45.4205993,
		"lng": -75.6966188,
		"latlng": null
	},
	{
		"name": "NATIONAL Montreal",
		"location": "2001 McGill College Avenue, QC, Canada",
		"description": "2001 McGill College Avenue, Qu&eacute;bec",
		"steps": 250800,
		"lat": 45.503369,
		"lng": -73.574216,
		"latlng": null
	},
	{
		"name": "NATIONAL Quebec City",
		"location": "140 Grande Allée Est, Québec, QC G1R 5N2, Canada",
		"description": "140 Grande All&eacute;e Est, Qu&eacute;bec",
		"steps": 343200,
		"lat": 46.803204,
		"lng": -71.222197,
		"latlng": null
	},
	{
		"name": "MT&L Saint John",
		"location": "75 Prince Street, NB, Canada",
		"description": "75 Prince Street, New Brunswick",
		"steps": 620400,
		"lat": 45.2726012,
		"lng": -66.0622764, // 208.34
		"latlng": null
	},
	{
		"name": "MT&L Halifax",
		"location": "1701 Hollis St, NS, Canada",
		"description": "1701 Hollis St, Nova Scotia",
		"steps": 547800,  // 547800 / 208.34 = 2629.35586061246040126715
		"lat": 44.647546,
		"lng": -63.5727746,
		"latlng": null
	},
	{
		"name": "Axon London",
		"location": "1701 Hollis St, NS, Canada",
		"description": "1701 Hollis St, Nova Scotia",
		"steps": 12165609,
		"lat": 51.4585025,
		"lng": -0.3067224, // 4626.84 * 2629.35586061246040126715 = 12165608.87011615628299890030
		"latlng": null
	}
];



function initialize() {
	geocoder = new google.maps.Geocoder();
	
	var latlng = new google.maps.LatLng(52, -94);
	var myOptions = {
		zoom: 4,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.ANDROID,
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		center: latlng,
		mapTypeId: google.maps.MapTypeId.SATELLITE // ROADMAP, TERRAIN
	};
	
	map = new google.maps.Map(document.getElementById('map'), myOptions);
	
	$(offices).each(function(key, value) {
		var latlng = new google.maps.LatLng(value.lat, value.lng);
		
		value.latlng = latlng;
		
		drawLocation(latlng, value.name, value.description);
	});
}



function drawLocation(latlng, name, description) {
	var newMarker = new google.maps.Marker({
		position: latlng,
		map: map,
		draggable: false
	});
	
	var contentString = '<div class="infoWindow"><strong>' + name + '</strong>'
		+ '<p>' + description + '</p></div>';
	
	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		disableAutoPan: true,
		maxWidth: 380
	});
	
	google.maps.event.addListener(newMarker, 'click', function() {
		for (var x = 0; x < locationPoints.length; x++) {
			locationPoints[x].info.close();
		}
		
		infowindow.open(map, newMarker);
	});
	
	locationPoints.push({'marker': newMarker, 'info': infowindow});
}



// function drawLine(point1, point2) {
// 	var line = new google.maps.Polyline({
// 		path: [point, point],
// 		strokeColor: "#8800BB",
// 		strokeOpacity: 0.6,
// 		strokeWeight: 4,
// 		map: map
// 	});
// 	
// 	lines.push(line);
// }



function halfPoint(point1, point2, percent, done) {
	if (typeof(percent) === 'undefined') {
		percent = 0.5;
	}
	
	midLat = 0;
	midLng = 0;
	
	midLat = ((point2.lat() - point1.lat()) * percent) + point1.lat();
	midLng = ((point2.lng() - point1.lng()) * percent) + point1.lng();
	
	var latlng = new google.maps.LatLng(midLat, midLng);
	
	if (done) {
		currentPosition = new google.maps.Marker({
			position: latlng,
			map: map,
			draggable: false,
			icon: 'http://www.google.com/mapfiles/dd-start.png'
		});
	}
	
	// halfPoint(new google.maps.LatLng(offices[5].lat, offices[5].lng), new google.maps.LatLng(offices[6].lat, offices[6].lng), 0.5)
	
	var line = new google.maps.Polyline({
		path: [point1, latlng],
		strokeColor: "#88FF88",
		strokeOpacity: 0.8,
		strokeWeight: 10,
		map: map
	});
	
	lines.push(line);
}



// function stepsTo(key) {
// 	var totalSteps = 0;
// 	
// 	for (var x = 0; x <= key; x++) {
// 		totalSteps += offices[x].steps;
// 	}
// 	
// 	return totalSteps;
// }



function walk(steps, done) {
	var totalSteps = 0;
	var lastStop = 0;
	var lastPassed;
	
	$(offices).each(function(key, value) {
		totalSteps += value.steps;
		
		if (steps > totalSteps) {
			lastPassed = key;
			
			lastStop += value.steps;
		}
	});
	
	var walkArray = []; // new google.maps.MVCArray;
	
	for (var x = 0; x <= lastPassed; x++) {
		walkArray.push(new google.maps.LatLng(offices[x].lat, offices[x].lng));
	}
	
	// if (lastPassed < 9) {
	// 	color = "#ff776b";
	// } else {
	// 	color = "#CCC";
	// }
	// 
	// var line = new google.maps.Polyline({
	// 	path: walkArray,
	// 	strokeColor: color,
	// 	strokeOpacity: 0.8,
	// 	strokeWeight: 6,
	// 	map: map
	// });
	// 
	// lines.push(line);
	
	if (lastPassed < offices.length) {
		var nextSteps = lastStop + offices[lastPassed + 1].steps;
		
		var p = (steps - lastStop) / (nextSteps - lastStop);
		
		halfPoint(new google.maps.LatLng(offices[lastPassed].lat, offices[lastPassed].lng), new google.maps.LatLng(offices[lastPassed + 1].lat, offices[lastPassed + 1].lng), p, done);
	}
}






// http://maps.google.com/mapfiles/arrow.png
// https://sites.google.com/site/gmapicons/



/* SETUP */
$(document).ready(function() {
	var steps = 15995476;
	
	initialize();
	
	var aSteps = 0;
	
	var intervalID = window.setInterval(animateWalk, 50);
	
	function animateWalk() {
		$('#count').html(aSteps).digits();
		
		if (currentPosition != null) {
			currentPosition.setMap(null);
		}
		
		if (aSteps >= steps) {
			$('#count').html('15995476').digits();
			
			window.clearInterval(intervalID);
			return;
		}
		
		if (lines.length > 0) {
			$(lines).each(function(key, value) {
				value.setMap(null);
			});
			
			lines.splice(0);
		}
		
		walk(aSteps);
		
		aSteps += 50000 - 5519;
	}
});


$.fn.digits = function() {
	return this.each(function() {
		$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	});
};

