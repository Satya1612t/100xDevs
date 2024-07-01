//Complete authentication for the web Tokens

function getData() {
    fetch("https://fakestoreapi.com/products")
        .then(function (response) {
            const data = response.json()
            .then(function (params) {
                console.log(params);
            })  
        })
}

getData();