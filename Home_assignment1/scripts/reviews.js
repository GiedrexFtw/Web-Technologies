
$(document).ready(function() {
    
    let formlist=JSON.parse(localStorage.getItem("formList"));
    $("#addmsg").hide();
    if(formlist==null){
        $("#addmsg").show();
        $("#addmsg").css("color", "white");
        $("#addmsg").css("padding-top", "0px");
        $("#addmsg").css("position", "relative");
        $("#addmsg").css("font-size", "40px");
        $("#review-table").hide();
    }
    else{
        //rendering the accordion elements to display reviews
        formlist.forEach(form => {
            console.log(form);
            $("#reviews")
            .append(
            `<button class="accordion">${form.title}</button>
            <div class="panel">
              <p>${form.review}</p>
              </br>
              <p>~${form.name}</p>
            </div>`
            );
        })
    }
    let acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
        console.log(this.classList);
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
        });
    }
})
