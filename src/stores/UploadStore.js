var alt = require('../alt');
var UploadActions = require('../actions/UploadActions');

/* UploadStore.js stores data about the upload field and the picture that was upload */

//TODO: Should this store worry about file? What is file doing for us */

class UploadStore {
  constructor() {

    this.isCat = false;
    this.file = {};
    this.canUpload = true;
    this.params = {};

    this.bindListeners({
      handleFileStateChange: UploadActions.updateDropzone
    });
  }

  handleFileStateChange(response) {
    /* handles file upload or removal */
    this.isCat = response.params.isCat;
    this.file = response.file;
    this.canUpload = false;
    this.params = { 
                    'breed': response.params.breed, 
                    'size': response.params.size
                  }
  }
}

module.exports = alt.createStore(UploadStore, 'UploadStore');
