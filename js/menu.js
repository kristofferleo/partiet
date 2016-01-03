$( document ).ready(function() {
  	
     /* Initial start display*/
    var x = getCookie("started");

  	if (x == "yes") {
          $("#main, #footer").css({
            display: "initial"
        })
        $(".main-menu").css({
            display: "none"
        }) 
          
      } else {
          $("#main, #footer").css({
            display: "none"
        })
        $(".main-menu").css({
            display: "initial"
        }) 
        $(".new-party-menu").css({
            display: "none"
        }) 
      }
    
 
    
    /* Buttouns from intro-menu */
    
	$( "#new-game" ).click(function() {
			$(".intro-menu").css({
				display: "none"
			})
            $(".new-party-menu").css({
				display: "initial"
			})
	});
    
    
    /* Buttons from new-party-menu */
    $( "#new-profile" ).click(function() {

        $(".main-menu").css({
			display: "none"
		})
        $("#main").css({
            display: "initial"
        })

        document.cookie="started=yes";
        
        if (getCookie("introcuced")  != "yes"){
            alert("Välj en kommun du vill grunda ditt parti i");
            document.cookie="introduced=yes";   
        }
        
        
	});



  	/*$('#aboutLink').click( function() {
  		$("#main, #footer").css({
			opacity: 1.0, 
		})
		.animate({
			opacity: 0.0
		}, 1000, function() {
			$("#main, #footer").css({
				visibility: "hidden"
			});
			$( ".main-menu" ).fadeIn( "slow");
		});
  	});*/



    function getCookie(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');

		for(var i=0; i<ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name)==0)
				return c.substring(name.length,c.length);
		}
		return "";
	}
	
});