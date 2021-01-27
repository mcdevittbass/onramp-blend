import React from 'react';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import Header from './Header';
import App from '../../App';

//test passes when history.push('/landing is comment out' - I am unsure how to fix mock it properly!)
test('clears localStorage of "user" and "jwt" on button click', async () => {
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom') as any,
        useHistory: () => ({
          push: jest.fn(),
        }),
      }));

    const container = render(<Header />)
    localStorage.setItem('jwt', 'test string');
    localStorage.setItem('user', 'test userID');

    const signout = container.getByTestId('signOUT');
    fireEvent.click(signout);

    const jwt = localStorage.getItem('jwt')
    const user = localStorage.getItem('user');
    expect(jwt).toBeNull();
    expect(user).toBeNull();

});