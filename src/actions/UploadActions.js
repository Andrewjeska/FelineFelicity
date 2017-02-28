var alt = require('../alt');
var UploadSource = require('../sources/UploadSource');
var Promise = require('bluebird');

/* UploadActions.js provides actions for Landing.js to use as far as uploading
files is concerned */

class UploadActions {
    updateDropzone(response){
        return response;

    }

    uploadImage(file) {
        return (dispatch) => {
        dispatch();


        UploadSource.sendFile(file)
            .then((response) => {
                this.updateDropzone({
                                      'params':response,
                                      'file':file
                                    });

          })

        }
    }
}



module.exports = alt.createActions(UploadActions);
