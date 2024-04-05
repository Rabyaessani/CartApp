export const DISPLAY_ITEMS ='DISPLAY_ITEMS';
export const CLEAR_CART ='CLEAR_CART';
export const REMOVE_ITEM ='REMOVE_ITEM';
export const INCREASE_ITEM ='INCREASE_ITEM';
export const DECREASE_ITEM ='DECREASE_ITEM';
export const SETIS_LOADING ='SETIS_LOADING';


// Function to set a Map object in localStorage
export const setMapInLocalStorage = (key, map) => {
    try {
        localStorage.setItem(key, JSON.stringify([...map]));
        // console.log(key)
        // console.log(map)
    } catch (error) {
        console.error("Error setting data in localStorage:", error);
    }
};

// Function to get a Map object from localStorage
export const getMapFromLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (item) {
            // console.log(JSON.parse(item))
            return new Map(JSON.parse(item));
           
        }
    } catch (error) {
        console.error("Error getting data from localStorage:", error);
    }
    return new Map(); // Return an empty Map if data retrieval fails
};