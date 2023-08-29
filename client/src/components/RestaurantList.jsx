import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate} from 'react-router-dom';

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
// Using the axios api to fetch the data from the backend
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
                console.log(response);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, [setRestaurants]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
            // we are using a templatjje string here
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                // keep in arr only if the condition True
                return restaurant.id !== id;
            }))
            console.log(response);
        }
        catch(err){
            console.log(err);

        }
    };
    const handleUpdate = (e, id) => {
    e.stopPropagation();
    // the route is in the front end routing (Appjsx)
    navigate(`/restaurants/${id}/update`);       

    };

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`);
    }

    return (
        <div className='list-group'>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className='ng-primary'>
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Ratings</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map((restaurant) => {
                        return (
                             <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>
                                    <img 
                                        src={restaurant.logo}
                                        alt = {`No Logo!`}
                                        style={{ width: '32px', height:'32px' }}
                                        />
                                        {restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{restaurant.rating}</td>
                                <td>
                                    <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
                                </td>
                                <td>
                                    <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                      );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantList;
