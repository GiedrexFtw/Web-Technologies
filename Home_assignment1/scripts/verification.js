let title=document.getElementById("title");
let name=document.getElementById("name");
let textfield=document.getElementById("text");
let submit=document.getElementById("submit");

    submit.addEventListener("click", function(){
        let position=JSON.parse(localStorage.getItem("position"));
        let distance=JSON.parse(localStorage.getItem("distance"));
        //console.log(position);
        let correct=true;
        if(position==null){
            correct=false;
            alert("Please choose trip destination on the map")
            return;
        }
        if(title.value.length<2 || title.value.length>=30){
            correct=false;
            if(name.value.length<2 || name.value.length>=30){
                showErrorMessage("name and title");
                $("#title").focus();
            }
            else{
                showErrorMessage("title")
                $("#title").focus();
            }
        }
        else if(name.value.length<2 || name.value.length>=30){
            correct=false;
            showErrorMessage("name");
            $("#name").focus();
        }
        if(correct){
            let formList=JSON.parse(localStorage.getItem("formList"));
            console.log(formList);
            let ID=0;
            if(formList!=null){
                ID=formList.length;
            }
            else{
                formList=new Array();
                ID=0;
            }
            let form={
                id: ID++,
                title:title.value,
                name: name.value,
                review: textfield.value,
                position: position,
                distance: distance
            }
            console.log(form);
            formList.push(form);
            let formListString=JSON.stringify(formList);
            localStorage.setItem("formList", formListString);
            localStorage.removeItem("position");
            localStorage.removeItem("distance");
            title.value="";
            name.value="";
            textfield.value="";
            alert("Review successfully added to the list");
            location.reload();
            $("#title").focus();
        }
        
    });
    function showErrorMessage(field_name){
        alert("Please enter a valid " + field_name);
    }