import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UpdatePage from './routes/UpdatePage';
import Home from './routes/Home';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import Container from '@mui/material/Container';
import { RestaurantsContextProvider } from './context/RestaurantsContext';
const App = () => {
    return (
    <RestaurantsContextProvider>
        <div>
        <Container maxWidth="lg"> 
            <Router>
                <Routes>
                    <Route exact path = "/" element={<Home/>} />
                    <Route exact path = "/restaurants/:id/update" element={<UpdatePage/>} />
                    <Route exact path = "/restaurants/:id" element={<RestaurantdetailPage/>} />
                </Routes>
            </Router> 
         </Container>
     </div>
     </RestaurantsContextProvider>
    );
}

export default App;