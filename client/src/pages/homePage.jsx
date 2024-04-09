// importing navigation links, hook for making GraphQL queries and QUERY_EVENTS to render a list of events
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import './Home.css';

// const { eventTitle, eventDescription, eventDate, setEventName, setEventDescription, setEventDate, handleEventSubmit, onHide } = props;

function MyVerticallyCenteredModal(props) {
  const { eventTitle, eventDescription, eventDate, setEventName, setEventDescription, setEventDate, handleEventSubmit, onHide } = props;


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='bg-dark' closeButton>
        <Modal.Title className='text-light' id="contained-modal-title-vcenter">
          Add Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='dark'>
        <h5 className='text-light'>Enter the name of your new event:</h5>
        <input className="form-control" id="eventTitle" type="text" value={eventTitle} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name"></input>
        <h5 className='text-light mt-2'>Enter a short description of the event:</h5>
        <input className="form-control" id="eventDescription" type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Description"></input>
        <h5 className='text-light mt-2'>Enter the date and time of your event:</h5>
        <input className="input" id="eventDate" type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} placeholder="Date"></input>
      </Modal.Body>
      <Modal.Footer className='dark'>
        <Button onClick={handleEventSubmit}>Save</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function DisplayEventModal(props) {
  const { eventTitle, eventDescription, eventDate, onHide } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='bg-dark' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
         <h2 className='text-light'>{eventTitle}</h2> 
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className='dark'>
        <h2 className='text-light'>Description:</h2>
        <p className='text-light h4'>{eventDescription}</p>
        <h3 className='text-light '>Date:</h3>
        <p className='text-light h4'>{eventDate}</p>
      </Modal.Body>

      <Modal.Footer className='dark'>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>

    </Modal>
  );
}

const Home = () => {
  // fetching data from server instead of using cached data
  const { loading, data } = useQuery(QUERY_EVENTS, {
    fetchPolicy: "no-cache"
  });

  // modalShow manages whether the modal is shown or hidden
  // the rest of them are used to manage the input values and list of events
  const [modalShow, setModalShow] = useState(false);
  const [dataShow, setdataShow] = useState(false);
  const [eventTitle, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);

  // used to load previously stored events from localStorage 
  useEffect(() => {
    const storedEvents = localStorage.getItem('userEvents');
    if (storedEvents) {
      setEventList(JSON.parse(storedEvents));
    }
  }, []);

  // collects the input values and updates the eventList stat by adding the new event to it
  // it also stores teh updated event list in localStorage
  const handleEventSubmit = () => {
    console.log({
      eventTitle,
      eventDescription,
      eventDate
    });

    const newEvent = {
      _id: uuidv4(),
      title: eventTitle,
      description: eventDescription,
      start: eventDate
    };

    setEventList([...eventList, newEvent]);
    localStorage.setItem('userEvents', JSON.stringify([...eventList, newEvent]));
    setModalShow(false);
  }

  // function that will delete the event from the local storage
  const deleteEvent = (eventId) => {
    const updatedList = eventList.filter(event => event._id !== eventId);
    setEventList(updatedList);
    localStorage.setItem('userEvents', JSON.stringify(updatedList));
  };

  const handleEventDisplay = (eventId) => {
    const selectEvent = eventList.find(event => event._id === eventId);
    
    if (selectEvent) {
      console.log("Event title:", selectEvent.title);
      console.log("Event description:", selectEvent.description);
      console.log("Event date:", selectEvent.start);

      setModalShow(false);
      setSelectedEvent(selectEvent);
      
    }
    else{
      console.log('event not found')
    }
  };

  return (
    <div className='align-center flex-column container text-center text-light background'>

      <div className='m-5'>
        <h2>Here's a list of all upcoming events:</h2>
        {/* if data is loading then 'Loading...' will be displayed otherwise all the events will be displayed */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
          <ul className='square mt-4'>
            {/* mapping through event list and rendering each event and linking to the actual event */}
            {eventList.map((event) => (
              // generating each title of events by ID
              <li key={event._id} >
                
                <Button className='eventbtn' variant="primary" onClick={() => {setdataShow(true); handleEventDisplay(event._id);}}>
                  {event.title}
                </Button>

                <button onClick={() => deleteEvent(event._id)} className='btn btn-danger delete-button deletebtn'>Delete</button>

              </li>
            ))}
          </ul>
           <DisplayEventModal
           show={dataShow}
           onHide={() => setdataShow(false)}
          //  eventtitle={selectedEvent ? handleEventDisplay.title : ""}
          //  eventdescription={selectedEvent ? handleEventDisplay.description : ""}
          //  eventdate={selectedEvent ? handleEventDisplay.start : ""}
          eventTitle = {selectedEvent.title}
          eventDescription = {selectedEvent.description}
          eventDate = {selectedEvent.start}
           handleEventDisplay = {handleEventDisplay}
         />
         </>
        )}
      </div>

      <div className='text-center m-3'>
        <h2>Want to create an event?</h2>
        <>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Create an Event!
          </Button>

          {/* this code sets up the create event modal with various props  */}
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            eventTitle={eventTitle}
            setEventName={setEventName}
            setEventDescription={setEventDescription}
            eventDescription={eventDescription}
            eventDate={eventDate}
            setEventDate={setEventDate}
            handleEventSubmit={handleEventSubmit}
          />
        </>
      </div>
    </div>
  );
};

export default Home;