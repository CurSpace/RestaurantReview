import React, {useContext, useState} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
function AddRestaurant() {
    const {addRestaurants} = useContext(RestaurantsContext);
    const[name, setName] = useState("");
    const[location, setLocation] = useState("");
    // set the initial state to Price Range
    const[priceRange, setPriceRange] = useState("Price Range");

    const handleClick = async (e) => {
      // prevents html from reloading because reloading on submit will case react to loose state.
      e.preventDefault();
      try{
        const response = await RestaurantFinder.post("/",{
          // you can sorten name: name to just name
          name: name,
          location,
          price_range: priceRange
        });
        addRestaurants(response.data.data.restaurant);
        console.log(response);
      }
      catch(err){

      }

    }
  return (
    <div className='mb-4'>
      <form action="">
        <div className="row">
          <div className="col">
            <input value = {name} onChange={e => setName(e.target.value)} type="text" className='form-control' placeholder='name' />
          </div>
          <div className="col">
            <input value = {location} onChange={e => setLocation(e.target.value)} className='form-control' type="text" placeholder='location' />
          </div>
          <div className="col">
            <select value = {priceRange} onChange={e => setPriceRange(e.target.value)} className='custom-select my-1 mr-sm-2'>
              <option disabled>Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$$</option>
            </select>
          </div>
          <div className="col">
            <button type = "submit" onClick = {handleClick} className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
