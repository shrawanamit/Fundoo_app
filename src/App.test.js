import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import signin from './Components/SighIn';



// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Test case for testing login',() =>{
  let wrapper;
  test('username check',()=>
  {
  wrapper = render(<signin />);
  wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'amitkumar06111@gmail.com'}});
  expect(wrapper.state('email')).toEqual('amitkumar06111@gmail.com');
  })
})