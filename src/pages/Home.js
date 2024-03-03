import React, { useEffect, useState } from 'react';

import ImageList from "../components/ImageList";
import SearchBar from "../components/SearchBar";


import API from "../API";


function Home() {
    //to render initial homepage with 20 popular pics 
    const popularTerm = "most popular";
    const [term, setTerm] = useState("");
    const [imageList, setImageList] = useState([]);

    const [page, setPage] = useState(1)
    //for infinite scroll
    const [isLoading, setIsLoading] = useState(false);
    //for spinner
    const [dataIsLoading, setDataIsLoading] = useState(false);
    



    //fetches images while user types in searchterm
    const fetchImages = async (term, page) => {
        try {
            setDataIsLoading(true);

            const data = await API.fetchImages(term, page);
            setImageList(prevItems => [...prevItems, ...data.results]);

            if (term) {
                const existingStorage = JSON.parse(localStorage.getItem("imagesData")) || [];
                const existingTermObj = existingStorage.find((item) => item.id === term);
                let updatedStorage;
                if (existingTermObj) {
                    const updatedObject = { ...existingTermObj };
                    updatedObject.data = [...existingTermObj.data, ...data.results];
                    updatedStorage = existingStorage.map(item =>
                        item.id === term ? updatedObject : item
                    );

                } else {
                    const newSearchResult = { id: term, data: data.results }
                    updatedStorage = [...existingStorage, newSearchResult]

                }
                localStorage.setItem("imagesData", JSON.stringify(updatedStorage));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setDataIsLoading(false);
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
                setImageList([]);
                fetchImages(term, 1)
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


    useEffect(() => {
        if (!isLoading) return;
        fetchImages(term, page);
        setIsLoading(false);
    }, [isLoading, term, page]);

    //infinite scroll
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setIsLoading(true)
            setPage(prev => prev + 1)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);


    return (

        <div className="home_container">
            <SearchBar setTerm={setTerm} />
            <ImageList imageList={imageList} dataIsLoading={dataIsLoading} />
        </div>
    )
}

export default Home;