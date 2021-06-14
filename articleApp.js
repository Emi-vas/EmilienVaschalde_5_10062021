main()

async function main() {
    
    const articles = await getArticles() //on reccup les articles
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
        let nbArticle = localStorage.getItem(articleId)
        if ( nbArticle == null) {
            console.log("Il n'y avait pas d'article " + nbArticle)
            nbArticle = 1
            console.log(nbArticle)
            localStorage.setItem(articleId, nbArticle)
        } else {
            nbArticle = parseInt(nbArticle) + 1
            localStorage.setItem(articleId, nbArticle)
            console.log(nbArticle)
        }

        document.getElementById("validation").innerHTML = `Article ajouté au <a href="panier.html">panier</a>`
    })

}




async function getArticles() {
    return fetch("http://localhost:3000/api/cameras")
             .then(function(res) {
                 if (res.ok) {
                     return res.json();
                 }
             })
             .then(function(value) {
                 return value;
             })
             .catch(function(err) {
 
             });
} 




