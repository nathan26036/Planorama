// importing navigation links, hook for making GraphQL queries and QUERY_EVENTS to render a list of events
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Enter the name of your new event:</h4>
        <input className="form-control" id="eventTitle" type="text" value={props.eventTitle}  onChange={(e) => props.setEventName(e.target.value)} placeholder="Event Name"></input>
        <h4>Enter a short description of the event:</h4>
        <input className="form-control" id="eventDescription" type="text" value={props.eventDescription} onChange={(e) => props.setEventDescription(e.target.value)} placeholder="Description"></input>
        <h4>Enter the date and time of your event:</h4>
        <input className="input" id="eventDate" type="datetime-local" value={props.eventDate} onChange={(e) => props.setEventDate(e.target.value)} placeholder="Date"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleEventSubmit}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const Home = () => {
  const { loading, data } = useQuery(QUERY_EVENTS, {
    fetchPolicy: "no-cache"
  });

  const [modalShow, setModalShow] = useState(false);

  const [eventTitle, setEventName ] = useState('');
  const [eventDescription, setEventDescription ] = useState('');
  const [eventDate, setEventDate ] = useState('');

  const handleEventSubmit = () => {
    console.log({
      eventTitle,
      eventDescription,
      eventDate
    });

    setModalShow(false);
  }


    // extracting the events array from the data object
    // if there are no events an empty array is initialized
    const eventList = data?.events || [];

    return(
        <div className='align-center flex-column container text-center text-light bg-primary'>
        
            <div className='m-5'>
                <h2>Here's a list of all upcoming events:</h2>
                {/* if data is loading then 'Loading...' will be displayed otherwise all the events will be displayed */}
                {loading ? (
                 <div>Loading...</div>   
                ) : (
                    <ul className='square'>
                        {/* mapping through event list and rendering each event and linking to the actual event */}
                        {eventList.map((event) => {
                            return (
                                // generating each title of events by ID
                                <li key = {event._id}>
                                    <Link to = {{ pathname: `/event/${event._id}`}}>
                                        {event.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div className='text-center m-3'>
                <h2>Want to create an event?</h2>

<>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Create an Event!
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        eventTitle={eventTitle}
        setEventName={setEventName}
        eventDescription={eventDescription}
        setEventDescription={setEventDescription}
        eventDate={eventDate}
        setEventDate={setEventDate}
        handleEventSubmit={handleEventSubmit}
      />
</>
            </div>
        </div>
    )
};

export default Home;