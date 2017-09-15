// Helping Function
function onRowClick(tableId, callback) {
    var table = document.getElementById(tableId),
        rows = table.getElementsByTagName("tr"),
        i;
    for (i = 0; i < rows.length; i++) {
        table.rows[i].onclick = function (row) {
            return function () {
                callback(row);
            };
        }(table.rows[i]);
    }
};


$("#player1").click(function(){
    $("#player1").removeClass("unselected");
    $("#player1").addClass("selected")
    if($("#player2").hasClass("selected"))
        {
            $("#player2").removeClass("selected");
            $("#player2").addClass("unselected")
        }
    });

$("#player2").click(function(){
    $("#player2").removeClass("unselected");
    $("#player2").addClass("selected")
    if($("#player1").hasClass("selected"))
        {
            $("#player1").removeClass("selected");
            $("#player1").addClass("unselected");
        }
    });

function gohome(){
    $("#challengeProfile").css("display","none");
    $("#home").css("display","block");
}

function hideforchallege(){
    $("#home").css("display","none");
    $("#createChallenge").css("display","block");
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

function addPlayer(){
    //$('#playersAddField').add("<input type=\"text\" id=\""+playersInput+"_name\"style=\"display:inline-block\" placeholder=\"Player Name\"/>");
    //$('#playersAddField').add("<input type=\"text\" id=\""+playersInput+"_defeats\"style=\"display:inline-block\" placeholder=\"Allowed Defeats\"/>");
    $("#playersAddField").append('<input type="text" id="'+playersInput+'_name" placeholder="Player Name" style="display:inline-block"/>');
    $("#playersAddField").append('<input type="text" id="'+playersInput+'_defeats" placeholder="Allowed Defeats" style="display:inline-block"/>');
    playersInput++;
}

function removePlayer(){
    $('#playersAddField').children().last().remove();
    $('#playersAddField').children().last().remove();
    playersInput--;
}