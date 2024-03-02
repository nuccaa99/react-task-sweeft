import React, { useEffect, useState } from 'react';

import ImageList from "../components/ImageList";
import SearchBar from "../components/SearchBar"

import API from "../API";


function Home() {
    //to render initial homepage with 20 popular pics 
    const popularTerm = "most popular";
    const [term, setTerm] = useState("");
    const [imageList, setImageList] = useState([]);

    const [page, setPage] = useState(1);

    //fetches images while user types in searchterm
    const fetchImages = async () => {
        try {
            const data = await API.fetchImages(term);
            setImageList(data.results);
            setPage(prevState => prevState + 1)
            if (term) {
                const existingStorage = JSON.parse(localStorage.getItem("imagesData")) || [];
                const newSearchResult = { id: term, data: data.results }
                const updatedStorage = [...existingStorage, newSearchResult]
                localStorage.setItem("imagesData", JSON.stringify(updatedStorage));
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (term.length === 0) {
            const popular = JSON.parse(localStorage.getItem("popularImages")) || [];
            setImageList(popular)
        } else {
            const existingStorage = JSON.parse(localStorage.getItem("imagesData")) || [];
            const cachedData = existingStorage.find((item) => item.id === term)?.data;
            if (cachedData) {
                setImageList(cachedData);

            } else {
                fetchImages()
            }
        }

    }, [term]);


    const fetchPopular = async () => {
        try {
            const data = await API.fetchPopular(popularTerm);
            setImageList(data.results)
            localStorage.setItem("popularImages", JSON.stringify(data.results));

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPopular();

    }, []);


    return (
        <div className="home_container">
            <SearchBar setTerm={setTerm} />
            <ImageList imageList={imageList} />
        </div>
    )
}

export default Home;