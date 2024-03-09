import style from './ImageAnalyzer.module.css';
import {IoReloadCircleOutline} from 'react-icons/io5';
import Analysis from './Analysis';
import {useState} from 'react';

export default function ImageAnalyzer() {
    const [displayedImg, setDisplayedImg] = useState();
    const [file, setFile] = useState();
    const [analysis, setAnalysis] = useState();
    const [loading, setLoading] = useState(false);

    const [guideMsg, setGuideMsg] = useState('Please pick a photo of your car and we will do the rest.');

    const setFileHandler = e => {
        const filesCheckArr = ['image/png', 'image/jpg', 'image/jpeg'];
        if (!e.target.files) return;
        if (!filesCheckArr.includes(e.target.files[0].type)) {
            // Guard clause for wrong file type
            return setGuideMsg('Wrong file type. Please choose a jpg or png file.');
        }

        if (e.target.files) {
            setFile(e.target.files[0]);
            setDisplayedImg(URL.createObjectURL(e.target.files[0]));
            setAnalysis();
            setGuideMsg();
        }
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
            </div>
        </>
    );
}
