var alt = require('../alt');
var UploadActions = require('../actions/UploadActions');
var SearchResultsActions = require('../actions/SearchResultsActions')


class SearchResultsStore {
  constructor() {
    this.pet_meta = {};
    this.params = {};
    this.page_number = 0;

    this.bindListeners({
      handleParamsChange: UploadActions.updateUploadBox,
      handlePageChange: SearchResultsActions.updatePageNumber,
      handlePetMetaChange: SearchResultsActions.updatePetMeta,
      handleSubmitPostal: SearchResultsActions.updatePostal
    });
  }

  handleParamsChange(response) {
    this.params = response.params;
    //neccesary for search query

  }

  handlePageChange(page_number) {
      this.page_number = page_number;
      //for paginated results

  }

  handlePetMetaChange(pet_meta) {
      this.pet_meta = pet_meta;
      console.log(this.pet_meta);
      //results of petfinders query

  }

  handleSubmitPostal(postal){
      this.params.postal = postal;
      console.log(this.params);

      //adds postal code to params

  }

}

module.exports = alt.createStore(SearchResultsStore);
