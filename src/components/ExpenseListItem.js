import React from "react";

import { Link } from "react-router-dom";
import moment from "moment";
import { currencyFormat } from "../i18n/format";

export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__subtitle">
        {moment(createdAt).format(`MMMM Do, YYYY`)}
      </span>
    </div>
    <h3 className="list-item__data">{currencyFormat(amount / 100)}</h3>
  </Link>
);

export default ExpenseListItem;
