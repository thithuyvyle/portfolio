
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
    {
        nom: { FR: "Portfolio version 01", EN: "Portfolio version 01" },
        descriptif: { FR: "Exercice de création de portfolio", EN: "Portfolio creation exercise" },
        categorie: "site",
        image: "images/portfolio_version01.jpg",
        link: "https://thithuyvyle.github.io/portfolio_exercise/"
    },
    {
        nom: { FR: "Pokedex", EN: "Pokedex" },
        descriptif: { FR: "Exercice: appel d'API Pokemon", EN: "Exercise: Pokemon API call" },
        categorie: "site",
        image: "images/pokemon.jpg",
        link: "https://thithuyvyle.github.io/pokemon_API/",
    },
    {
        nom: { FR: "Maquette Portfolio", EN: "Portfolio Wireframe" },
        descriptif: { FR: "Maquette du portfolio", EN: "Portfolio wireframe" },
        categorie: "maquette",
        image: "images/figma_portfolio.jpg",
        link: "https://www.figma.com/proto/wfSMNIys0XieCU6YOE8Da1/Descodeuses-projects?node-id=21-56&starting-point-node-id=21%3A56&t=lwAVZfRCTB7peyvv-1"
    },
    {
        nom: { FR: "Maquette BookFlare", EN: "BookFlare Wireframe" },
        descriptif: { FR: "Maquette d'un site sur un réseau social de livres", EN: "Wireframe of a website for a social book network" },
        categorie: "maquette",
        image: "images/figma_bookflare.jpg",
        link: "https://www.figma.com/proto/0DO21rp0Zp6V2DjXJsJca2/Interface-Persona?node-id=46-116&starting-point-node-id=46%3A116&t=cFXajU68BtEGSCTI-1"
    },
];

let galerie = document.getElementById("galerie");
function ajouterProjets(filteredProjets, langue) {
    galerie.innerHTML = "";// Clear the gallery +++
    filteredProjets.forEach(proj => {
        const div = document.createElement("div");
        div.className = "projet";
        div.innerHTML =
            `<h3>${proj.nom[langue]}</h3>
    <a href=${proj.link} target="_blank"><img src=${proj.image} alt="${proj.nom[langue]}"></img></a>
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
    if (galerie) {
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
        if (textarea) textarea.placeholder = trad.placeholderTextarea;

        localStorage.setItem("langue", langue); // sauvegarde à chaque appel
    }

    let boutonFR = document.getElementById("langFR");
    let boutonEN = document.getElementById("langEN");
    boutonFR.addEventListener("click", () => appliquerLangue("FR"));
    boutonEN.addEventListener("click", () => appliquerLangue("EN"));
})

