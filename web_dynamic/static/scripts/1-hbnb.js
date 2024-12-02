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

    function updateAmenities() {
        let amenitiesList = Object.values(amenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    }
});