/******************** PAGE ACCUEIL ***********/
function scrollToApropos() {
    document.querySelector("#texteMoi").scrollIntoView({ behavior: 'smooth' });
}

/******************** PAGE PORTFOLIO ***********/
function scrollToProjets() {
    document.querySelector("#portfolio").scrollIntoView({ behavior: 'smooth' });
}
/* filtrage projets*/
let projets=[
    { nom: "Blog Voyage", descriptif: "Blog voyage", categorie: "site", image:"images/coming-soon.jpg" },
    { nom: "Blog Mode", descriptif: "Blog Mode", categorie: "site",image:"images/coming-soon.jpg" },
    { nom: "Application Mobile", descriptif: "Application Mobile", categorie: "site",image:"images/coming-soon.jpg"},
    { nom: "À venir", descriptif: "Création maquette", categorie: "maquette",image:"images/coming-soon.jpg" },
];

let galerie = document.getElementById("galerie");
function ajouterProjets(filteredProjets) {
  // Clear the gallery
  galerie.innerHTML = "";
  filteredProjets.forEach(proj => {
    const div = document.createElement("div");
    div.className = "projet";
    div.innerHTML = 
    `<h3>${proj.nom}</h3>
    <img src=${proj.image}></img>
    <p>${proj.descriptif}</p>`;
    galerie.appendChild(div);
  });
}

// All
function showAllProjets() {
  ajouterProjets(projets);
}

// Show only sites
function showSites() {
    const sites = projets.filter(p => p.categorie === "site");
    ajouterProjets(sites);
}

// Show only maquettes
function showMaquettes() {
    const maquettes = projets.filter(p => p.categorie === "maquette");
    ajouterProjets(maquettes);
}

document.addEventListener("DOMContentLoaded", () => {
  showAllProjets(); // show all initially
});


/******************** PAGE CONTACT ***********/
// Affichage messages erreur
document.addEventListener('DOMContentLoaded', () => {
  const formulaire = document.getElementById("contactForm");
  formulaire.addEventListener("submit", function(event) {
    event.preventDefault();
    let isValid = true;

    if (nameInput.value.trim() === ""){
        nameP.style.display="block";
        isValid =  false;
    }else{
        nameP.style.display="none";
    }

    if (emailInput.value === "" || !emailformat.test(emailInput.value)){
        emailP.style.display="block";
        isValid =  false;
    }else {
        emailP.style.display="none";
    }

    if (textarea.value === "" || textarea.value.length<10){
        textareaP.style.display="block";
        isValid =  false;
    }else{
        textareaP.style.display="none";
    }
    if (isValid){
        showPopup();
        formulaire.reset();
    }}  )   
  });

// Affichage popup 
function showPopup() {
    const popup = document.createElement("div");
    popup.id="popupDiv";
    const content = document.createElement("div");
    content.id="contentDiv";
    const popupMessage = document.createElement("p");
    popupMessage.textContent = "Message envoyé !";
    const gif = document.createElement("img");
    gif.src = "https://media.tenor.com/6oWcNgJ5EKMAAAAi/paper-plane-flying.gif";
    gif.alt="avion volant";
    const popupMessage2= document.createElement("p");
    popupMessage2.textContent = "(cliquez pour fermer)";
// en cliquant ds tte la fenêtre, pop up se ferme:
    content.onclick = () => document.body.removeChild(popup); 
    content.append(popupMessage, gif, popupMessage2);
    popup.appendChild(content);
    document.body.appendChild(popup);
}

let nameInput= document.getElementById("name");
let nameP=document.getElementById("nameP");
let emailInput= document.getElementById("email");
let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let emailP=document.getElementById("emailP");
let textarea= document.getElementById("textarea");
let textareaP=document.getElementById("textareaP");


/** localStorage langues **/
let boutonFR = document.getElementById("langFR");
let boutonEN = document.getElementById("langEN");

function appliquerLangue(langue) {
    if (langue === "EN") {
    document.querySelector("#titreDev").textContent="Full Stack Developer In Paris";
    document.querySelector("#soustitreDev").textContent="Creating Websites To Reflect You";
    document.querySelector(".savoir-plus").textContent="Read More";
}else{
    document.querySelector("#titreDev").textContent="Développeuse full stack en région parisienne";
    document.querySelector("#soustitreDev").textContent="Création de sites web à votre image";
    document.querySelector(".savoir-plus").textContent="En savoir plus";
    }
}

const langSave = localStorage.getItem("langue"); // récupère valeur depuis stockage
if (langSave) {                                
    appliquerLangue(langSave);
} else {
    appliquerLangue("FR");                          
}

boutonEN.addEventListener("click", function () {
    appliquerLangue("EN");
    localStorage.setItem("langue", "EN");  // mémorise préférence ds stockage à chaque clic
});
boutonFR.addEventListener("click", function () {
    appliquerLangue("FR");
    localStorage.setItem("EN", "FR");
});