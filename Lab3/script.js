"use strict";

function domRemoveParticipant(event) {
    // TODO
}

function domAddParticipant(participant) {
    // TODO
}

function addParticipant(event) {
    // TODO: Get values
    const first = "";
    const last = "";
    const role = "";
    
    // TODO: Set input fields to empty values
    // ...
    
    // Create participant object
    const participant = {
        first: first,
        last: last,
        role: role
    };

    // Add participant to the HTML
    domAddParticipant(participant);

    // Move cursor to the first name input field
    document.getElementById("first").focus();
}

document.addEventListener("DOMContentLoaded", () => {
    // This function is run after the page contents have been loaded
    // Put your initialization code here
    document.getElementById("addButton").onclick = addParticipant;
})

// The jQuery way of doing it
$(document).ready(() => {
    // Alternatively, you can use jQuery to achieve the same result
});
