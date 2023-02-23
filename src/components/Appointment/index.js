import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  const { time, interview } = props;

  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? <Show {...interview} /> : <Empty />}
    </article>
  );
}
