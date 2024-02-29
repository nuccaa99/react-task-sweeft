import { useState } from "react";
import Modal from "./Modal";


function Image({ img }) {
    const [modalShown, toggleModal] = useState(false);
    return (
        <div className="images_list_image_wrapper">
            {modalShown && (
                <Modal onClose={() => toggleModal(false)} shown={modalShown}>
                    <h2>Modal Title</h2>
                    <p>This is modal content.</p>
                </Modal>
            )}
            <img src={img.urls.small}
                alt={img.alt_description}
                className="images_list_image"
                onClick={() => toggleModal(!modalShown)}
            />
        </div>

    )
}

export default Image;