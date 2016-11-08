var alt = require('../alt');
var UploadSource = require('../sources/UploadSource');

class UploadActions {
  uploadImage(file) {
    return (dispatch) => {
        dispatch();

        UploadSource.uploadFile(file).then( (file) => {
            console.log(file);
        }
    }
  }
}

module.exports = alt.createActions(UploadActions);
