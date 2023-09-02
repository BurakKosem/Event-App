import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../components/EventCard.css';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { attendAnEvent, deleteAttendedEvent } from '../redux/dataSlice';



const EventDetail = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const isLoggedIn = useSelector((state) => state.data.isLoggedIn);
  const [attendButton, setAttendButton] = useState(false);
  const jwtToken = localStorage.getItem('jwtToken');
  if (!jwtToken) {
    return <div>
              <h3 >Lütfen Oturum Açınız</h3>
          </div>; 
  }
  const decodedToken = jwtDecode(jwtToken);
  const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  const dispatch = useDispatch();
  const [isAttended, setIsAttended] = useState(false);

  useEffect(() => {
    axios.get(`https://localhost:7074/api/Event/getbyeventid?eventId=${eventId}`)
      .then(response => {
        setEventDetails(response.data[0]);
        console.log(response.data);
      })
      axios.get(`https://localhost:7074/api/EventUser/user/${userId}/event/${eventId}/eventUserId`)
        .then(response => {
          const attend = response.data
      
      if(attend != null) {
        setIsAttended(true)
      }else{
        setIsAttended(false)
      }

    })}, [eventId, isAttended]);

    useEffect(() => {
      if (jwtToken) {
        setAttendButton(true);
      } else {
        setAttendButton(false);
      }
    }, [jwtToken]);

    const handleAttend = async (eventId) => {
      dispatch(attendAnEvent(userId, eventId))
    };

    const handleDeleteAttend = (eventId) => {
      axios.get(`https://localhost:7074/api/EventUser/user/${userId}/event/${eventId}/eventUserId`)
        .then(response => {
          const eventUserId = response.data 
          dispatch(deleteAttendedEvent(eventUserId))
        })
  };

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='mt-5'>
      <Card className='custom-screen-card'>
        <Card.Body>
          <Row>
            <Col></Col>
            <Col md={4} className='text-center'>
              <div>
                <h1 className='text-black'>{eventDetails.eventName}</h1>
                <h4 className='text-muted'>{eventDetails.eventDescription}</h4>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row className='mt-4'>
            <Col>
              <h6 className='text-muted'>Etkinlik Ücreti:</h6>
              <p className='text-black'>{eventDetails.eventTicket ? `${eventDetails.eventPrice} TL` : 'Ücretsiz'}</p>
            </Col>
            <Col>
              <p>
                <span className='text-muted'>Etkinlik Adresi:</span>
                <br />
                <span className='text-black'>{eventDetails.eventAddress} / {eventDetails.cityName}</span>
              </p>
            </Col>
            <Col md={3}>
              <p>
                <span className='text-muted'>Etkinlik Tarihi:</span>
                <br />
                <span className='text-black'>
                  {new Date(eventDetails.eventDate).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}, {" "}
                  {new Date(eventDetails.eventDate).toLocaleTimeString("tr-TR", {
                    hour: "numeric",
                    minute: "numeric"
                  })}
                </span>
              </p>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col md={{ span: 4, offset: 4 }} className='text-center'>
              {isAttended  == false ?  <Button  variant='success' className='w-100' onClick={() => handleAttend(eventDetails.eventId)}>Katıl</Button>
              : <Button variant='danger' className='w-100' onClick={() => handleDeleteAttend(eventDetails.eventId)}>İptal</Button>
            }
              
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EventDetail;
