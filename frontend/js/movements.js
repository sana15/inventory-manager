function loadAllMovements() {
    console.log('loadAllMovemnets')
    $.ajax({
        url: "http://localhost:5000/movements/all",
        type: "GET",
        contentType: "application/json",
    }).done(function (data) {
        console.log(data);
        if (data.length > 0) {
            var movementsListDiv = $('#movementsList');
            console.log(movementsListDiv)
            console.log('got some data');
            $('#movementsList').empty();
            // console.log(data)
            var reveresedMovementList = data.reverse();

            for (var i = 0; i < reveresedMovementList.length; i++) {
                $('#movementsList').append(
                    '<tr class="product_row"><th class="product_id">'+ 
                    data[i].id +'</th><th class="product_name">' + 
                    data[i].productId+'</th><th class="product_name">'+
                    data[i].fromLocation+'</th><th class="product_name">'+
                    data[i].toLocation+'</th><th class="product_name">'+
                    data[i].quantity+'</th></tr>');
                console.log(i)
                // console.log(data[i]);
                
            }


        } else {
            console.log('no movemnets found');
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
    loadAllMovements()
});

function addMovement() {
    console.log('addMovement');
    var productId = $('#pId').val();
    var fromLocation = $('#fromLocation').val();
    var toLocation = $('#toLocation').val();
    var quantity = $("#pQuantity").val();
    console.log(productId);
    if (
    productId !== '' && 
    fromLocation !== '' &&
    toLocation !== '' &&
    quantity !== '' 
    ) {
        // console.log('got both');
        $('#errorInfo').text('');
        var fd = new FormData();
        fd.append('productId', productId);
        fd.append('fromLocation', fromLocation)
        fd.append('toLocation', toLocation)
        fd.append('quantity', quantity);
        $.ajax({
            url: "http://localhost:5000/movement",
            type: "POST",
            processData: false, // important
            data: fd,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        }).done(function (data) {
            console.log(data);
            $('#pName').val('');
            $('#pQuantity').val('');
            loadAllMovements()
        });
    } else {
        console.log('something is missing dont do the api hit');
        $('#errorInfo').text('Enter Values please');
    }
}
function deleteMovement(){
    console.log("deleteMovemnet")
    var movementId = $('#MId').val()
    console.log("MOVEMENT ID")
    console.log(movementId)
    if (movementId !== '') {
        // console.log('got both');
        $('#errorInfo').text('');
        var fd = new FormData();        
        fd.append('id', movementId);
        $.ajax({
            url: "http://localhost:5000/movement",
            type: "DELETE",
            processData: false, // important
            data: fd,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        }).done(function (data) {
            console.log(data);
            $('#MId').val('');
            loadAllMovements()
        });
    } else {
        console.log('something is missing dont do the api hit');
        $('#errorInfo').text('Enter Value please');
    }
}