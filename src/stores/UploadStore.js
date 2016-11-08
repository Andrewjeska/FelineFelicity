var alt = require('../alt');
var UploadActions = require('../actions/UploadActions');


class UploadStore {
  constructor() {
    this.file = [];

    this.bindListeners({
      handleUploadedFile: UploadActions.UPDATE_UPLOAD_BOX
    });
  }

  handleUploadedFile(file) {
    //console.log(file)
    this.file = file;
  }
}

module.exports = alt.createStore(UploadStore, 'UploadStore');
