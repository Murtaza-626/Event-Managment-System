import { useSelector, useDispatch } from "react-redux";
import { cancelRegistration } from "../registrationSlice";
import { Link } from "react-router-dom";

function MyEvents() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allRegistrations = useSelector((state) => state.registration.list);

  if (!user) {
    return (
      <div>
        <h2>My Events</h2>
        <p>Please <Link to="/login">login</Link> to view your registered events.</p>
      </div>
    );
  }

  // Filter events belonging to the logged-in user only
  const myEvents = allRegistrations.filter(event => event.userEmail === user.email);
  
  // Distinguish upcoming vs completed (Assignment Section 5)
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const upcomingEvents = myEvents.filter(event => event.date >= today);
  const completedEvents = myEvents.filter(event => event.date < today);

  function handleCancel(eventId) {
    if(window.confirm("Are you sure you want to cancel your registration?")) {
      dispatch(cancelRegistration({ eventId, userEmail: user.email }));
    }
  }

  // Function to render event lists 
  const renderEvents = (eventsList) => {
    if (eventsList.length === 0) return <p>No events found.</p>;
    
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {eventsList.map((event, index) => (
          <li key={index} style={{ border: "1px solid lightblue", padding: "10px", marginBottom: "10px", width: "300px" }}>
            <img src={event.image} alt={event.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
            <h4>{event.name}</h4>
            <p>Date: {event.date}</p>
            <button onClick={() => handleCancel(event.id)} style={{ background: "red", color: "white" }}>
              Cancel Registration
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>My Events</h2>
      
      <h3>Upcoming Events</h3>
      {renderEvents(upcomingEvents)}

      <hr />

      <h3>Completed Events</h3>
      {renderEvents(completedEvents)}
    </div>
  );
}

export default MyEvents;