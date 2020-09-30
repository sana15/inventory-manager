function loadAllLocations() {
    console.log('loadAllLocations')
    $.ajax({
        url: "http://localhost:5000/locations/all",
        type: "GET",
        contentType: "application/json",
    }).done(function (data) {
        console.log(data);
        if (data.length > 0) {
            var locationsList = $('#locationsList');
            console.log(locationsList)
            console.log('got some data');
            $('locationsList').empty();
            // console.log(data)

            for (var i = 0; i < data.length; i++) {
                // var newProduct = $('body').find(".product").clone();
                // $(newProduct).find(".name").append(data[i].name);
                // $(newProduct).find(".quantity").append(data[i].quantity);
                // $(newProduct).appendTo("#productsList");
                // console.log(i)
                // console.log(data[i]);
                $('<div/>', {
                    text: data[i].name,
                    class: 'locationListStyle'
                }).appendTo('#locationsList');
            }


        } else {
            console.log('no location found');
        }
    });
}

// function getLocationbyId(id) {
//     console.log('getProductbyId')
//     console.log(id);
//     $.ajax({
//         url: "http://localhost:5000/product?id=" + id,
//         type: "GET",
//         contentType: "application/json",
//     }).done(function (data) {
//         console.log(data);
//     });
// }

// ready event will be called as soon as page is loaded
$(document).ready(function () {
    console.log("ready!");
    loadAllLocations()
});

function addLocation() {
    console.log('addlocation');
    var locationName = $('#lName').val();
    console.log(locationName);
    // console.log(fd.getAll());
    if (locationName !== '') {
        // console.log('got both');
        $('#errorInfo').text('');
        var fd = new FormData();
        fd.append('locationName', locationName);
        $.ajax({
            url: "http://localhost:5000/location",
            type: "POST",
            processData: false, // important
            data: fd,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        }).done(function (data) {
            console.log(data);
            $('#lName').val('');
            loadAllLocations()
        });
    } else {
        console.log('something is missing dont do the api hit');
        $('#errorInfo').text('Enter Location name please');
    }
}
function deleteLocation(){
    console.log("deletelocation")
    var locationId = $('#lId').val()
    console.log(locationId)
    if (locationId !== '') {
        // console.log('got both');
        $('#errorInfo').text('');
        var fd = new FormData();        
        fd.append('id', locationId);
        $.ajax({
            url: "http://localhost:5000/location",
            type: "DELETE",
            processData: false, // important
            data: fd,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        }).done(function (data) {
            console.log(data);
            $('#pId').val('');
            loadAllLocations()
        });
    } else {
        console.log('something is missing dont do the api hit');
        $('#errorInfo').text('Enter Value please');
    }
}