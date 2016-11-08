//there will have to be a dev and a dist version, will add soon, want this to work rn

import 'whatwg-fetch'
import Promise from 'bluebird'
const port = "3000";


uploadFile(file){
    return new Promise( (resolve, reject) => {
        fetch("http://localhost:" + port "/api/upload" , {
            method: 'POST',
            body: file
        }).then(resolve)

    }
}
