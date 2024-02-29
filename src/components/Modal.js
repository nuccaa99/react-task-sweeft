import React from 'react';

function Modal({ children, onClose }) {

    return (
        <div className='modal_container' onClick={onClose}>
            <div className='modal'
                onClick={e => {
                    e.stopPropagation();
                }}>
                {children}
            </div>
        </div>
    );
}

export default Modal;