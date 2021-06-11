main()

async function main() {
    
    const articles = await getArticles() //on reccup les articles
    let articleId = localStorage.getItem('itemId')

    let nom = articles[articleId].name


    document.getElementById("arianeArticle").innerText = nom
    

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




