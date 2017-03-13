var alt = require('../alt');
var SearchSource = require('../sources/SearchSource');
var Promise = require('bluebird');

class SearchResultsActions {
    updatePageNumber(page_number){
        return page_number;
    }

    updatePetMeta(pet_meta){
        return pet_meta;
    }


    changePage(page_number) {
        return (dispatch) => {
        // we dispatch an event here so we can have "loading" state.
            dispatch();

            this.updatePageNumber(page_number);

        }
    }

    searchForPets(params){
        return (dispatch) => {
            dispatch();

            SearchSource.searchForPets(params)
                .then((response) => {

                    this.updatePetMeta(response);


              })
            //request to petfinder
        }
    }


}

module.exports = alt.createActions(SearchResultsActions);
