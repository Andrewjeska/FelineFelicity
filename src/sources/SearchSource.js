//there will have to be a dev and a dist version, will add soon, want this to work rn

import 'whatwg-fetch';

import Promise from 'bluebird';
const port = '3000';

const UploadSource = {
    searchForPets(params) {
            //var data = new FormData();
            //data.append('file', file[0])

            return new Promise( (resolve, reject) => {
                fetch('http://localhost:' + port + '/api/search' , {
                    method: 'GET',
                    body: params
                }).then( (response) => {

                    resolve(response.json());
                });

            });




    }
};


module.exports = UploadSource;