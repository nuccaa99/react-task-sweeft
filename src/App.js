import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "./styles/reset.css";
import "./styles/style.css";


import ImageList from './components/ImageList';
import SearchBar from "./components/SearchBar";



function App() {
  const initalTerm = "most popular";
  const [term, setTerm] = useState(initalTerm);
  const [imageList, setImageList] = useState([]);




  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = 'https://api.unsplash.com/search/photos';
  const IMAGES_PER_PAGE = 20;


  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${term.length > 0 ? term : initalTerm}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
      );
      setImageList(data.results)
      if (term) { localStorage.setItem(`${term}`, JSON.stringify(data.results)); }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const cachedData = localStorage.getItem(`${term}`);
    if (cachedData) {
      setImageList(JSON.parse(cachedData));

    } else {
      fetchImages()
    }
  }, [term]);


  return (
    <div className="container">
      <SearchBar setTerm={setTerm} />
      <ImageList imageList={imageList} />
    </div>
  );
}

export default App;
