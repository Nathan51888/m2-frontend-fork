/* eslint-disable react/prop-types */
import style from './Analysis.module.css';

export default function Analysis(props) {
    if (!props) return;
    const {brand, model, similar_cars} = props.data;
    const alternatives = similar_cars.map((car, i) => <p key={`car-key-${i}`}>{car}</p>);

    return (
        <div className={style.results}>
            <h3>Results:</h3>
            <h4>Your Car: {brand + ' ' + model}</h4>
            <h4>Similar Alternatives: </h4>
            {alternatives}
        </div>
    );
}
