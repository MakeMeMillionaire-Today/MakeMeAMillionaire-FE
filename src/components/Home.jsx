import { useState } from 'react';
import ImageSelector from './ImageSelector'

const Home = () => {
    const [imageURL, setImageURL] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImageURL(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className="home-container">
            <div className="section1">chat zone</div>
            <div className="section2">
                <ImageSelector imageURL={imageURL} />
            </div>
            <div className="section3">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
        </div>
    )
}

export default Home