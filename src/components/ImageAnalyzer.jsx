import style from './ImageAnalyzer.module.css';
import {IoReloadCircleOutline} from 'react-icons/io5';
import Analysis from './Analysis';
import {useState} from 'react';

export default function ImageAnalyzer() {
    const [displayedImg, setDisplayedImg] = useState();
    const [file, setFile] = useState();
    const [analysis, setAnalysis] = useState();
    const [loading, setLoading] = useState(false);

    const setFileHandler = e => {
        if (e.target.files) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
            setDisplayedImg(URL.createObjectURL(e.target.files[0]));
        }
    };

    const uploadFileHandler = e => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('car-image', file);

        fetch('http://localhost:4000/analyse-car-image', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                setAnalysis(res);
                setLoading(false);
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
                {loading && <IoReloadCircleOutline className={style.spin} />}
                {analysis && <Analysis data={analysis} />}
            </div>
        </>
    );
}
