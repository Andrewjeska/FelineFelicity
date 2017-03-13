var alt = require('../alt');
var SearchSource = require('../sources/SearchSource');
var Promise = require('bluebird');

class SearchResultsActions {
    updateAuthenticationState(data){
        return page_number;
    }


    register(params){
        return (dispatch) => {
            dispatch();

            AuthenticationSource.register(params)
                .then((response) => {

                    this.updateAuthenticationState(response);


              })
           
        }
    }


    login(params){
        return (dispatch) => {
            dispatch();

            AuthenticationSource.register(params)
                .then((response) => {

                    this.updateAuthenticationState(response);


              })
           
        }
    }

    logout(params){
        return (dispatch) => {
            dispatch();

            AuthenticationSource.register(params)
                .then((response) => {

                    this.updateAuthenticationState(response);


              })
            
        }
    }




}

module.exports = alt.createActions(SearchResultsActions);
