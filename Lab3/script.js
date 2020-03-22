"use strict";
function domRemoveParticipant(event) {
    console.log($(this).text());
}

function domAddParticipant(participant) {
    $("#participant-table")
    .append(
    `<tr>
    <td>${participant.first}</td>
    <td>${participant.last}</td>
    <td>${participant.role}</td>
    </tr>`
    );
}

function addParticipant(id, participants) {
    // TODO: Get values
    const first = $("#first").val();
    const last = $("#last").val();
    const role = $("#role").val();
    //Checking if I get correct values
    console.log(`${first} ${last} ${role} ${id+1}`);
    // TODO: Set input fields to empty values
    // ...
    $("#first").val("");
    $("#last").val("");
    $("#role").val("");
    
    // Create participant object
    const participant = {
        id:++id,
        first: first,
        last: last,
        role: role
    };
    participants.push(participant);
    console.log(participants);

    // Add participant to the HTML
    domAddParticipant(participant);
    let participantsString=JSON.stringify(participants);
    localStorage.setItem("participants", participantsString);

    // Move cursor to the first name input field
    document.getElementById("first").focus();
}

document.addEventListener("DOMContentLoaded", () => {
    // This function is run after the page contents have been loaded
    // Put your initialization code here
    let id;
    let participants;
    if(localStorage.getItem("participants")==null){
        id=0;
        participants=new Array();
    }
    else{
        
        participants=JSON.parse(localStorage.getItem("participants"));
        id=participants.length;
    }
    $("#addButton").click(function(){
        addParticipant(id, participants); 
    });
    //$("tr").dblclick(domRemoveParticipant);
    

})

// The jQuery way of doing it
$(document).ready(() => {
    // Alternatively, you can use jQuery to achieve the same result
    //Yep: 
    /*$("#addButton").click(function(){
        addParticipant;
    })
    */
});
