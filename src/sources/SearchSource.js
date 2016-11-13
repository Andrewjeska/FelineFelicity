//there will have to be a dev and a dist version, will add soon, want this to work rn

import 'whatwg-fetch';

import Promise from 'bluebird';
const port = process.env.PORT || 8080;

const UploadSource = {
    searchForPets(params) {
        console.log(params)
            //var data = new FormData();
            //data.append('file', file[0])

            return new Promise( (resolve, reject) => {
                fetch('http://localhost:' + port + '/api/search' , {
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
