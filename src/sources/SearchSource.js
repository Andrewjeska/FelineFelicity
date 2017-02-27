//there will have to be a dev and a dist version, will add soon, want this to work rn

import 'whatwg-fetch';

import Promise from 'bluebird';

const UploadSource = {
    searchForPets(params) {

        return new Promise( (resolve, reject) => {
            fetch('/api/search' , {
                method: 'POST',
                body: JSON.stringify(params),
                headers: new Headers({
            		'Content-Type': 'application/json'
            	})
            }).then( (response) => {

                resolve(response.json());
            });

        });




    }
};


module.exports = UploadSource;
