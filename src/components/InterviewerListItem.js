// Imports
import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

// Represents a single interviewer item in the InterviewerList component.
export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;

  // Use classNames to conditionally apply class names to the component based on whether it is selected or not.
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  // Returns a list item with the interviewerClass and an onClick event handler to call setInterviewer function when clicked
  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
