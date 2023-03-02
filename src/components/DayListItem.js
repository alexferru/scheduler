// Imports
import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

// Renders a list item for a specific day.
export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  // Helper function to format the spots remaining text.
  const formatSpots = () => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${spots} spots remaining`;
    }
  };

  // Use the classNames library to conditionally apply classes based on the state of the component.
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });

  // Renders the list item with its corresponding name, spots remaining and class
  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
