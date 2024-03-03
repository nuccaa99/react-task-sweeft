import Image from "./Image";
import NoResult from "./NoResult";


function ImageList({ imageList, dataIsLoading, error }) {
    if (error) return <div>Something went wrong ...</div>;
    
    return (
        <div className="images_list_container">
            {imageList.length || dataIsLoading ? imageList.map((img) => {
                return (
                    <Image img={img} key={img.id} />
                )
            }) : <NoResult />
            }
        </div>
    )
}

export default ImageList;   