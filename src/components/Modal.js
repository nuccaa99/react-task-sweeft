import React from 'react';

function Modal({ children, onClose }) {

    return (
        <div className='modal_container' onClick={onClose}>
            <div className='modal'
                onClick={e => {
                    // do not close modal if inside modal content is clicked
                    e.stopPropagation();
                }}>
                {children}
            </div>
        </div>
    );
}

export default Modal;