function fetchAllMovedProducts() {
    console.log('fetchAllMovedProducts')
    $.ajax({
        url: "http://localhost:5000/get-all-moved",
        type: "GET",
        contentType: "application/json",
    }).done(function (data) {
        console.log(data);
        if (data.length > 0) {
            var locationsList = $('#locationsList');
            console.log(locationsList)
            console.log('got some data');
            $('#locationsList').empty();
            var reveresedLocationList = data.reverse();
            for (var i = 0; i < reveresedLocationList.length; i++) {
                
                $('#locationsList').append(
                    '<tr class="product_row"><th class="product_id">'+ 
                    data[i].productId +'</th><th class="product_id">' + 
                    data[i].name +'</th><th class="product_id">' +
                    data[i].lname +'</th><th class="product_id">' +
                    data[i].quantity +'</th><th class="product_id">' +
                    data[i].pquantity +'</th><th class="product_id">' +
                    data[i].differenece+'</th><th class="product_id">'+'</th></tr>');
                    
            }


        } else {
            console.log('no location found');
        }
    });
}

$(document).ready(function () {
    console.log("ready!");
    fetchAllMovedProducts()
});