"use strict";
function domRemoveParticipant(participants) {
    //if(confirm("Are you sure you want to delete " + $(this).parent().find(">:first-child").text())){
        $(this).parent().remove();
    //}
    //else{
        
    //}
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
    const first = $("#first").val();
    const last = $("#last").val();
    const role = $("#role").val();
    //Checking if I get correct values
    console.log(`${first} ${last} ${role} ${id+1}`);
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
    domAddParticipant(participant);
    // Add participant to the HTML
    let participantsString=JSON.stringify(participants);
    localStorage.setItem("participants", participantsString);
    // Move cursor to the first name input field
    document.getElementById("first").focus();
}

document.addEventListener("DOMContentLoaded", () => {
    let id;
    let participants;
    //localStorage.clear();
    if(localStorage.getItem("participants")==null){
        id=0;
        participants=new Array();
    }
    else{
        participants=JSON.parse(localStorage.getItem("participants"));
        id=participants.length;
        retrieveTable(participants);
    }
    $("#addButton").click(function(){
        addParticipant(id, participants); 
    });
    $("#participant-table").on("dblclick", "td", function (){
        if(confirm("Are you sure you want to delete this entry " + $(this).parent().find(">:first-child").text())){
            $(this).parent().remove();
            console.log(this);

        }
    })
})
function retrieveTable(participants){
    participants.forEach(element => {
        domAddParticipant(element);
    });

}