import React from "react";

const Card = props => (
  <div className="card">
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
    <div className="card-body">
      <p className="card-text">{props.summary}</p>
      <a href="href" className="btn btn-primary">
        {props.summary}
      </a>
      <a href="#href" class="btn btn-primary">
        Add Note
      </a>
    </div>
  </div>
);

export default Card;
