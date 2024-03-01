import Image from "./Image";


function ImageList({ imageList }) {
    return (
        <div className="images_list_container">
            {imageList.map((img) => {
                return (
                    <Image img={img} key={img.id} />
                )
            })}
        </div>
    )
}

export default ImageList;   