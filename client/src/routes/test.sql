CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating  INT NOT NULL check(rating >= 1  AND rating <=5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) values (1,'Yuki', 'restaurant was awesome', 5);
INSERT INTO reviews (restaurant_id, name, review, rating) values (1,'Brenden', 'the food was greate!', 4);
INSERT INTO reviews (restaurant_id, name, review, rating) values (1,'Amanda', 'greate customer service', 4);
INSERT INTO reviews (restaurant_id, name, review, rating) values (9,'Lexi', 'The place sucks ass', 2);
INSERT INTO reviews (restaurant_id, name, review, rating) values (9,'Meghan', 'This place gave me diabetes', 1);
INSERT INTO reviews (restaurant_id, name, review, rating) values (9,'Connor', 'The food made me shit for 3 days straight', 5);

UPDATE reviews
SET rating = 2
WHERE name = 'Connor';