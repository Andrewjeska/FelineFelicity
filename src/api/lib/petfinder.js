//takes descriptions
//returns links to images (write to Json?)
'use strict';
var request = require('request');

/* TODO: Make a method that gets the most recent breeds */

var key = "9d26953461008b22ba17b6e294cebfed";


let find_url = "http://api.petfinder.com/pet.find?"
        + "format=json"
        + "&key=" + key
        //+ "&location=21784" //how to get this from the user?
        //+ "&count=10" //we will need to handle this somehow
        + "&animal=cat"

        //+ "&breed=Domestic Short Hair";

let breed_url = "http://api.petfinder.com/breed.list?"
        + "key=" + key
        + "&animal=cat"
        + "&format=json";



function getPets(search_params, res) {


    var request_url = find_url + "&location="+ search_params.postal + "&count=250";

    if(search_params.breed) request_url += "&breed=" + search_params.breed;
    if(search_params.size) request_url += "&size=" + search_params.size;

    let adopt_url = "https://www.petfinder.com/adoption-inquiry/";


    request(request_url,  (error, response, body) => {
        if (!error && response.statusCode == 200) {


            var cat_data = JSON.parse(body);

            var cat_store = cat_data.petfinder.pets.pet
            // All cats

            var cat_meta_all = []
            // meta data for each cat

            cat_store.forEach( (curr_cat) => {
                //console.log(curr_cat.name.$t);

                var cat_pictures = [];

                if(typeof curr_cat.media.photos !== 'undefined'){ //some cats don't have pictures
                    var pictures = curr_cat.media.photos.photo;

                    //change to foreach
                    for(var i = 0; i < pictures.length; i++){
                        if(pictures[i]['@size'] == "x"){
                            //we only wanr large cat pictures
                            cat_pictures.push(pictures[i].$t);
                        }
                    }
                }

                var name = curr_cat.name.$t;
                var city = curr_cat.contact.city.$t;
                var state = curr_cat.contact.state.$t;
                var description = curr_cat.description.$t;
                var adopt_link = adopt_url + curr_cat.id.$t;

                if(typeof description !== 'undefined') { //some cats don't have descriptions
                    description = description.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    //change newlines to breaks if we have a description

                } else {
                    description = "Click on \"Adopt\" to learn more";
                    //default description
                }

                var cat_meta = {
                    name: name,
                    city: city,
                    state: state,
                    description: description,
                    adopt_link: adopt_link,
                    photos: cat_pictures
                };


                cat_meta_all.push(cat_meta);
            });

            getCatsCallback(res, cat_meta_all)
        }

    });


}

function getCatsCallback(res, cat_meta){
    //console.log(cat_meta);
    res.send(cat_meta);
}

module.exports = getPets;
