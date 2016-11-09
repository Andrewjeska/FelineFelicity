var alt = require('../alt');
var UploadActions = require('../actions/UploadActions');


class UploadStore {
  constructor() {
    this.file = [];
    this.isCat = false;

    this.bindListeners({
      handleUploadedFile: UploadActions.UPDATE_UPLOAD_BOX
    });
  }

  handleUploadedFile(response) {
    
    //this.file = file;
    this.isCat = response.isCat
  }
}

module.exports = alt.createStore(UploadStore, 'UploadStore');
