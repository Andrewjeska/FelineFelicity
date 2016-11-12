var alt = require('../alt');
var UploadActions = require('../actions/UploadActions');
var SearchResultsActions = require('../actions/SearchResultsActions')


class SearchResultsStore {
  constructor() {
    this.pet_meta = [];
    this.params = {};
    this.page_number = 0;

    this.bindListeners({
      handleUploadedFile: UploadActions.updateUploadBox,
      handlePageChange: SearchResultsActions.updatePageNumber,
      handlePetMetaChange: SearchResultsActions.updatePetMeta,
      handleSubmitPostal: SearchResultsActions.updatePostal
    });
  }

  handleUploadedFile(response) {
    this.params = response.params;


  }

  handlePageChange(page_number) {
      this.page_number = page_number;

  }

  handlePetMetaChange(pet_meta) {
      this.pet_meta = pet_meta;

  }

  handleSubmitPostal(postal){
      this.params.postal = postal;

  }

}

module.exports = alt.createStore(SearchResultsStore);
