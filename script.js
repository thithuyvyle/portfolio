
/******************** PAGE ACCUEIL ***********/
function scrollToApropos() {
    document.querySelector("#texteMoi").scrollIntoView({ behavior: 'smooth' });
}

/******************** PAGE PORTFOLIO ***********/
function scrollToProjets() {
    document.querySelector("#portfolio").scrollIntoView({ behavior: 'smooth' });
}
/* filtrage projets*/
let projets = [
    { nom:  { FR: "Blog Voyage", EN: "Travel Blog" }, descriptif:  { FR: "Blog Voyage", EN: "Travel Blog" }, categorie: "site", image: "images/coming-soon.jpg" },
    { nom: {FR:"Blog Mode" , EN: "Fashion Blog"}, descriptif: {FR:"Blog Mode" , EN: "Fashion Blog"}, categorie: "site", image: "images/coming-soon.jpg" },
    { nom: {FR:"Application Mobile" , EN: "Mobile App"}, descriptif: {FR:"Application Mobile" , EN: "Mobile App"}, categorie: "site", image: "images/coming-soon.jpg" },
    { nom: {FR:"À venir" , EN: "Coming Soon"}, descriptif: {FR:"Création Maquette" , EN: "Wireframe Design"}, categorie: "maquette", image: "images/coming-soon.jpg" },
];

let galerie = document.getElementById("galerie");
function ajouterProjets(filteredProjets, langue) {
       galerie.innerHTML = "";// Clear the gallery +++
    filteredProjets.forEach(proj => {
        const div = document.createElement("div");
        div.className = "projet";
        div.innerHTML =
            `<h3>${proj.nom[langue]}</h3>
    <img src=${proj.image} alt="${proj.nom[langue]}"></img>
    <p>${proj.descriptif[langue]}</p>`;
        galerie.appendChild(div);
    });
}

// All
function showAllProjets() {
    const lang = localStorage.getItem("langue") || "FR";
    ajouterProjets(projets, lang);
}

// Show only sites
function showSites() {
    const lang = localStorage.getItem("langue") || "FR";
    const sites = projets.filter(p => p.categorie === "site");
    ajouterProjets(sites, lang);
}

// Show only maquettes
function showMaquettes() {
    const lang = localStorage.getItem("langue") || "FR";
    const maquettes = projets.filter(p => p.categorie === "maquette");
    ajouterProjets(maquettes, lang);
}

document.addEventListener("DOMContentLoaded", () => {
    if (galerie){
    showAllProjets();
} // show all initially
});


/******************** PAGE CONTACT ***********/
// Affichage messages erreur
let nameInput = document.getElementById("name");
let nameP = document.getElementById("nameP");
let emailInput = document.getElementById("email");
let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let emailP = document.getElementById("emailP");
let textarea = document.getElementById("textarea");
let textareaP = document.getElementById("textareaP");

document.addEventListener('DOMContentLoaded', () => {
    const formulaire = document.getElementById("contactForm");
    if (formulaire) {

        formulaire.addEventListener("submit", function (event) {
            event.preventDefault();
            let isValid = true;

            if (nameInput.value.trim() === "") {
                nameP.style.display = "block";
                isValid = false;
            } else {
                nameP.style.display = "none";
            }

            if (emailInput.value === "" || !emailformat.test(emailInput.value)) {
                emailP.style.display = "block";
                isValid = false;
            } else {
                emailP.style.display = "none";
            }

            if (textarea.value === "" || textarea.value.length < 10) {
                textareaP.style.display = "block";
                isValid = false;
            } else {
                textareaP.style.display = "none";
            }
            if (isValid) {
                showPopup();
                formulaire.reset();
            }
        })
    }
});

// Affichage popup 
function showPopup() {
    const popup = document.createElement("div");
    popup.id = "popupDiv";
    const content = document.createElement("div");
    content.id = "contentDiv";
    const popupMessage = document.createElement("p");
    popupMessage.textContent = "Message envoyé !";
    const gif = document.createElement("img");
    gif.src = "https://media.tenor.com/6oWcNgJ5EKMAAAAi/paper-plane-flying.gif";
    gif.alt = "avion volant";
    const popupMessage2 = document.createElement("p");
    popupMessage2.textContent = "(cliquez pour fermer)";
    // en cliquant ds tte la fenêtre, pop up se ferme:
    content.onclick = () => document.body.removeChild(popup);
    content.append(popupMessage, gif, popupMessage2);
    popup.appendChild(content);
    document.body.appendChild(popup);
}


/** localStorage langues **/
document.addEventListener("DOMContentLoaded", () => {
function setText(id, value) {
        const element = document.getElementById(id.startsWith("#") ? id.slice(1) : id);
        if (element && typeof value === "string") {
            element.textContent = value;
        }
    }

let traductions = {};

fetch("lang.json")
    .then(response => response.json())
    .then(data => {
        traductions = data;
        const langSave = localStorage.getItem("langue") || "FR";
        appliquerLangue(langSave);
    });

function appliquerLangue(langue) {
    const trad = traductions[langue];
    if (!trad) return; // sécurité en cas d'erreur

    setText("titreDev", trad.titreDev);
    setText("#soustitreDev", trad.soustitreDev);
    setText("#savoirPlus", trad.savoirPlus);
    setText("#titreApropos", trad.titreApropos);
    setText("#paragraphe1", trad.paragraphe1);
    setText("#myProjects", trad.myProjects);
    setText("#myCV", trad.myCV);
    setText("#tous", trad.tous);
    setText("#sites", trad.sites);
    setText("#maquettes", trad.maquettes);
    setText("#info", trad.info);
    setText("#nomsLabel", trad.nomsLabel);
    setText("#nameP", trad.nameP)
    setText("#emailP", trad.emailP);
    setText("#telLabel", trad.telLabel);
    setText("#helpYou", trad.helpYou);
    setText("#textareaP", trad.textareaP);
    setText("#buttonSend", trad.buttonSend);
//placeholder
    if (nameInput) nameInput.placeholder = trad.placeholderName;
    if (textarea) textarea.placeholder= trad.placeholderTextarea;

    localStorage.setItem("langue", langue); // sauvegarde à chaque appel
}

let boutonFR = document.getElementById("langFR");
let boutonEN = document.getElementById("langEN");
boutonFR.addEventListener("click", () => appliquerLangue("FR"));
boutonEN.addEventListener("click", () => appliquerLangue("EN"));
})

