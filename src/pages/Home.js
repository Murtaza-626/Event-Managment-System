// function Home(){
//     return <h1>Welcome to the Event Management System!</h1>;
// }

// export default Home;

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>Welcome to the Event Management System!</h1>
        <p>Discover concerts, sports and theatre events, and register in one click.</p>
        <Link to="/events" className="home-btn">Explore Events</Link>
      </div>

      <div className="home-features">
        <div className="home-card">
          <h3>Search</h3>
          <p>Find events by keyword or category.</p>
        </div>
        <div className="home-card">
          <h3>Register</h3>
          <p>Sign up for the events you like.</p>
        </div>
        <div className="home-card">
          <h3>My Events</h3>
          <p>Keep track of everything you registered for.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;