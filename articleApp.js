window.onload = function() {
    main()
}

function main() {
    
    const articles = getArticles() //on reccup les articles
    let articleId = localStorage.getItem('itemId')

    let nom = articles[articleId].name
    let imageUrl = articles[articleId].imageUrl
    let description = articles[articleId].description
    
    let lentilleTab = articles[articleId].lenses
    let lentilleHtml = makeLentilleHtml(lentilleTab)

    document.getElementById("arianeArticle").innerText = nom
    document.getElementById("titre").innerText = nom
    document.getElementById("image").innerHTML = `<img src="${imageUrl}" id="imageAppareil" alt="Photo du ${nom}, appareil photo d'Orinoco">`
    
    document.getElementById("description").innerText = description
    document.getElementById("lentille").innerHTML = lentilleHtml
    
    //retouche du cadrage spécifiquement pour un appareil
    if (nom == "Hirsch 400DTS") {
        document.getElementById("imageAppareil").classList.add("imagArticle--positionHirsh")
    }


    //fais le code html de la liste
    function makeLentilleHtml(tab) {

        let html = `<option value="">${tab[0]}</option>`

        for (i=1 ; i < tab.length ; i++) {
            
            html = html + `<option value="">${tab[i]}</option>`
        }
        return html
    }



    //Acheter
    document.getElementById("acheter").addEventListener("click", function() {
        let qte = localStorage.getItem(articleId)
        if ( qte == null) {
            qte = 1
            localStorage.setItem(articleId, qte)
        } else {
            qte = parseInt(qte) + 1
            localStorage.setItem(articleId, qte)
        }

        document.getElementById("validation").classList.remove("displayNone")
    })

    document.getElementById("closeValidation").addEventListener("click", function() {
        document.getElementById("validation").classList.add("displayNone")
    })

}




function getArticles() {
    const articlesJson = localStorage.getItem('articles')
    const articles = JSON.parse(articlesJson)
    return articles
} 




