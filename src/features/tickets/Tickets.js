import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TicketsItem from './TicketsItem';
import { getFlightsAsync } from './ticketsSlice';

function Tickets() {
  const dispatch = useDispatch();
  const flights = useSelector(state => state.tickets.flights);
  const token = useSelector(state => state.auth.token);
  const [filter, setFilter] = useState('');

  const sorted = obj => {
    let sortable = [];
    Object.keys(obj).forEach(key => {
      sortable = [...sortable, { ...obj[key], key }];
    });
    const sortedByDate = sortable
      .slice()
      .sort(
        (a, b) =>
          Date.parse(a.date.split('-').reverse().join('-')) -
          Date.parse(b.date.split('-').reverse().join('-')),
      );
    const filteredByCompany = sortedByDate.filter(flight =>
      flight.company.name.toLowerCase().includes(filter.toLowerCase()),
    );
    const filteredByAlternatives = sortedByDate.filter(flight =>
      flight.company.alternativeNames.find(name =>
        name.toLowerCase().includes(filter.toLowerCase()),
      ),
    );
    const result = [...filteredByCompany, ...filteredByAlternatives];
    return [...new Set(result)];
  };

  const flightsArray = sorted(flights);

  useEffect(() => {
    dispatch(getFlightsAsync(token));
  }, []);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {flightsArray.map(flight => (
        <TicketsItem
          key={flight.key}
          name={flight.company.name}
          date={flight.date}
        />
      ))}
    </div>
  );
}

export default Tickets;
