$(document).ready(function() {
    let amenities = {};

    $('input[type="checkbox"]').change(function() {
        if ($(this).is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        updateAmenities();
        });
    });

    function updateAmenities() {
        let amenitiesList = Object.values(amenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    }

    $.get('http://0.0.0.0:5001/api/v1/places_search/', function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
    $.ajax({
        type: 'POST',
        beforeSend: function() {
            $('button').click(function() {
                let selectedAmenities = { amenities: Object.keys(amenities) };
                $.ajax({
                    type: 'POST',
                    url: 'http://0.0.0.0:5001/api/v1/places_search',
                    data: JSON.stringify(selectedAmenities),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        $('.places').empty();
                        for (let i = 0; i < data.length; i++) {
                            let place = data[i];
                            $('.places').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
                        }
                    }
                });
            });
        },
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: '{}',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let place = data[i];
                $('.places').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
            }
        }
    });