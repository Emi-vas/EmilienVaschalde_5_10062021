function verifForm() {
   
    //verif prenom
    const firstName = document.getElementById("firstName")

    firstName.addEventListener("change", function() {
        verifName(firstName.value, firstName)
    })

    //verif nom
    const lastName = document.getElementById("lastName")
    lastName.addEventListener("change", function() {
        verifName(lastName.value, lastName)
    })

    //verif adresse
    const adress = document.getElementById("adress")
    adress.addEventListener("change", function(){
        verifAdress(adress.value, adress)
    })
}

function verifAdress(adress, id) {
    //force à écrire un chiffre, un espace et une lettre. Après libre aZ et espace
    adressRegex = /^[0-9]{1,4}[\s]{1}[a-zA-Z]+[a-zA-Z-\s]+$/ 

    if (adressRegex.test(adress) == false) {
        id.classList.remove("valide")
        id.classList.add("invalide")

        id.nextElementSibling.innerText = "L'adresse n'est pas valide :("
        id.nextElementSibling.classList.remove("displayNone")
    } else {
        id.classList.remove("invalide")
        id.classList.add("valide")

        id.nextElementSibling.classList.add("displayNone")
    }
}


//On recoit le nom à tester et l'id du formulaire.
function verifName(name, id) {
    let nameRegex = /^[a-zA-Z-\séèùà]+$/

    console.log()

    if (nameRegex.test(name) == false) {
        id.classList.remove("valide")
        id.classList.add("invalide")

        id.nextElementSibling.innerText = "Le nom n'est pas valide :("
        id.nextElementSibling.classList.remove("displayNone")
    } else {
        id.classList.remove("invalide")
        id.classList.add("valide")
        id.nextElementSibling.classList.add("displayNone") // le texte erreur
    }
}

