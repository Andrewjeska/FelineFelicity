var alt = require('../alt');
var UploadActions = require('../actions/UploadActions');

/* UploadStore.js stores data about the upload field and the picture that was upload */

//TODO: Should this store worry about file? What is file doing for us */

class UploadStore {
  constructor() {

    this.isCat = false;
    this.file = null;
    this.canUpload = true;
    this.params = null;

    this.bindListeners({
      handleFileStateChange: UploadActions.updateDropzone
    });
  }

  handleFileStateChange(response) {
    /* handles file upload or removal */
   // console.log(response.isCat);
    this.isCat = response.isCat;
    this.file = response.file;
    this.canUpload = response.canUpload;
    this.params = response.params;
  }
}

module.exports = alt.createStore(UploadStore, 'UploadStore');
