import React from "react";

import {Link} from 'react-router-dom';
import moment from "moment";
import {currencyFormat} from "../i18n/format";

export const ExpenseListItem = ({id, description, amount, createdAt}) => (
  <div>
    <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
    <p>
      {currencyFormat(amount / 100)}
      -
      {description}
      -
      {moment(createdAt).format(`MMMM Do, YYYY`)}</p>
  </div>
);

export default ExpenseListItem;
