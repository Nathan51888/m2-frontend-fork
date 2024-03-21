import React from 'react'

function SimilarCars(props) {
    if (!props) return;
    if (props.data.error) {
        props.setGuideMsg(props.data.error);
        return <></>;
    }

    const {test} = props.data;
    //const similarCars = test.map((car, i) => <p key={`car-key-${i}`}>{car}</p>);
    const similarCars = <p>{test}</p>;

  return (
    <div>
        {similarCars}
     </div>
  )
}

export default SimilarCars
