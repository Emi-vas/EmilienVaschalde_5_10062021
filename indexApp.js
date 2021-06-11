main()

async function main() {
    
    const articles = await getArticles() //on reccup les articles
    const main = document.getElementById("main")
    const template = document.getElementById("templateArticle")

    // let titre = articles[0].name

    
    
    for (i = 0; i < articles.length; i++) {
        let cloneTemplate = template.cloneNode(true) //je clone la div
        let image = articles[i].imageUrl
     
        document.getElementById("articleTitre").innerText = articles[i].name + i           
        document.getElementById("articlePrix").innerText = normPrice(articles[i].price)
        document.getElementById("articleImg").innerHTML = '<img src="' + image + '" alt="">'
        
        
        main.appendChild(cloneTemplate) //je le crée dans l'html
        template.classList.add("display")      
    }

    function normPrice(bigPrice) { //Pour mettre un espace dans le prix

        if (bigPrice < 1000) {
            return bigPrice
        } else if (bigPrice <1000000) {
            let arg1 = Math.trunc(bigPrice / 1000)  // 8
            let arg2 = bigPrice - arg1 * 1000 
            return arg1 + " " + arg2 + " €"
        } else {
            return "Soyons serieux"
        }
    }


}


//------------------------------- FONCTIONS ------------------------------------------//

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



