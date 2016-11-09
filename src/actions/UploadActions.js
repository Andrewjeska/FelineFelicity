var alt = require('../alt');
var UploadSource = require('../sources/UploadSource');

class UploadActions {
    updateUploadBox(response){
        return response;
    }

    uploadImage(file) {
        return (dispatch) => {
        // we dispatch an event here so we can have "loading" state.
        dispatch();


        UploadSource.sendFile(file)
            .then((response) => {
                // we can access other actions within our action through `this.actions`

                this.updateUploadBox(response);

            //console.log(file);
          })

        }
    }
}



module.exports = alt.createActions(UploadActions);
