import style from './ImageAnalyzer.module.css';
import { IoReloadCircleOutline } from 'react-icons/io5';
import Analysis from './Analysis';
import { useState } from 'react';
import SimilarCars from './SimilarCars';

export default function ImageAnalyzer() {
    const [displayedImg, setDisplayedImg] = useState();
    const [file, setFile] = useState();
    const [analysis, setAnalysis] = useState();
    const [loading, setLoading] = useState(false);

    // set after analysis has been done
    const [similarCars, setSimilarCars] = useState();

    const [guideMsg, setGuideMsg] = useState('Please pick a photo of your car and we will do the rest.');

    function getSimilarCars(brand) {
        fetch(`http://localhost:4000/get-similar-cars-instock?brand=${brand}`)
            .then(res => res.json())
            .then(res => {
                setSimilarCars(res);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }

    const setFileHandler = e => {
        // Array with allowed file types.
        const filesCheckArr = ['image/png', 'image/jpg', 'image/jpeg'];

        const file = e.target.files[0];

        // Guard Clauses
        if (!file) return;
        if (!filesCheckArr.includes(file.type)) {
            // Guard clause for wrong file type
            return setGuideMsg('Wrong file type. Please choose a jpg or png file.');
        }

        // Set File and Image displayed upon upload.
        setFile(file);
        setDisplayedImg(URL.createObjectURL(file));

        // Clear Info before next analysis
        setAnalysis();
        setGuideMsg();
    };

    const uploadFileHandler = e => {
        e.preventDefault();
        if (!file) return;

        // Reset Results and Messages
        setAnalysis();
        setGuideMsg();

        // Set off Loading Spinning Wheel
        setLoading(true);

        // Convert image to formData => Necessary to pass image from frontend to backend
        const formData = new FormData();
        formData.append('car-image', file);

        // Send image and get result
        fetch('http://localhost:4000/analyse-car-image', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                setAnalysis(res);
                setLoading(false); // After result, turn off loading spinning wheel
                getSimilarCars(res.brand)
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <div className={style.imageAnalyzerWrapper}>
                <form action="">
                    {displayedImg && <img src={displayedImg} />}
                    <input type="file" onChange={setFileHandler} />
                    {displayedImg && <button onClick={uploadFileHandler}>Analyse My Options</button>}
                </form>
                {loading && (
                    <div className={style.spin}>
                        <IoReloadCircleOutline />
                    </div>
                )}
                {analysis && <Analysis data={analysis} setGuideMsg={setGuideMsg} />}
                <p>{guideMsg}</p>
                {similarCars && (
                    <>
                        <h3>Similar cars in stock:</h3>
                        <SimilarCars data={similarCars} setGuideMsg={setGuideMsg} />
                        {loading && (
                            <div className={style.spin}>
                                <IoReloadCircleOutline />
                            </div>
                        )}
                    </>
                )
                }
            </div>
        </>
    );
}
