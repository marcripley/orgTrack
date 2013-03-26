$(document).ready(function() {
	
	var onAuthorize = function() {
		updateLoggedIn();
		$("#output").empty();
				
		Trello.organizations.get("mbit", function(org){
			$(".orgName").text(org.displayName);
			getOrgBoards(org.name);
			getOrgActions(org.name);
		});
	};
	
	var getOrgBoards = function(org) {
		var $orgBoards = $("<div>")
		.text("Loading Boards...")
		.appendTo("#orgBoards");
		
		Trello.get("organizations/" + org + "/boards", function(boards) {
			$orgBoards.empty();
			$.each(boards, function(ix, board) {
				$("<a>")
				.attr({href: board.url, target: "trello"})
				.addClass("board")
				.text(board.name)
				.appendTo($orgBoards);
				$("<br />").appendTo($orgBoards);
			});
		});
	};
	
	var getOrgActions = function(org) {
		var $orgActions = $("<div>")
		.text("Loading Actions...")
		.appendTo("#orgActions");
		
		Trello.get("organizations/" + org + "/boards", function(boards) {
			$.each(boards, function(ix, board) {
				Trello.get("boards/" + board.id + "/actions", function(actions) {
					$orgActions.empty();
					$.each(actions, function(ix, action) {
						$.each(action.data, function(k,v){
							$.each(v, function(key,val) {
								alert(key + ": " + val);
							});
						});
						$("<a>")
						.attr({href: action.date, target: "trello"})
						.addClass("action")
						.text(action.data)
						.appendTo($orgActions);
						$("<br />").appendTo($orgActions);
					});
				});
			});
		});
	};
	
	var getMyCards = function() {
		var $cards = $("<div>")
		.text("Loading Cards...")
		.appendTo("#output");
		
		Trello.get("members/me/cards", function(cards) {
			$cards.empty();
			$.each(cards, function(ix, card) {
				$("<a>")
				.attr({href: card.url, target: "trello"})
				.addClass("card")
				.text(card.name)
				.appendTo($cards);
			});  
		});
	};
	
	var updateLoggedIn = function() {
		var isLoggedIn = Trello.authorized();
		$("#loggedout").toggle(!isLoggedIn);
		$("#loggedin").toggle(isLoggedIn);        
	};
		
	var logout = function() {
		Trello.deauthorize();
		updateLoggedIn();
	};
							  
	Trello.authorize({
		interactive:false,
		success: onAuthorize
	});

	$("#connectLink")
	.click(function(){
		Trello.authorize({
			type: "popup",
			name: "Trello OrgTracker",
			success: onAuthorize
		})
	});
		
	$("#disconnect").click(logout);
	
});