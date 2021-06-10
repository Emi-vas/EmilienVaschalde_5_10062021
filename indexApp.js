main()

async function main() {
    
    const articles = await getArticles()

    let titre = articles[0].name
    


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



