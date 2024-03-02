import { useEffect, useState } from "react";
import ImageList from "../components/ImageList";

function History() {

    const searchHistory = JSON.parse(localStorage.getItem("imagesData")) || [];
    const [currentImages, setCurrentImages] = useState([]);


    //when the history page is mounted the result of the first search is displayed (if available) 
    useEffect(() => {
        if (searchHistory.length) {
            let initialState = searchHistory[0].data;
            setCurrentImages(initialState);
        }

    }, [])


    const handleClick = (id) => {
        setCurrentImages(searchHistory.find((item) => item.id === id).data)
    }

    return (
        <div className="history_container">
            <div className="history_scroll">
                {searchHistory.map((item) => {
                    //if search result was empty that search term is not displayed on the search scrollbar
                    if (item.data.length) {
                        return (
                            <div
                                className="history_scroll_item"
                                key={item.id}
                                onClick={() => handleClick(item.id)}>
                                {item.id}
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
            <ImageList imageList={currentImages} />
        </div>
    )
}
export default History;