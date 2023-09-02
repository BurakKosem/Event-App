import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode'; 
import { deleteEvent, fetchAttendedEvents, fetchEventsByUserId } from '../redux/dataSlice';
import { updateEventModalFunc } from '../redux/modalSlice';
import EventUpdateModal from '../components/EventUpdateModal';
import axios from 'axios';

const UserProfile = () => {

    const dispatch = useDispatch();
    const createdEvents = useSelector(state => state.data.eventsByUserId);
    const jwtToken = localStorage.getItem('jwtToken');
    const decodedToken = jwtDecode(jwtToken);
    var userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const { updateEventModal } = useSelector(state => state.modal);
    const attendedEvents = useSelector(state => state.data.attendedEvents);
    const [attendedEventsData, setAttendedEventsData] = useState([]);
    const now = new Date(); // Şuanki zamanı al
    const pastEvents = attendedEventsData.filter(event => new Date(event.eventDate) < now);
    const futureEvents = attendedEventsData.filter(event => new Date(event.eventDate) >= now);


    useEffect(() => {
        const fetchAttendedEventsData = async () => {
          const attendedEventsDetails = [];
          
          // attendedEventsIds içindeki her eventId için veriyi al
          for (const eventId of attendedEvents) {
            try {
              const response = await axios.get(`https://localhost:7074/api/Event/getbyeventid?eventId=${eventId}`);
              attendedEventsDetails.push(response.data[0]);
            } catch (error) {
              console.error('API hatası:', error);
            }
          }
    
          setAttendedEventsData(attendedEventsDetails);
        };
    
        fetchAttendedEventsData();
      }, [attendedEvents]);
    


    useEffect(() => {
        dispatch(fetchAttendedEvents(userId));
        console.log(attendedEvents)
        dispatch(fetchEventsByUserId(userId));
    }, [dispatch]);

    const [selectedEvent, setSelectedEventId] = useState(null);

    const handleEditEvent = (event) => {
        dispatch(updateEventModalFunc());
        setSelectedEventId(event);
    };

    const handleDeleteEvent = async (eventId) => {
        await dispatch(deleteEvent(eventId));
        await dispatch(fetchEventsByUserId(userId));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            {updateEventModal && <EventUpdateModal selectedEvent={selectedEvent} />} 
            <Row>
                <Tabs
                    defaultActiveKey="createdEvents"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="createdEvents" title="Düzenlediğim Etkinlikler">
                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Etkinlik Adı</th>
                            <th>Etkinlik Türü</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createdEvents.map((event, index) => (
                            <tr key={event.id} className="text-center">
                                <td>{index + 1}</td>
                                <td>{event.eventName}</td>
                                <td>{event.categoryName}</td>
                                <td>
                                    <Button variant="info" className="me-2" onClick={() => handleEditEvent(event)}>Güncelle</Button>
                                    <Button variant="danger" onClick={() => handleDeleteEvent(event.eventId)}>Sil</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                    </Tab>
                    <Tab eventKey="attendedEvents" title="Katıldığım Etkinlikler">
                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Etkinlik Adı</th>
                            <th>Etkinlik Türü</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastEvents.map((event, index) => (
                            <tr key={event.id} className="text-center">
                                <td>{index + 1}</td>
                                <td>{event.eventName}</td>
                                <td>{event.categoryName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                    </Tab>
                    <Tab eventKey="attendingEvents" title="Katılacağım Etkinlikler">
                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Etkinlik Adı</th>
                            <th>Etkinlik Türü</th>
                        </tr>
                    </thead>
                    <tbody>
                        {futureEvents.map((event, index) => (
                            <tr key={event.id} className="text-center">
                                <td>{index + 1}</td>
                                <td>{event.eventName}</td>
                                <td>{event.categoryName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                    </Tab>
                </Tabs>                
            </Row>

        </Container>
    )
}

export default UserProfile