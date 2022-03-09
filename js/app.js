console.log("Wlcome To Magic Note");
showTxt();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click",function(){
    let notes = localStorage.getItem("notes");
    let addTxt = document.getElementById("addTxt");
    if(notes == null){
        noteobj = [];
    }else{
        noteobj = JSON.parse(notes);
    }

    noteobj.push(addTxt.value);
    localStorage.setItem("notes",JSON.stringify(noteobj));
    addTxt.value="";
    console.log(noteobj);
    showTxt();
})

function showTxt(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        noteobj = [];
    }else{
        noteobj = JSON.parse(notes);
    }

    let html = "";
    noteobj.forEach(function(element,index){
           html+=`
           <div class="noteCard my-2 mx-2 card" style="width: 10rem;">
           <div class="card-body">
               <h6 class="card-title">Note ${index + 1} Date ${new Date().getDate()}:${new Date().getMonth() + 1}:${new Date().getFullYear()}</h6>
               <p class="card-text"> ${element}</p>
               <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
           </div>
       </div>
                `
    });

    let Elm = document.getElementById("notes");
    if(noteobj.length !=0){
        Elm.innerHTML = html;
    }else{
        Elm=`nothing to show`;
    }
}

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        noteobj = [];
    }else{
        noteobj = JSON.parse(notes);
    }

    noteobj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(noteobj));
    showTxt();
}

let secrchTxt = document.getElementById("searchTxt");
secrchTxt.addEventListener("input",function(){
    let txtVal = secrchTxt.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");

   Array.from(noteCards).forEach(function(element){
       let cardTxt = document.getElementsByTagName("p")[0].innerText;
       if(cardTxt.includes(txtVal)){
           element.style.display = "block";
           element.style.color = "red";
       }else{
        element.style.display = "none";
       }
   })


})