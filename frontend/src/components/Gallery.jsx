import axios from "axios";

import { useEffect, useState } from "react";
import anxiousIcon from '../assets/img/anxious_button.svg';
import sleepIcon from '../assets/img/sleep_button.svg';
import GalleryItem from "./GalleryItem.jsx";
import Searchbar from "./SearchBar.jsx";
import "../sass/Gallery.scss";

const Gallery = () => {

    // setup of states

    const [videos, setVideos] = useState([]);
    const [level, setLevel] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchTerm) => {
        axios
            .get(
                import.meta.env.VITE_BE_URL +
                `/api/yogavideos?level=${level}&category=${category}&description=${description}`
            )
            .then((res) => {
                // Filtere die Videos basierend auf dem Suchbegriff und Level
                const filteredVideos = res.data.filter((video) => {
                    const videoCategory = video.category.toLowerCase();
                    const videoLevel = video.level.toLowerCase();
                    const videoDescription = video.description.toLowerCase();
                    const search = searchTerm.toLowerCase();
                    return videoCategory.includes(search) || videoLevel.includes(search) || videoDescription.includes(search)
                });
                setVideos(filteredVideos);
            })
            .catch((err) => console.error(err));
    };

    // api call can retrieve all videos or videos specified by asking for level and category 
    useEffect(() => {
        axios.get(import.meta.env.VITE_BE_URL + `/api/yogavideos?level=${level}&category=${category}`)
            .then((res) => setVideos(res.data))
            .catch((err) => console.error(err))
        // if level or category changes through button click the api call retrieves the new asked for data
    }, [level, category])

    console.log(videos)

    return (
        <section>
            <div>
                <Searchbar onSearch={handleSearch} value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Schlagwörter eingeben" />
                <button onClick={() => { setCategory('stressrelief') }}><img src={anxiousIcon} alt="" /></button>
                <button onClick={() => { setCategory('flexability') }}><img src={sleepIcon} alt="" /></button>
                <button onClick={() => { setCategory('strength') }}><img src={sleepIcon} alt="" /></button>
                <button onClick={() => { setLevel('beginner') }}>Beginner</button>
                <button onClick={() => { setLevel('intermediate') }}>Intermediate</button>
                <button onClick={() => { setLevel('expert') }}>Expert</button>
            </div>

            {videos.length > 0 && videos.map((item, i) => {
                return (
                    <GalleryItem
                        key={i}
                        id={item._id}
                        category={item.category}
                        thumbnail={item.thumbnail}
                    />
                )
            })}
            {videos.length === 0 && (
                <div>Sorry no videos found</div>
            )}
        </section>
    );
}


export default Gallery;

