import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './SearchModal.css';

const SearchModal = ({show, productobj, handleClose, handleShow}) => {
   
    return (
        <div>
           <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{productobj.title}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>{productobj.content}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal> 
        </div>
    )
}

export default SearchModal
