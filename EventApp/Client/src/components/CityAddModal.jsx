import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addCityModalFunc } from '../redux/modalSlice';
import { addCity } from '../redux/dataSlice';

const CityAddModal = () => {

    const [cityName, setCityName] = useState("");
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.modal.addCityModal);

    const handleClose = () => {
        dispatch(addCityModalFunc());
    };

    const handleAdd = (cityName) => {
        dispatch(addCity(cityName));
        dispatch(addCityModalFunc());
    };

  return (
    <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-black'>Şehir Ekleme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className='text-black'>Şehir Adı</Form.Label>
                        <Form.Control value={cityName} onChange={(e) => setCityName(e.target.value)} type="text" placeholder="Şehir Adı" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Çıkış
                </Button>
                <Button variant="primary" onClick={() => handleAdd(cityName)} >
                    Ekle
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default CityAddModal