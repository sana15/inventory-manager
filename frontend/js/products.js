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
            $('#productsList').empty();
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

function addProduct(){
console.log('addProduct');
var productName = $('#pName').val();
var productQuantity = $('#pQuantity').val();
console.log(productName);
console.log(productQuantity);

// console.log(fd.getAll());
if(productName !== '' && productQuantity !== '' ){
    // console.log('got both');
    $('#errorInfo').text('');
    var fd = new FormData();   
    fd.append('productName', productName);
    fd.append('quantity', productQuantity);
    $.ajax({
        url: "http://localhost:5000/product",
        type: "POST",
        processData: false, // important
        data: fd,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    }).done(function(data) {
        console.log(data);
        $('#pName').val('');
        $('#pQuantity').val('');
        loadAllProducts()
    });
}else{
    console.log('something is missing dont do the api hit');
    $('#errorInfo').text('Enter both please');
}
}