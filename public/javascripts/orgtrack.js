$(document).ready(function() {
	
	var onAuthorize = function() {
		updateLoggedIn();
		$("#output").empty();
				
		Trello.organizations.get("mbit", function(org){
			$(".orgName").text(org.displayName);
			getOrgBoards(org.name);
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