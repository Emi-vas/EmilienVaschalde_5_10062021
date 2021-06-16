window.onload = function() {
    main()
}

function main() {
    
    const articles = getArticles() //on reccup les articles
    let articleId = localStorage.getItem('itemId') //on reccup l'id dans le LS pour savoir quel article afficher

    let nom = articles[articleId].name
    let imageUrl = articles[articleId].imageUrl
    let description = articles[articleId].description
    let prix = articles[articleId].price / 100
    
    let lentilleTab = articles[articleId].lenses //on reccup le tableau des lentilles
    let lentilleHtml = makeLentilleHtml(lentilleTab)

    let qteArticle = localStorage.getItem('qteArticle')

    // mise en place de l'HTML
    document.getElementById("arianeArticle").innerText = nom
    document.getElementById("titre").innerText = nom
    document.getElementById("image").innerHTML = `<img src="${imageUrl}" id="imageAppareil" alt="Photo du ${nom}, appareil photo d'Orinoco">`
    
    document.getElementById("description").innerText = description
    document.getElementById("lentille").innerHTML = lentilleHtml
    document.getElementById("prix").innerText = prix + " €"
    
    //retouche du cadrage spécifiquement pour un appareil
    if (nom == "Hirsch 400DTS") {
        document.getElementById("imageAppareil").classList.add("imagArticle--positionHirsh")
    }


    //fais le code html de la liste
    function makeLentilleHtml(tab) {

        let html = `<option value="">${tab[0]}</option>`

        //on commence à i = 1 pck on déclare le 0 et le 1 dans la première boucle
        for (i=1 ; i < tab.length ; i++) {
            
            html = html + `<option value="${tab[i]}">${tab[i]}</option>`
        }
        return html
    }

    //on affiche si le panier était pas vide
    if (qteArticle != null && qteArticle != 0) {
        afficheQteArticle(qteArticle)
    }



    //Acheter
    document.getElementById("acheter").addEventListener("click", function() {
        //Recup la valeur de la lentille
        let lentilleSelect = document.getElementById("lentille").selectedIndex // on reccup l'indice
        lentilleSelect = articles[articleId].lenses[lentilleSelect] // on utilise l'indice pour reccup le nom string
        
        //Ajout au panier

        let panier = localStorage.getItem('panier')
        // si le panier est vide, on en fait un tableau
        if (panier == null) {
            panier = []
        } else {  //sinon on converti le JSON
            panier = JSON.parse(panier)
        }
        
        
        let panierArticle = {  // sera ajouter si il n'est pas déja présent dans le panier
            "nom" : nom,
            "lentille" : lentilleSelect,
            "qte" : 1,
            "prix" : prix
            }

        let push = 0 //pour verif si t'as push
        
        
        for (i in panier) { //je check le panier
            if (panier[i].nom == nom && panier[i].lentille == lentilleSelect) { //si il y a déjà le même article (nom + lentille)
                panier[i].qte ++ 
                push = 1
            }
        }

        if (push == 0) {
            panier.push(panierArticle)
        }
        
        // On envoi le panier dans le LS
        panier = JSON.stringify(panier) 
        localStorage.setItem('panier', panier)

        // bloc de validation
        document.getElementById("validation").classList.remove("displayNone")
        
        // qte panier
        if (qteArticle == null) {
            qteArticle = 1
        } else {
            qteArticle++
        }
        localStorage.setItem('qteArticle', qteArticle)
        afficheQteArticle(qteArticle)
    })

    //On regarde si il click sur "Continuer mes achats"
    document.getElementById("closeValidation").addEventListener("click", function() {
        document.getElementById("validation").classList.add("displayNone")
    })

}




function getArticles() {
    const articlesJson = localStorage.getItem('articles')
    const articles = JSON.parse(articlesJson)
    return articles
} 

// fct necessaire pck appelée quand on clic sur acheter
function afficheQteArticle(qte) {
    document.getElementById("qtePanier").innerText = ` (${qte})`
}



