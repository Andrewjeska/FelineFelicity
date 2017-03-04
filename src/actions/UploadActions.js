var alt = require('../alt');
var UploadSource = require('../sources/UploadSource');
var Promise = require('bluebird');

/* UploadActions.js provides actions for Landing.js to use as far as uploading
files is concerned */

class UploadActions {
    updateDropzone(response, removeFile){
        return Object.assign(response, {canUpload: removeFile});

    }

    uploadImage(file) {
        return (dispatch) => {
        dispatch();


        UploadSource.sendFile(file)
            .then((response) => {
                this.updateDropzone({
                                      'params':{breed: response.breed, size: response.size} ,
                                      'isCat': response.isCat,
                                      'file':file
                                      
                                    }, false);

          })

        }
    }
}



module.exports = alt.createActions(UploadActions);
