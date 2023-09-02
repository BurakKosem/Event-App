import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { updateCity } from '../redux/dataSlice';
import { updateCityModalFunc } from '../redux/modalSlice';

const CityUpdateModal = ({cityId}) => {

    const dispatch = useDispatch();
    const showModal = useSelector(state => state.modal.updateCityModal);
    const [cityName, setCityName] = useState("");

    const handleUpdate = (cityName) => {
        dispatch(updateCity(cityId, cityName))
        dispatch(updateCityModalFunc());
    } 

    const handleClose = () => {
        dispatch(updateCityModalFunc());
    };

  return (
    <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-black'>Şehir Güncelleme</Modal.Title>
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
                <Button variant="primary" onClick={() => handleUpdate(cityName)} >
                    Güncelle
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default CityUpdateModal