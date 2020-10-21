function loadAllProducts() {
    console.log('loadAllProducts')
    $.ajax({
        url: "http://localhost:5000/products/all",
        type: "GET",
        contentType: "application/json",
    }).done(function (data) {
        console.log(data);
        if (data.length > 0) {
            var productsListDiv = $('#productsList');
            console.log(productsListDiv)
            console.log('got some data');
            $('#productsList').empty();
            var reveresedProductList = data.reverse();
            for (var i = 0; i < reveresedProductList.length; i++) {
                $('#productsList').append(
                    '<tr class="product_row"><th class="product_id">'+ 
                    data[i].id +'</th><th class="product_id">' + 
                    data[i].name+'</th><th class="product_id">'+
                    data[i].quantity+'</th><th class="product_id">'+
                    data[i].Mquanity+'</th><th class="product_id">'+
                    data[i].difference+'</th></tr>');
            }
        } else {
            console.log('no products found');
        }
    });
}

function getProductbyId(id) {
    console.log('getProductbyId')
    console.log(id);
    $.ajax({
        url: "http://localhost:5000/product?id=" + id,
        type: "GET",
        contentType: "application/json",
    }).done(function (data) {
        console.log(data);
    });
}

// ready event will be called as soon as page is loaded
$(document).ready(function () {
    console.log("ready!");
    loadAllProducts()
});

function addProduct() {
    console.log('addProduct');
    var productName = $('#pName').val();
    var productQuantity = $('#pQuantity').val();
    console.log(productName);
    console.log(productQuantity);

    // console.log(fd.getAll());
    if (productName !== '' && productQuantity !== '') {
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
        }).done(function (data) {
            console.log(data);
            $('#pName').val('');
            $('#pQuantity').val('');
            loadAllProducts()
        });
    } else {
        console.log('something is missing dont do the api hit');
        $('#errorInfo').text('Enter both please');
    }
}
function deleteProduct(){
    console.log("deleteProduct")
    var productId = $('#pId').val()
    console.log(productId)
    if (productId !== '') {
        // console.log('got both');
        $('#errorInfo').text('');
        var fd = new FormData();        
        fd.append('id', productId);
        $.ajax({
            url: "http://localhost:5000/product",
            type: "DELETE",
            processData: false, // important
            data: fd,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        }).done(function (data) {
            console.log(data);
            $('#pId').val('');
            loadAllProducts()
        });
    } else {
        console.log('something is missing dont do the api hit');
        $('#errorInfo').text('Enter Value please');
    }
}