import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../redux/dataSlice';
import { updateCategoryModalFunc } from '../redux/modalSlice';

const CategoryUpdateModal = ({categoryId}) => {

    const dispatch = useDispatch();
    const showModal = useSelector(state => state.modal.updateCategoryModal);
    const [categoryName, setCategoryName] = useState("");

    const handleUpdate = (categoryName) => {
        dispatch(updateCategory(categoryId, categoryName))
        dispatch(updateCategoryModalFunc());
    } 

    const handleClose = () => {
        dispatch(updateCategoryModalFunc());
    };

  return (
    <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-black'>Kategori Güncelleme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className='text-black'>Kategori Adı</Form.Label>
                        <Form.Control value={categoryName} onChange={(e) => setCategoryName(e.target.value)} type="text" placeholder="Kategori Adı" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Çıkış
                </Button>
                <Button variant="primary" onClick={() => handleUpdate(categoryName)} >
                    Güncelle
                </Button>
            </Modal.Footer>
        </Modal>

  )
}

export default CategoryUpdateModal