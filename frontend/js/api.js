function getProducts(){
    $.ajax({
        url: "http://localhost:5000/products/all",
        type: "GET",
        contentType: "application/json",
    }).done(function(data) {
        console.log(data);
    });
}