import Image from "./Image";
import NoResult from "./NoResult";

function ImageList({ imageList }) {

    return (
        <div className="images_list_container">
            {imageList.length ? imageList.map((img) => {
                return (
                    <Image img={img} key={img.id} />
                )
            }) : <NoResult />
            }
        </div>
    )
}

export default ImageList;   