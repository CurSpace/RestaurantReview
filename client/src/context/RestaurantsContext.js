import React, {useState, createContext} from "react";

//create context
export const RestaurantsContext = createContext();

// restaureans is an array that will store the list that we fetch from the backend server
// setRestaurants is the fucntion to update that list
// in the useState the default value before we fetch ayting will be an empty arr []
// context provider component that we will wrap the app so the it has access to the state
export const RestaurantsContextProvider = (props) => {

    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
// To update the UI creating a function and passing the newly created restaurant
    const addRestaurants = (restaurant) => {
        // appending the new restaurant to the restaruants lst
        setRestaurants([...restaurants, restaurant]);
    };
    return(
        // in the value pass the object whose value you want to pass
        // our components will now have the restaurants list and can use the setRestaurants function to update the state
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    );
};