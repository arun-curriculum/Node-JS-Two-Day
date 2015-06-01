$(document).ready(function() {
	resizeChat();

	getName();
});

function getName() {
	var name = prompt("What is your name?");

	if (name === "" || !name) {
		getName();
	} else {
		localStorage.setItem("user_name", name);
	}
}

$(window).resize(function() {
	resizeChat();
});

function resizeChat() {
	$(".container").height($(document).height() - 80);
	$(".chat-container").height($(".container").height() - 50)
}

function scrollBottom() {
	$(".chat-container").animate({
		scrollTop: $(".chat-container")[0].scrollHeight
	});
}

var socket = io.connect();

socket.on("chat", function(chatInfo) {
	var html = '<div class="chat-item"><span class="bold">' + chatInfo.name + ':</span> <span>' + chatInfo.chatText + '</span></div>';
	$(".chat-container").append(html);
});

$(document).on("keyup", "#chat-input", function(event) {
	if (event.which === 13) {
		//Emit chat information to socket server
		socket.emit("chat", {
			name: localStorage.getItem("user_name"),
			chatText: $(this).val()
		});

		var html = '<div class="chat-item"><span class="bold">' + localStorage.getItem("user_name") + ':</span> <span>' + $(this).val() + '</span></div>';
		$(".chat-container").append(html);

		scrollBottom();

		$("#chat-input").val("");
	}
});