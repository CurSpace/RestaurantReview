import React from 'react';

const StarRating = ({rating}) => {
// creates a list of stars 
  const stars = [];
  for (let i =1; i < 5; i++){
    if(i <= rating){
        stars.push(<i class="fa-solid fa-star text-warning"></i>);

    }
    else if (i === Math.ceil(rating) && !Number.isInteger(rating)){
        stars.push(<i class="fa-solid fa-star-half-stroke text-warning"></i>);

    }
    else{
        stars.push(<i class="fa-regular fa-star text-warning"></i>);
    }
  }
  // render out the list of stars
  return (
// no div just react fragments to contain the starts
  <>
  {stars}
  </>
  );
};

export default StarRating;