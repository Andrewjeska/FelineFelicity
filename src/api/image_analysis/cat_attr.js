//calls google vision API
//takes a picture of a cat and finds data such as color, size, breed, etc
'use strict';

const vision = require('@google-cloud/vision');
const breeds = require('./breeds.js')
const Promise = require('bluebird')

//var path = require('path');
const jsonPath = __dirname + '/FelineFelicity-a7fe406c6095.json'



let visionClient = vision({
  projectId: 'felinefelicity@felinefelicity-a4b9d.iam.gserviceaccount.com',
  keyFilename: jsonPath
});


/*export function getLabels(imageURI) {

    return new Promise((resolve, reject) => {

        visionClient.detectLabels(imageURI, (err, labels) => {
            if(err){
                reject(err);

            }

            resolve(labels);


        });

    });

}*/


function getDetections(picture){
    /*
    retrieves any detections based on the photo
    */

    // need check for image url

    var image = new Buffer(picture)

    var options = {
        maxResults: 20,
        types: ['labels']
    };

    return new Promise( (resolve, reject) => {

        visionClient.detect(image, options, (err, detections, apiResponse) => {
            if(err){
              reject(err);

            }
            resolve(detections);

        });

    });

}



function parseVisionData(detections) {

    /*

    this cleans the detections we get from the google api. This should be
    done before calling getParams

    */
    return new Promise( (resolve,reject)=> {


        var stringOps = [];

        for(var i = 0; i < detections.length; i++){
            var str = detections[i];

            stringOps.push(
                detections[i] = detections[i].replace(/(cats)|(cat)/, (txt) => {
                    return "";
                })
            );

            //remove all instances of "cat" (mostly because it's redundant)

            stringOps.push(
                detections[i] = detections[i].replace("haired", "Hair")
            );

            //changed "haired" to "Hair", as "haired" is used often when we have a breed

            stringOps.push(
                detections[i] = detections[i].replace(/\w\S*/g, (txt) => {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                })
            );

            //capitalize first letter of every word, that's what the API expects

            stringOps.push(
                detections[i] = detections[i].trim()
            );

            //trim any spaces on the side
        }



        Promise.all(stringOps).then( () => {
            //do we need the do nothing function?
        });

        resolve(getParams(detections));

    })

}

function getParams(detections){
    /*

    Looks at detections, returns object with the valid parameters.
    In this future, this will probably include color.

    */
        let sizes = {
            'Small To Medium Sized' : 'S',
            'Medium To Large Sized' : 'M'
        };

        var breed = "";
        var size = '';

        for(var i = 0; i < detections.length; i++){
            var breed_idx = breeds.indexOf(detections[i])

            if(breed_idx > -1 && breed === "" )
                //if detections has our breed and it hasn't been found yet
                breed = breeds[breed_idx];

            if(detections[i] in sizes && size === '')
                //if detections has a size and it hasn't been found yet
                size = sizes[detections[i]];


        }


        return {"breed": breed, "size": size} ;

}

module.exports = {
    'getDetections': getDetections,
    'parseVisionData': parseVisionData
}
