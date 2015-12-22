$( document ).ready(function() {
  	
	$("#partyView").hide();

  	$("#partyButton").click( function() {
		$("#partyView").show();
	});
	
	$("#closeButton").click( function() {
		$("#partyView").hide();
	});
 });
