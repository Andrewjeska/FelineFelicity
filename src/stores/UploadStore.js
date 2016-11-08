var alt = require('../alt');
var UploadActions = require('../actions/uploadActions');

class UploadStore {
  constructor() {
    this.file = [];

    this.bindListeners({
      handleUploadedFile: UploadActions.NEW_UPLOAD
    });
  }

  handleUploadedFile(file) {
    this.file = file;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
