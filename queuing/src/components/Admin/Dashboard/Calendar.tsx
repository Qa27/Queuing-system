import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

export const RCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date: any) => {
    setDate(date);
  };
  return (
    <div className="calendar">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};
