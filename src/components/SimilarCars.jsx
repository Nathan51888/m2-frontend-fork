import React from 'react'

function SimilarCars(props) {
    if (!props) return;
    if (props.data.error) {
        props.setGuideMsg(props.data.error);
        return <></>;
    }

    const response = props.data;
    const similarCars = response.map((car, i) => <p key={`car-key-${i}-instock`}>{`${car.brand} ${car.model} ${car.year}`}</p>);

  return (
    <div>
        {similarCars}
     </div>
  )
}

export default SimilarCars
