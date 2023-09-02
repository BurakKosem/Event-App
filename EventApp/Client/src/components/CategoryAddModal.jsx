import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../redux/dataSlice';
import { addCategoryModalFunc } from '../redux/modalSlice';

const CategoryAddModal = () => {

    const [categoryName, setCategoryName] = useState("");
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.modal.addCategoryModal);

    const handleClose = () => {
        dispatch(addCategoryModalFunc());
    };

    const handleAdd = (categoryName) => {
        dispatch(addCategory(categoryName));
        dispatch(addCategoryModalFunc());
    };

  return (
    <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-black'>Kategori Ekleme</Modal.Title>
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
                <Button variant="primary" onClick={() => handleAdd(categoryName)} >
                    Ekle
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default CategoryAddModal