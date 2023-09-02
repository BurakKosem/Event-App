import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addEventModalFunc, updateEventModalFunc } from '../redux/modalSlice';
import jwtDecode from 'jwt-decode'; 
import { addEvent, fetchCategories, fetchCities, updateEvent } from '../redux/dataSlice';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';

const EventUpdateModal = ({ selectedEvent }) => {
    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem('jwtToken');
    const decodedToken = jwtDecode(jwtToken);
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const cities = useSelector((state) => state.data.cities);
    const categories = useSelector((state) => state.data.categories);
    const showModal = useSelector(state => state.modal.updateEventModal);
    const [eventId, setEventId] = useState(0);
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventAddress, setEventAddress] = useState("");
    const [eventQuota, setEventQuota] = useState(0);
    const [eventCity, setEventCity] = useState(0);
    const [eventCategory, setEventCategory] = useState(0);
    const [isEventPrice, setIsEventPrice] = useState(false);
    const [eventPrice, setEventPrice] = useState(0);
    const [eventDate, setEventDate] = useState(null);
    const [appFinishDate, setAppFinishDate] = useState(null);
    const eventStatus = selectedEvent.eventStatus

    const handleClose = () => {
        dispatch(updateEventModalFunc());
    };
    

    const handleUpdate = async () => {
        const newIsEventPrice = Boolean(isEventPrice);
        const newStatus = Boolean(eventStatus);
        await dispatch(updateEvent(eventId, eventName, appFinishDate, eventDate, eventDescription, eventAddress, eventQuota, newStatus, newIsEventPrice, eventPrice, eventCategory, eventCity, userId, 'https://localhost:7074/api/Event/update'));       
    };

    useEffect(() => {
        dispatch(fetchCities());
        dispatch(fetchCategories());
        setAppFinishDate("2023-09-28T09:45:00.000Z");
        setEventId(selectedEvent.eventId);
    }, [dispatch]);

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-black'>Etkinlik Güncelleme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className='text-black'>Etkinliğin Adı</Form.Label>
                        <Form.Control value={eventName} onChange={(e) => setEventName(e.target.value)} type="text" placeholder={selectedEvent.eventName} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label className='text-black'>Etkinlik Tanıtımı</Form.Label>
                        <Form.Control value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} type="text" placeholder={selectedEvent.eventDescription} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className='text-black'>Katılacak Kişi Sayısı</Form.Label>
                        <Form.Control value={eventQuota} onChange={(e) => setEventQuota(e.target.value)} type="number" placeholder={selectedEvent.eventQuota} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label className='text-black'>Etkinliğin Adresi</Form.Label>
                        <Form.Control value={eventAddress} onChange={(e) => setEventAddress(e.target.value)} type="text" placeholder={selectedEvent.eventAddress} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label className='text-black'>Şehir</Form.Label>
                        <Form.Select className='mb-2' aria-label="Şehir" value={eventCity} onChange={(e) => setEventCity(e.target.value)}>
                            <option value="">Şehir Seçiniz</option>
                            {cities.map((city) => (
                                <option key={city.cityId} value={city.cityId}>
                                    {city.cityName}                                   
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className='text-black'>Kategori</Form.Label>
                        <Form.Select className='mb-2' aria-label="Kategori" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}>
                            <option value="">Kategori Seçiniz</option>
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className='text-black'>Etkinlik ücretli mi?</Form.Label>
                        <Form.Select className='mb-2' aria-label="Etkinlik ücretli mi?" value={isEventPrice} onChange={(e) => setIsEventPrice(e.target.value)} >
                            <option value="true">Evet</option>
                            <option value="false">Hayır</option>
                        </Form.Select>
                    </Form.Group>
                    {isEventPrice == "true" && <Form.Group className="mb-3" >
                        <Form.Label className='text-black'>Ücret</Form.Label>
                        <Form.Control value={eventPrice} onChange={(e) => setEventPrice(e.target.value)} type="number" />
                    </Form.Group> }

                    <Form.Group className="mb-3" >
                        <Form.Label className='text-black'>Etkinlik Tarihi</Form.Label>
                        <ReactDatePicker
                            selected={eventDate}
                            onChange={date => setEventDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="dd MMMM yyyy, HH:mm"
                            className="form-control"
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Çıkış
                </Button>
                <Button variant="primary" onClick={() => handleUpdate()} >
                    Güncelle
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EventUpdateModal