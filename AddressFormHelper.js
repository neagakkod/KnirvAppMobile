var AddressFormHelper = function ()
{
    var self = this;

    var addressComponents = {
          street_number: 'short_name',
          route: 'long_name',
          locality: 'long_name',//aka city
          administrative_area_level_1: 'long_name',//aka region
          country: 'long_name',
          postal_code: 'short_name'
        };


    /*
    //this function should find the address and put it on the form  once its found
      PS: make sure that the form has addressComponents as their names
    parameters:
      inputElementId: Textfield to searchAddress
      blankAddressObjext: address with no values
      treatFoundAddress: call back with returned address
    */
    self.launchPlaceSearcher = function(inputElementId,blankAddressObject,treatFoundAddress)
    {
      google.maps.event.addDomListener(window, 'load', function()
         {
                var options = {
                    type: ['geocode']
                };
                var input = document.getElementById(inputElementId);
                var autocomplete = new google.maps.places.Autocomplete(input , options);
                // When the user selects an address from the dropdown, populate the address
                // fields in the form.
                autocomplete.addListener('place_changed', function()
                {
                     var place = autocomplete.getPlace();

                      var discoveredAddress = {};
                      // Get each component of the address from the place details
                     // and fill the corresponding field on the form.
                     for (var i = 0; i < place.address_components.length; i++)
                     {
                         var addressType = place.address_components[i].types[0];
                         if (addressComponents[addressType])
                         {
                             var val = place.address_components[i][addressComponents[addressType]];
                             var el= document.getElementsByName(addressType)[0];
                             discoveredAddress[addressType]=val;
                             if(el)
                              {
                                el.value = val;
                                var $e = angular.element(el);
                                  $e.triggerHandler('input');
                              }
                         }
                     }

                     /*blankAddressObject.streetAddress = discoveredAddress.street_number+" "+discoveredAddress.route;
                     blankAddressObject.city = discoveredAddress.locality;
                     blankAddressObject.region = discoveredAddress.administrative_area_level_1;
                     blankAddressObject.country = discoveredAddress.country;
                     blankAddressObject.postal_code = discoveredAddress.postal_code;*/

                   console.log(blankAddressObject);

                   treatFoundAddress(blankAddressObject);
                });
            });
    }

}
