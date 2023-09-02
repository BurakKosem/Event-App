import React, { useEffect } from 'react'
import EventCard from '../components/EventCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EventFilterNavbar from '../components/EventFilterNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/dataSlice';


const Events = () => {
  

  const dispatch = useDispatch();
  const events = useSelector(state => state.data.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch], events);

  return (
    <Container className='mt-5 bg-dark'>
      <Row className='mb-2'>
        <EventFilterNavbar />
      </Row>
      <Row>
        {events.map(event => (
          <Col key={event.id} className='mb-2'>
            {event.eventStatus && <EventCard eventDetail={event} />}           
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Events;