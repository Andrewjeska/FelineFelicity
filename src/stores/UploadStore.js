var alt = require('../alt');
var UploadActions = require('../actions/UploadActions');


class UploadStore {
  constructor() {

    this.isCat = false;

    this.bindListeners({
      handleUploadedFile: UploadActions.UPDATE_UPLOAD_BOX
    });
  }

  handleUploadedFile(response) {
    this.isCat = response.isCat

  }
}

module.exports = alt.createStore(UploadStore, 'UploadStore');
