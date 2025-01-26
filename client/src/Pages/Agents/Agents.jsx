import React from "react";
import { Jane, Karry, Lisa, Mike, Ricky, Smith } from "../../Images/images";
import "./Agents.scss"; // Import the Sass file

const agentsData = [
  {
    name: "Ankit Chouhan",
    experience: "10 years",
    email: "ankitchouhan@materialestate.com",
    phone: "+91 9664518901",
    image: Mike,
  },
  {
    name: "Atharva Sugandhi",
    experience: "10 years",
    email: "atharvasugandhi@materialestate.com",
    phone: "+91 9357810901",
    image: Jane,
  },
  {
    name: "Raghav Kanungo",
    experience: "8 years",
    email: "raghavkanungo@materialestate.com",
    phone: "+91 8994518901",
    image: Lisa,
  },
  {
    name: "Karry Wagh",
    experience: "8 years",
    email: "janesmith@materialestate.com",
    phone: "+91 6254518988",
    image: Karry,
  },
  {
    name: "Smith Anderson ",
    experience: "5 years",
    email: "janesmith@materialestate.com",
    phone: "+91 7054517900",
    image: Smith,
  },
  {
    name: "Ricky ketty",
    experience: "4 years",
    email: "janesmith@materialestate.com",
    phone: "+91 9853512201",
    image: Ricky,
  },
];

const Agents = () => {
  return (
    <div className="agents-container">
      <h1>Our Agents</h1>
      <p>
        Meet our experienced team of agents who are here to help you find your
        dream property, houses, apartments and many more.
      </p>
      <div className="agents-list">
        {agentsData.map((agent, index) => (
          <div className="agent-card" key={index}>
            <img src={agent.image} alt={agent.name} className="agent-image" />
            <h2>{agent.name}</h2>
            <p>Experience: {agent.experience}</p>
            <div className="contact-info">
              <p>Email: {agent.email}</p>
              <p>Phone: {agent.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;
