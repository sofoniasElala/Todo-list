//create or update key-value 
function updateStorage(key, value){
    sessionStorage.setItem(key, JSON.stringify(value));
}

//get a parsed value from storage
function getValueFromStorage(key){
    return JSON.parse(sessionStorage.getItem(key));
}

//remove from storage
function removeFromStorage(key){
    sessionStorage.removeItem(key);
}

export {updateStorage, getValueFromStorage, removeFromStorage}