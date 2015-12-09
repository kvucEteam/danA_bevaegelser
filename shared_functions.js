    var currentMousePos = {
        x: -1,
        y: -1
    };


    $(document).ready(function() {
        $("body").append("<div class ='stars'></div><div class ='overlay'><div class ='alertBox'></div><div></div></div>");
        $(".overlay").fadeOut(0);
    });
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });

    function shuffleArray(array) {
        for (var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
        return array;
    }

    function alertBox(header, p) {
        //console.log("functionen alertBox kaldt!");

        console.log(currentMousePos.y);


        $(".overlay").fadeIn(300);
        $(".alertBox").html("<div class='luk'></div> <div class ='alert_header'>" + header + "</div> <div class='alert_bread'>" + p + "</div>");
        var hojde = $(".alertBox").height();

        var nyAlertBoxPos = currentMousePos.y - hojde - 80;

        if (nyAlertBoxPos < 0) {
            nyAlertBoxPos = 0
        }

        $(".alertBox").css("top", nyAlertBoxPos + "px");

        var timeOut = setTimeout(function() {
            $('.overlay').fadeOut();
        }, 30000);
        $(".overlay").click(function() {
            clearTimeout(timeOut);
            $(this).fadeOut(300);
        });

    };

function wrong_answer(header, p){

    console.log(currentMousePos.y);


        $(".overlay").fadeIn(300);
        $(".alertBox").html("<div class='luk'></div> <div class ='alert_header'>" + header + "</div> <div class='alert_bread'>" + p + "</div>");
        var hojde = $(".alertBox").height();

        var nyAlertBoxPos = currentMousePos.y - hojde - 80;

        if (nyAlertBoxPos < 0) {
            nyAlertBoxPos = 0
        }

        $(".alertBox").css("top", nyAlertBoxPos + "px");

        var timeOut = setTimeout(function() {
            $('.overlay').fadeOut();
        }, 30000);
        $(".overlay").click(function() {
            clearTimeout(timeOut);
            $(this).fadeOut(300);
        });

};
