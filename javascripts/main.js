"use strict";  

let apiKeys = {};

let weatherList = (searchText) =>{
	return new Promise((resolve, reject) =>{
		$.ajax({
			method:"GET",
			url:"apiKeys.json"
		}).then((response) => {
			console.log("response", response);
			apiKeys = response;
			let authHeader =  apiKeys.client_id;

			console.log("authHeader", authHeader);
			console.log("searchText", searchText);
			$.ajax({
				method: "GET",
				//url: `http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=${authHeader}`
				// url: `http://api.openweathermap.org/data/2.5/weather?zip=${searchText},us`
				url: `http://api.openweathermap.org/data/2.5/weather?zip=${searchText},us&units=metric&APPID=${authHeader}`
			}).then((response2) =>{
				console.log("weather response", response2);
				resolve(response2);
			},(errorResponse2)=>{
				// console.log("imgur fail", errorResponse);
				reject(errorResponse2);
			});

		},(errorResponse) =>{
			console.log("errorResponse", errorResponse);
			reject(errorResponse);
		});
	});
	};

$(document).ready(function() {
    // check if zip is 5 digits or 9 a fire alert if either
    function checkZipCode(value) {
     return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
   }
   $('#click-button').on('click', function (e) {
       e.preventDefault();
       $('#click-button');
       var value = $('#zip-search').val();
       // if (checkZipCode(value)) {
       //     alert('valid zip');
       // } else {
       //     alert('invalid zip');
       // }
       weatherList(value);
   });
});


// 	$(document).ready(function() {
// 	$("#click-button").on("click", ()=>{
// 		$("#click-button").button("loading");
// 		$("#output").html("");
// 		let searchy = $("#imgur-search").val();
// 		console.log("searchy", searchy);
// 		imageList(searchy).then((dataFromImgur)=>{
// 			$("#click-button").button("reset");
// 			dataFromImgur.forEach((image)=>{
// 				$("#output").append(`<img src="${image.link}">`);
// 			}).catch((error)=>{
// 				$("#click-button").button("reset");
// 			});
// 		});
// 	});
//   console.log("jquery is ready");
// });