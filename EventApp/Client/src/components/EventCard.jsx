import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './EventCard.css';

const EventCard = ({ eventDetail }) => {
  console.log(eventDetail)
  return (
    <Card className='custom-card'>
      <Card.Body>
        <Card.Title><h4 className='event-title'>{eventDetail.eventName}</h4></Card.Title>
        <Card.Subtitle className="mb-2">{eventDetail.eventDescription}</Card.Subtitle>
        <Card.Text className='event-price'>
          {eventDetail.eventTicket ? `Etkinlik Ücreti: ${eventDetail.eventPrice} TL` : "Ücretsiz"}
        </Card.Text>
        <Card.Text className='event-details'>
          Etkinlik Tarihi: 
          <br/>
          {new Date(eventDetail.eventDate).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}, {" "}
          {new Date(eventDetail.eventDate).toLocaleTimeString("tr-TR", {
            hour: "numeric",
            minute: "numeric"
          })}
          <br/>- {eventDetail.eventAddress} / {eventDetail.cityName}
        </Card.Text>
        <Button href={`/event/${eventDetail.eventId}`} variant="success" className='event-details-button'>Detaylar</Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;