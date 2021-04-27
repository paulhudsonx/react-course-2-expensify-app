import React from "react";
import { shallow } from "enzyme"; // Renderer

import expenses from "../fixtures/expenses";
import NotFoundPage from "../../components/NotFoundPage";

test(`should render not found page`, () => {
    const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});
