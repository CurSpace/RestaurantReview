require('dotenv').config();
const express = require("express");
const cors = require('cors');
// Import to run query
const db = require("./db");

const app = express();
// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('C:\\testProjects\\YelpClone\\server\\resources', express.static('resources'));
// ROUTES
//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try{
        const results = await db.query("SELECT * FROM restaurants");
        //console.log(results);
        res.json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows, //sending all rows
            },
        });
    }
    catch (err){
        console.log("err when getting all restaurants",err);
    }
});

// Get a resturant 
app.get("/api/v1/restaurants/:id", async (req, res) => {
    //console.log(req.params.id);
    try{
        const restaurant = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
        const reviews = await db.query("SELECT * FROM reviews WHERE id = $1", [req.params.id]);
        res.json({
            status: "success",
            data:{
                restaurant: restaurant.rows[0], // sending only one row
                reviews: reviews.rows
            }
        }

        )
    }
    catch (err){
        console.log(err);
    }
});

//Create a restaurant using data from the body.
app.post("/api/v1/restaurants/", async (req, res) => {
   //console.log(req.body);
    try{
        const results = await db.query("INSERT INTO restaurants(name, location, price_range) VALUES($1,$2,$3) returning *",
        [req.body.name, req.body.location,req.body.price_range]);
    //    console.log(result);
        res.json({
            status: "success",
            results: results.rows,
            data:{
                restaurant: results.rows[0] // sending inserted row
        }
    }
        )
    } catch (err){
        console.log(err);
    }
});

// Update restaurant

app.put("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query("UPDATE restaurants SET name = $1 , location = $2, price_range = $3 WHERE id =$4 returning *",
        [req.body.name,req.body.location,req.body.price_range, req.params.id]);
     //   console.log(req.params.id);
      //  console.log(req.body);
        res.json({
            status: "success",
            results: results.rows,
            data:{
                restaurant: results.rows[0] // sending inserted row
        }
    });
    } catch(err){
        console.log(err);
    }
});

app.delete("/api/v1/restaurants/:id", async (req,res) => {
    try{
       const results = await db.query("DELETE FROM restaurants WHERE id = $1",[req.params.id]);
        res.status(204).json({
            status: "success",
        });

    } catch (err){
        console.log(err);
    }
});
//END ROUTES
const port = process.env.PORT || 3001;  // defined in the .env file in not defined use port 3001
app.listen(port,() => {
    console.log(`Server is up and listening on port ${port}`);
});