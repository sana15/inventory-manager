function loadAllProducts(){
    console.log('loadAllProducts')
    $.ajax({
        url: "http://localhost:5000/products/all",
        type: "GET",
        contentType: "application/json",
    }).done(function(data) {
        console.log(data);
        if(data.length > 0){
            var productsListDiv = $('#productsList');
            console.log(productsListDiv)
            console.log('got some data');
            // console.log(data)

            for(var i=0; i < data.length; i++){
                // var newProduct = $('body').find(".product").clone();
                // $(newProduct).find(".name").append(data[i].name);
                // $(newProduct).find(".quantity").append(data[i].quantity);
                // $(newProduct).appendTo("#productsList");
                // console.log(i)
                // console.log(data[i]);
                $('<div/>',{
                    text: data[i].name,
                    class: 'productListStyle'
                }).appendTo('#productsList');
            }

       
        }else{
            console.log('no products found');
        }
    });
}

function getProductbyId(id){
    console.log('getProductbyId')
    console.log(id);
    $.ajax({
        url: "http://localhost:5000/product?id="+id,
        type: "GET",
        contentType: "application/json",
    }).done(function(data) {
        console.log(data);
    });
}

// ready event will be called as soon as page is loaded
$( document ).ready(function() {
    console.log( "ready!" );
    loadAllProducts()
});