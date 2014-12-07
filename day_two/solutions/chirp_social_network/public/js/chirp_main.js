//Open or close chirp window

var lockedIn = false;

$(document).on("keydown", function(event) {
	if (event.which === 16) {
		lockedIn = true;
	}
});

var wordsTypes = new Array();

$(document).on("keyup", function(event) {
	if (event.which === 16) {
		lockedIn = false;
		wordsTypes = new Array();
	}

	if (lockedIn === true) {
		wordsTypes.push(String.fromCharCode(event.which));
		
		var result = wordsTypes.join("");

		if (result === "CHIRP") {
			$("#chirp-wrapper").slideDown(function() {
				$("#chirp-text").focus();
			});
		} else if (result === "NAH") {
			$("#chirp-wrapper").slideUp(function() {
				$("#chirp-text").val("");
			});
		}
	}
});

$(document).on("click", "#cancel-chirp-button", function() {
	$("#chirp-wrapper").slideUp(function() {
		$("#chirp-text").val("");
	});
});

// $(document).ready(function() {
// 	setTimeout(function() {
// 		$("#instructions-modal").modal("show");
// 	}, 1000);
// });