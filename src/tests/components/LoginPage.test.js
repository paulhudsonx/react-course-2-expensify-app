import React from "react";
import { shallow } from "enzyme";

//import ReactShallowRenderer from 'react-test-renderer/shallow';
import { LoginPage } from "../../components/LoginPage";

test("Should render Header correctly", () => {
  const wrapper = shallow(<LoginPage />);

  expect(wrapper).toMatchSnapshot();
});

it("should call startLogin on button click", () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin()} />);
  wrapper.find("button").simulate("click");
  expect(startLogin).toHaveBeenCalledTimes(1);
});
