import ImageList from "../components/ImageList";
import SearchBar from "../components/SearchBar"


function Home({ imageList, setTerm }) {
    return (
        <div className="container">
            <SearchBar setTerm={setTerm} />
            <ImageList imageList={imageList} />
        </div>
    )
}

export default Home;