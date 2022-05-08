
//select elements
const notescontainer = document.querySelector(".app");
const addbtn = document.getElementById("addbtn");

// show all present notes
getNotes().forEach((note)=>{
    const Nnote = createNotes(note);
    notescontainer.insertBefore(Nnote,addbtn);

})

//get notes from local storage
function getNotes(){
    return JSON.parse(localStorage.getItem("sticky-notes") || "[]");    
}

// save notes in localstorage
function saveNotes(note){
    localStorage.setItem("sticky-notes", JSON.stringify(note))
}

// update notes content
function updateNotes(noteid,value){
    const notes = getNotes();
    const target = notes.filter((e)=> e.id === noteid)[0];
    target.content = value;

    saveNotes(notes);
}

// delete notes
function delNotes(id,elem){
    console.log("deleted")
    const remnotes = getNotes().filter((note) => note.id !== id);

       saveNotes(remnotes);
       notescontainer.removeChild(elem); 
}

// create elem when note id and content given and add 2 functionality of update and delete
// returns an elem
function createNotes(note){
    const newElem = document.createElement("textarea");
    newElem.classList.add("note");
    newElem.placeholder="Write something here";
    newElem.value = note.content;
    newElem.addEventListener("change",()=>{
        updateNotes(note.id,newElem.value);
    })
    
    newElem.addEventListener("dblclick",(e)=>{
        const db = confirm("Are you sure you want to delete");

    if (db){
        delNotes(note.id,newElem);
    }
    })

    return newElem;
}

// app starts here // on clicking the button we add elem --> create elem --> show them --> add update and del functionality --> store in local storage
addbtn.addEventListener("click", ()=>{
    addNotes();
})

function addNotes(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random()*1000),
        content:""
    };
    notes.push(noteObject);
    saveNotes(notes);
    const noteElem = createNotes(noteObject);
    notescontainer.insertBefore(noteElem, addbtn);
    console.log(noteElem);
}