const name = document.getElementById("name-input");
const adress = document.getElementById("adress_input");
const content = document.getElementById("info-input");
const button = document.getElementById("hinzufuegen");
const overview = document.getElementById("Uebersicht");

let auftraege = []

auftraege = laden("auftraege")
render_list()



function render_list(){
    overview.innerHTML = ""
    for (const auftrag of auftraege){
        const li = document.createElement("li")
        const done = document.createElement("button")
        const remove = document.createElement("button")
        const bearbeitet = document.createElement("button")
        const buttons =  document.createElement("div")

        li.classList.add("liste")
        buttons.classList.add("change_btn")

        li.textContent  = auftrag.name + " - " + auftrag.adresse + " - " + auftrag.content


        bearbeitet.textContent = "IN BEARBEITUNG"
        bearbeitet.addEventListener("click", function(){
            auftrag.bearbeitet = true
            speichern(auftraege)
            render_list()
        })    
        buttons.appendChild(bearbeitet)

        done.textContent = "DONE"
        done.addEventListener("click", function(){
            auftrag.erledigt = true
            auftrag.bearbeitet = false 
            speichern(auftraege)
            render_list()
        })
        buttons.appendChild(done)

        
        remove.textContent =  "DELETE"
        remove.addEventListener("click", function(){
            auftraege = auftraege.filter(function(a){return a.id !== auftrag.id})
            speichern(auftraege)
            render_list()
        })    
        buttons.appendChild(remove)   
   
        if (auftrag.erledigt){
            li.classList.add("erledigt")

        } 

        if (auftrag.bearbeitet){
            li.classList.add("bearbeitung")

        }

        li.appendChild(buttons)
        overview.appendChild(li)
        
    }

}

function auftrag_hinzufuegen(name, adress, inhalt){
    auftraege.push({id: Date.now(), name: name, adresse: adress, content: inhalt, erledigt: false, bearbeitet: false})
    speichern(auftraege)
    render_list()

}

function speichern(datei){
    localStorage.setItem("auftraege", JSON.stringify(datei))

}

function laden(datei){
    const gespeichert = localStorage.getItem(datei); 

    if (gespeichert){
        return JSON.parse(gespeichert)

    }

    return []

}

button.addEventListener("click", function(){
    const name_text = name.value;
    const adress_text = adress.value;
    const content_text = content.value;

    const data = [name_text, adress_text, content_text];

    for (const item of data){
        if (item === ""){
            console.log("Not all slots were filled");
            return;  
        }  
    }

    auftrag_hinzufuegen(name_text, adress_text, content_text)


    name.value = "";
    adress.value = "";
    content.value = "";
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")

}
