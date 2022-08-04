import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import SetTimeoutComponent from './SetTimeoutComponent';
import * as utils from './someUtils';

describe('SetTimeoutComponent', () => {
  it('should show "true" when the timeout is finished - fireEvent, component\'s state is updated', () => {
    render(<SetTimeoutComponent />);
    expect(screen.getByText('false')).toBeInTheDocument();

    const setTimeoutButton = screen.getByRole('button', {
      name: /set timeout with state update/i,
    });
    
    jest.useFakeTimers();
    fireEvent.click(setTimeoutButton);

    // to tell the unit test that timers will update component's state
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByText('false')).not.toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('should show "true" when the timeout is finished - userEvent, component\'s state is updated', async () => {
    render(<SetTimeoutComponent />);
    expect(screen.getByText('false')).toBeInTheDocument();

    const setTimeoutButton = screen.getByRole('button', {
      name: /set timeout with state update/i,
    });
    
    const ue = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    jest.useFakeTimers();
    await ue.click(setTimeoutButton);

    // to tell the unit test that timers will update component's state
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByText('false')).not.toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('should call the utils method after timeout - no component\'s state updates', () => {
    const awesomMethodSpy = jest.spyOn(utils, 'someAwesomeMethod');
    render(<SetTimeoutComponent />);
    
    const setTimeoutButton = screen.getByRole('button', {
      name: /set timeout without state update/i,
    });

    jest.useFakeTimers();
    fireEvent.click(setTimeoutButton);

    expect(awesomMethodSpy).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(awesomMethodSpy).toHaveBeenCalled();

    jest.useRealTimers();
  })

  it('should throw an exception after 10 seconds when clicking button', () => {
    render(<SetTimeoutComponent />);
    expect(screen.getByText('false')).toBeInTheDocument();

    const setTimeoutButton = screen.getByRole('button', {
      name: /throw an exception/i,
    });
    
    jest.useFakeTimers();

    expect(() => {
      fireEvent.click(setTimeoutButton);
      jest.runOnlyPendingTimers();
    }).toThrow("Don't panic it is just an exception!");

    jest.useRealTimers();
  })

  it('should not throw an exception earlier', () => {
    render(<SetTimeoutComponent />);
    expect(screen.getByText('false')).toBeInTheDocument();

    const setTimeoutButton = screen.getByRole('button', {
      name: /throw an exception/i,
    });
    
    jest.useFakeTimers();

    expect(() => {
      fireEvent.click(setTimeoutButton);
      jest.advanceTimersByTime(9000);
    }).not.toThrow("Don't panic it is just an exception!");

    jest.useRealTimers();
  })
});
