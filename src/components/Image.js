import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';


import Modal from "./Modal";
import API from "../API"


function Image({ img }) {

    const [modalShown, toggleModal] = useState(false);
    const [currentImgData, setCurrentImageData] = useState();
    const [currentImgId, setCurrentImgId] = useState();

    const fetchImgStats = async () => {
        try {
            const data = await API.fetchImgStats(currentImgId);
            console.log(data)
            setCurrentImageData(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (currentImgId) {
            fetchImgStats()
        }
    }, [currentImgId]);

    const handleClick = (id) => {
        setCurrentImgId(id);
        toggleModal(!modalShown)
    }


    return (
        <div className="images_list_image_wrapper">
            {modalShown && (
                <Modal onClose={() => toggleModal(false)} shown={modalShown}>
                    <img src={img.urls.full} alt="modal" className="modal_img" />
                    <section className="modal_img_stats_container">
                        <div className="modal_img_stats_wrapper">
                            <FontAwesomeIcon icon={faDownload} className="modal_icon" />
                            <span className="modal_img_stat">{currentImgData ? currentImgData.downloads.total : ""}</span>
                        </div>
                        <div className="modal_img_stats_wrapper">
                            <FontAwesomeIcon icon={faEye} className="modal_icon" />
                            <span className="modal_img_stat">{currentImgData ? currentImgData.views.total : ""}</span>
                        </div>
                        <div className="modal_img_stats_wrapper">
                            <FontAwesomeIcon icon={faHeart} className="modal_icon" />
                            <span className="modal_img_stat">{currentImgData ? currentImgData.likes.total : ""}</span>
                        </div>
                    </section>
                </Modal>
            )}
            <img src={img.urls.small}
                alt={img.alt_description}
                className="images_list_image"
                onClick={() => handleClick(img.id)}
            />
        </div>

    )
}

export default Image;