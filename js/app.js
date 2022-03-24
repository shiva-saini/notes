console.log("Wlcome To Magic Note");
showTxt();
let addBtn = document.getElementById("addBtn");
let deleteall = document.getElementById("deleteall");
deleteall.addEventListener("click",function(){
  console.log("we are going to clear all data");
  // localStorage.clear();
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(notes);
  }
  noteobj.splice(0, noteobj.length);
  localStorage.setItem("notes", JSON.stringify(noteobj));
  showTxt();
});
addBtn.addEventListener("click", function () {

  let notes = localStorage.getItem("notes");
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(notes);
  }

  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };

  noteobj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(noteobj));
  addTxt.value = "";
  addTitle.value = "";
  //console.log(noteobj);
  showTxt();
});

function showTxt() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(notes);
  }

  let html = "";
  noteobj.forEach(function (element, index) {
    html += `
    <div class="container" style="align-items: center;
    justify-content:center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;">
    <div class="titlecontainer" style=" 
    border: black 2px solid;
    padding: 23px;
    width: 400px;
    height: 4d00px;
    box-shadow: 20px 20px 50px 10px pink inset;
    margin: 5px;">
        <h6 class="noteno">Note No. : ${index + 1}</h6>
        <h6 class="title">Title : ${element.title}</h6>
        <h6 class="date">
          Date : ${new Date().getDate()}:${ new Date().getMonth() + 1 }:${new
          Date().getFullYear()}
        </h6>
        <p class="notecontent"> ${element.text}</p>
        <button
          id="${index}"
          onclick="deleteNote(this.id)"
          class="btn"
          style="color: red; border: 2px solid black; border-radius: 10px"
        >
          Delete Note
        </button>
      </div>
    </div> `;
  });

  let Elm = document.getElementById("notes");
  if (noteobj.length != 0) {
    Elm.innerHTML = html;
  } else {
    Elm = `nothing to show`;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(notes);
  }

  noteobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteobj));
  showTxt();
}

let secrchTxt = document.getElementById("searchTxt");
secrchTxt.addEventListener("input", function () {
  let txtVal = secrchTxt.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = document.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(txtVal)) {
      element.style.display = "block";
      element.style.color = "red";
    } else {
      element.style.display = "none";
    }
  });
});
