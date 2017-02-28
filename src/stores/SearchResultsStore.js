var alt = require('../alt');
var UploadActions = require('../actions/UploadActions');
var SearchResultsActions = require('../actions/SearchResultsActions')


class SearchResultsStore {
  constructor() {
    this.pet_meta = {};
    this.params = {};
    this.page_number = 0;

    this.bindListeners({
      handleParamsChange: UploadActions.updateDropzone,
      handlePageChange: SearchResultsActions.updatePageNumber,
      handlePetMetaChange: SearchResultsActions.updatePetMeta,
    });
  }

  handleParamsChange(response) {
    /* this will matter for when we do filtering */
    this.params = {response.params;
    //result of image upload (breed, size, and TODO: color)

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



}

module.exports = alt.createStore(SearchResultsStore);
