$(document).ready(function () {

    $("#partyView").hide();
    $("#kommunView").hide();


    /* parti stats */
    $(".btn-party").click(function () {
        $("#partyView").show();
    });

    $("#party-close-btn").click(function () {
        $("#partyView").hide();
    });
    
    
    /* kommun stats*/
    $(".btn-kommun").click(function () {
        $("#kommunView").show();
    });

    $("#kommun-close-btn").click(function () {
        $("#kommunView").hide();
    });
    
    $("#settings-block").click(function () {
        document.cookie = "started=no";
    });


});
