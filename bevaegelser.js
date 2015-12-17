var JsonObj;
var fejl;
var level = 0;
var score = 0;

function loadData(url) {
    $.ajax({
        url: url,
        // contentType: "application/json; charset=utf-8",  // Blot en test af tegnsaettet....
        //dataType: 'json', // <------ VIGTIGT: Saadan boer en angivelse til en JSON-fil vaere! 
        dataType: 'text', // <------ VIGTIGT: Pga. ???, saa bliver vi noedt til at angive JSON som text. 
        async: false, // <------ VIGTIGT: Sikring af at JSON hentes i den rigtige raekkefoelge (ikke asynkront). 
        success: function(data, textStatus, jqXHR) {
            JsonObj = jQuery.parseJSON(data);
            // Alt data JsonObj foeres over i arrays:


            //$(".correct").html("Correct answers: <b>" + score + " / " + antal_korrekte + " </b> Attempts: <b>" + attempts + "</b>");
            //next_round();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error!!!\njqXHR:" + jqXHR + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
        }
    });
    json_streng = JSON.stringify(JsonObj);

    console.log("jSON loaded");
    init();
}

function init() {
    console.log(score);
    $(".titel").html(JsonObj.userInterface.titel);
    for (var i = 0; i < JsonObj.quizdata.length; i++) {
        console.log("i:" + i);
        $(".inner_container").append("<div class ='sortable_container " + i + " icon_undefined'><div class='sortable_text_container'>" + JsonObj.quizdata[i].tekst + "</div><div class='icon_container'></div></div>");
    }
    console.log(JsonObj);

    $(".sortable_container").shuffle_div_position();

    $(".checkAnswer").click(function() {
        tjek_svar();
    });
    //next_level();
}

$(".inner_container").sortable({
    axis: 'y',
    containment: 'parent',
    // animation speed
    sortAnimateDuration: 500,
    sortAnimate: true,
    distance: 25,

    update: function(event, ui) {

    },
    start: function(event, ui) {
        console.log("dragstart");
        ui.item.find(".sortable_text_container").addClass("shadow");
        console.log('du har fat i : ' + ui.item.index())
    },
    stop: function(event, ui) {
        ui.item.find(".sortable_text_container").removeClass("shadow");
        console.log("dragstart");
    }
});

function tjek_svar(obj) {

    if (level == 0) {
        score = 0;
        $('.sortable_container').each(function() {
            var classnum = $(this).attr('class').split(' ')[1]; //.index();
            var indeks = $(this).index().toString();
            if (indeks == JsonObj.quizdata[classnum].placering) {
                score++;
            }
        });

        if (score >= JsonObj.quizdata.length) {
            UserMsgBox("html", "<h3>Placeringen af tekststykkerne er <span class='label label-success'>Korrekt</span> </h3><p>Du har placeret sætningerne i en fin rækkefølge!</p><div class='btn btn-info btn-next'>GÅ VIDERE</div>");
            next_level();

        } else {
            UserMsgBox("html", "<h3>Placeringen af tekststykkerne er <span class='label label-danger'>Forkert</span></h3><p>Prøv at se på sætningerne igen i forhold til indledning midte og afslutning.</p><div class='btn btn-info btn-next'>Gå TILBAGE TIL OPGAVEN</div>");
            fejl++;
        }
    } else {
        console.log("s: " + score);
        console.log("object: " + obj);
        var classnum = obj.parent().parent().attr('class').split(' ')[1];
        var valgt_icon = obj.parent().parent().attr('class').split(' ')[2].toString().substring(5);
        console.log("inum:" + valgt_icon); //.index();
        console.log($(this).index());
        if (valgt_icon == JsonObj.quizdata[classnum].type) {
            if (obj.index() == 0) {
                obj.parent().parent().find(".sortable_text_container").css("background-color", "#FAE3F4"); //hide(); //("btn-icon").css("opacity", ".5");
                obj.parent().find(".btn-icon").eq(1).hide();
            } else {
                obj.parent().parent().find(".sortable_text_container").css("background-color", "#E2FDEE"); //hide(); //("btn-icon").css("opacity", ".5");
                obj.parent().find(".btn-icon").eq(0).hide();
            }
            UserMsgBox("html", "<h3>Dit valg er <span class='label label-success'>Korrekt</span> </h3><p>" + JsonObj.quizdata[classnum].feedback + "</p><div class='btn btn-info btn-next'>GÅ VIDERE</div>");
            score++;
            //$(".btn-icon").eq(valgt_icon).hide();
            obj.parent().find(".btn-icon").off(); //"); //css("opacity", "0");
            //console.log("obj.index: " + indeksss);
        } else {
            UserMsgBox("html", "<h3>Dit valg er <span class='label label-danger'>Forkert</span> </h3><p>" + JsonObj.quizdata[classnum].feedback + "</p><div class='btn btn-info btn-next'>GÅ VIDERE</div>");
            obj.parent().parent().find(".sortable_text_container").css("background-color", "#FFF"); //hide(); //("btn-icon").css("opacity", ".5");
        }
        if (score >= 5) {
            $(".checkAnswer").html("Færdig")
            $(".checkAnswer").show().off();

            $(".checkAnswer").click(function() {
                UserMsgBox("html", "<h3>Flot klaret!</h3><h4>Det er godt at huske på dennem måde at zoome ud og ind i teksten, når du selv skal skrive en tekst</h4><div class='btn btn-primary again'>PRØV IGEN</div>");
                $(".MsgBox_bgr").off();
                $(".again").click(function() {

                    location.reload();
                });

            });
        }
    }

    console.log("score: " + score)
}

function next_level() {
    score = 0;
    $(".instruktion").html("<span class='glyphicon glyphicon-arrow-right'></span>" + JsonObj.userInterface.instruktion_2);
    level = 1;
    $('.inner_container').sortable('disable');
    $(".checkAnswer").hide();
    $('.task').prepend("<img class='img_heli img_top' src='img/helicopter.svg' ><b>Helikopterperspektiv </b> <br/>Dette perspektiv forholder sig til et emne på et mere generelt niveau. Man zoomer ud. En sætning i helikopterperspektiv kunne lyde: “Verden står over for nogle store klimaudfordringer”. Det er det store perspektiv.<br/><br/><img class='img_magnify img_top' src='img/zoom-in-solid.svg' ><b>Forstørrelsesglasset </b><br/>Her zoomer ind på et emne. En sætning kunne lyde: “Kantinen på min skole bør kun have økologiske madvarer”. Her er vi helt nede i den konkrete hverdag.<br/><br/>");
    $('.icon_container').each(function() {
        $(this).append("<div class='btn-icon'> <img class='img_heli' src='img/helicopter.svg' ></div><div class='btn-icon'> <img class='img_magnify' src='img/zoom-in-solid.svg' ></div>")
    });
    $(".btn-icon").click(function() {
        if ($(this).index() == 0) {

            $(this).parent().parent().addClass("icon_0").removeClass("icon_1 icon_undefined");
        } else {

            $(this).parent().parent().addClass("icon_1").removeClass("icon_0 icon_undefined");
        }
        tjek_svar($(this));
    });
}
