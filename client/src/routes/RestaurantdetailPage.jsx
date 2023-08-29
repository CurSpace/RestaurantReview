import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';

const RestaurantdetailPage= () => {
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect(() => {

    const fetchData = async () => {
      try{
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.data.restaurant);
      }
      catch(err){
        console.log("AT CATCH",err);
      }
    };
    fetchData();
  },[id,setSelectedRestaurant]);
  return (
    //attempt render only when the var is defined
    <div>{selectedRestaurant && (
      <>
        <div className="mt-3">
          <Reviews />
        </div>
      </>
    )}
    </div>
  );
};

export default RestaurantdetailPage;