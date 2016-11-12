var alt = require('../alt');
var UploadActions = require('../actions/UploadActions');


class UploadStore {
  constructor() {

    this.isCat = false;

    this.bindListeners({
      handleUploadedFile: UploadActions.updateUploadBox
    });
  }

  handleUploadedFile(response) {
    this.isCat = response.isCat
    //will prevent image removal from dropzone

  }
}

module.exports = alt.createStore(UploadStore, 'UploadStore');
