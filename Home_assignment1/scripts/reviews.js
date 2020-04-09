
$(document).ready(function() {
    //localStorage.clear(); for testing
    let formlist=JSON.parse(localStorage.getItem("formList"));
    $("#addmsg").hide();
    if(formlist==null || formlist.length==0){
        console.log(formlist);
        $("#addmsg").show();
    }
    else{
        //rendering the accordion elements to display reviews
        append_accordions(formlist);
        let button1=document.createElement("button");
        button1.className+="sort-button";
        button1.textContent="Sort by Title";
        document.getElementById("for-buttons").appendChild(button1);
        let button2=document.createElement("button");
        button2.className="sort-button";
        button2.textContent="Sort by Distance from current spot";
        document.getElementById("for-buttons").appendChild(button2);
        button1.addEventListener("click", function(){
            let newformlist=formlist.slice();//making a copy
            newformlist.sort(dynamic_sort('title'));
            document.getElementById("reviews").innerHTML="";
            append_accordions(newformlist);
            display_info();
        });
        button2.addEventListener("click", function(){
            let newformlist=formlist.slice();//making a copy
            newformlist.sort((a,b) => a.distance - b.distance);
            document.getElementById("reviews").innerHTML="";
            append_accordions(newformlist);
            display_info();
        });
    }
    display_info();
    $("#reviews").on("dblclick", "button", function (){
        if(confirm("Are you sure you want to delete this review?")){
            let title=this.textContent;
            $(this).remove();
            formlist.forEach(element => {
                if(element.title==title){
                    formlist.splice(formlist.indexOf(element), 1);
                    //console.log(element);
                }
            });
            localStorage.setItem("formList",JSON.stringify(formlist));
        }
    })
})
function dynamic_sort(property){
    let sortOrder=1;
    if(property[0]==="-"){
        sortOrder=-1;
        property=property.substr(1);
    }
    return function (a,b){
        if(sortOrder==-1){
            return b[property].localeCompare(a[property]);
        }
        else{
            return a[property].localeCompare(b[property]);
        }
    }
}
function display_info(){
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
}
function append_accordions(formlist){
    formlist.forEach(form => {
        $("#reviews")
        .append(
        `<button class="accordion">${form.title}</button>
        <div class="panel">
          <p>${form.review}</p>
          <p>Distance from Ljubljana to this destination: ~${form.distance.toFixed(2)}km</p>
          </br>
          <p>~<i>${form.name}</i></p>
        </div>`
        );
    })
}