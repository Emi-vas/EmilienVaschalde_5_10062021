main()

async function main() {
    
    const articles = await getArticles() //on reccup les articles
    const main = document.getElementById("main")
    const template = document.getElementById("templateArticle")

    // let titre = articles[0].name

    
    
    for (i = 0; i < articles.length; i++) {
        let clone = document.importNode(template, true) //je clone la div
        

        main.appendChild(clone) //je le crée dans l'html
        document.getElementById("articleTitre").innerText = articles[i].name + i
        template.classList.add("display")
        
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



