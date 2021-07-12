import React from 'react';
import PropTypes from 'prop-types';

function TicketsItem({ date, name }) {
  return (
    <div className="ticket">
      <p className="title">{name}</p>
      <p className="date">{date}</p>
    </div>
  );
}

TicketsItem.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
};
TicketsItem.defaultProps = {
  name: '',
  date: '',
};

export default TicketsItem;
