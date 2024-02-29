import { useState } from "react";
import Modal from "./Modal";
import API from "../API"


function Image({ img }) {

    const [modalShown, toggleModal] = useState(false);
    const [currentImg, setCurrentImg] = useState("")

    const fetchImgStats = async () => {
        try {
            const data = await API.fetchImgStats(currentImg);
            console.log(currentImg)
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = (e) => {
        fetchImgStats();
        toggleModal(!modalShown)
        setCurrentImg(e.currentTarget.id)
        
    }


    return (
        <div className="images_list_image_wrapper">
            {modalShown && (
                <Modal onClose={() => toggleModal(false)} shown={modalShown}>
                    <img src={img.urls.full} alt="modal" className="modal_img" />
                    <p>Likes: <span>{img.likes}</span></p>
                </Modal>
            )}
            <img src={img.urls.small}
                alt={img.alt_description}
                className="images_list_image"
                id={img.id}
                onClick={(e) => handleClick(e)}
            />
        </div>

    )
}

export default Image;