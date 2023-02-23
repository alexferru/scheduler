import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const dayListItems = days.map((dayItem) => {
    return (
      <DayListItem
        key={dayItem.id}
        name={dayItem.name}
        spots={dayItem.spots}
        selected={dayItem.name === value}
        setDay={onchange}
      />
    );
  });

  return <ul>{dayListItems}</ul>;
}
