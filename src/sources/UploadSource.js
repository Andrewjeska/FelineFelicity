//there will have to be a dev and a dist version, will add soon, want this to work rn

import 'whatwg-fetch';

import Promise from 'bluebird';
const port = process.env.PORT || 8080;

const UploadSource = {
    sendFile(file) {
            //console.log(file);
            var data = new FormData();
            data.append('file', file[0])

            return new Promise( (resolve, reject) => {
                fetch('https://localhost:' + port + '/api/upload' , {
                    method: 'POST',
                    body: data
                }).then( (response) => {

                    resolve(response.json());
                });

            });




    }
};


module.exports = UploadSource;
