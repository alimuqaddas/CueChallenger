var jsonfile = require('jsonfile');
var ui = require('jquery-ui');
var combinations = require('combinations');
var shuffle = require('array-shuffle');
var random = require('random-number-generator');
var challenges=[];
var file='data/challenges.json';
var currentChallengeId;

var playersInput=1;


$( document ).ready(function() {
    getJsonData();    
});




function getJsonData(){

    jsonfile.readFile(file, function(err, obj) {
        console.dir(obj)
        challenges=obj;
        challenges.forEach(function(index,item){
            var t = document.getElementById('challengesBody');
            var tr = t.insertRow();
            var td1 = tr.insertCell();
            var td2 = tr.insertCell();
            var td3 = tr.insertCell();
            td1.appendChild(document.createTextNode(index.name));
            td2.appendChild(document.createTextNode(index.table));
            td3.appendChild(document.createTextNode(index.playedMatches));
            tr.addEventListener('click', showChallenge.bind(null, item));
        })       
      }.bind(this));

}


//When a challenge is selected from the table
function showChallenge(challengeID) {
    currentChallengeId=challengeID;
    $("#home").css("display","none");
    $("#challengeProfile").css("display","block");
    var t = document.getElementById('challengeDetails');
    t.innerHTML="";

    challenges[challengeID].players.forEach(function(index,item){
        var t = document.getElementById('challengeDetails');
        var tr = t.insertRow();
        var td1 = tr.insertCell();
        var td2 = tr.insertCell();
        var td3 = tr.insertCell();
        td1.appendChild(document.createTextNode(index.name));
        td2.appendChild(document.createTextNode(index.allowedLosses));
        td3.appendChild(document.createTextNode(index.wins));
        //tr.addEventListener('click', showChallenge.bind(null, item));
    }) 
    console.log(challenges[challengeID].match.player1);
    $("#player1").html(challenges[challengeID].match.player1);
    $("#player2").html(challenges[challengeID].match.player2);
    var active;    
    if(active)active=document.getElementsByClassName("selected")[0].innerHTML;
    console.log(active);  
    }



function submitmatchResult(){
    var winner=document.getElementsByClassName("selected")[0].innerHTML;
    var looser=document.getElementsByClassName("unselected")[0].innerHTML;
    $(document.getElementsByClassName("selected")[0]).addClass("unselected");
    $(document.getElementsByClassName("selected")[0]).removeClass("selected");
    challenges[currentChallengeId].playedMatches=parseInt(challenges[currentChallengeId].playedMatches)+1;

    challenges[currentChallengeId].players.forEach(function(player,index){
        if(player.name==winner)
            {
                console.log("Before Add:",player.wins)
                player.wins=parseInt(player.wins)+1;
                console.log("After Add:",player.wins);
            }
        else if(player.name==looser)
            {
                console.log("Before Minus:",player.allowedLosses)
                player.allowedLosses=parseInt(player.allowedLosses)-1;
                console.log("After Add:",player.allowedLosses)
            }
    })
    console.log(challenges);
    setMatch();
    
    jsonfile.writeFile(file, challenges, function (err) {
        console.error(err);
        
        jsonfile.readFile(file, function(err, obj) {
            console.dir(obj)
            challenges=obj;
            var t = document.getElementById('challengesBody');
            t.innerHTML="";
            challenges.forEach(function(index,item){
        
                //STATIC EVENTS
                var t = document.getElementById('challengesBody');
                var tr = t.insertRow();
                var td1 = tr.insertCell();
                var td2 = tr.insertCell();
                var td3 = tr.insertCell();
                td1.appendChild(document.createTextNode(index.name));
                td2.appendChild(document.createTextNode(index.table));
                td3.appendChild(document.createTextNode(index.playedMatches));
                tr.addEventListener('click', showChallenge.bind(null, item));
                showChallenge(currentChallengeId);

            })      
            }.bind(this));
      });
      alert("Match Updated !!! New Match have been generated randomly, Start Cueing..");
    
    
}

function setMatch(){
    var currentPossiblePlayers=[];

    challenges[currentChallengeId].players.forEach(function(player,index){
        if(parseInt(player.allowedLosses)>0)
        {
            currentPossiblePlayers.push(player.name);
        }
    })
    var comb=combinations(currentPossiblePlayers,2);
    console.log("Possible Players",currentPossiblePlayers);
    console.log("Conmibations",comb);
    console.log("Conmibations",combinations(currentPossiblePlayers,2));
    var counter=0;
    var possibleMatches=[];
    comb.forEach(function(value,index){
        if(value.length<=2)
            {
                possibleMatches.push(value);
                counter++;
            }
    })
    console.log("beforeShuffle:",possibleMatches)
    var aftershuffle=shuffle(possibleMatches);
    console.log("After Shuffle",aftershuffle);
    console.log("counter:",possibleMatches.length);
    console.log(possibleMatches);
    var rand=random(aftershuffle.length-1,0)
    console.log(rand);

    challenges[currentChallengeId].match.player1=aftershuffle[rand][0];
    challenges[currentChallengeId].match.player2=aftershuffle[rand][1];

}

function newChallenge(){
    hideforchallege();
    //document.getElementById("playersAddField").innerHTML="<input type=\"text\" id=\""+playersInput+"\" placeholder=\"Enter Player Name\">";
    playersInput++;
}

function createChallenge(){

    var newChallengeObject={
        "name":"",
        "players":[],
        "table":"",
        "playedMatches":"",
        "match":{
            "player1":"",
            "player2":""
        }
    }

    var player = {
        name:"",
        allowedLosses:"",
        wins:0
    }

    console.log($('#playersAddField').children());

    var playersData=[];
    var inputs=$('#playersAddField').children();
    console.log(inputs);
    var fieldLength=$('#playersAddField').children().length;
    console.log("Field Length",fieldLength);
    var elements=fieldLength/2;
    console.log("elements",elements);
    for(i=0;i<elements;i++)
    {

        playersData.push($('#'+(i+1)+'_name').val())
        playersData.push($('#'+(i+1)+'_defeats').val())
        player.name=$('#'+(i+1)+'_name').val();
        player.allowedLosses=$('#'+(i+1)+'_defeats').val();
        newChallengeObject.players.push(player);
        console.log(i);

    }

    newChallengeObject.name=$('#challengeNameEntry').val();
    newChallengeObject.table=$('#challengeTable').val();

    challenges.push(newChallengeObject);
    console.log(challenges);

    console.log(newChallengeObject);


}


