import React from 'react';
import {render} from '@testing-library/react-native';
import {AppSpacer} from '../components/AppSpacer';

describe('AppSpacer', () => {
  it('renders correctly with default height', () => {
    const {getByTestId, toJSON} = render(<AppSpacer />);
    const spacer = getByTestId('app-spacer');
    expect(spacer).toBeTruthy();
    expect(spacer.props.style).toMatchObject({height: 16});
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies custom height when provided', () => {
    const customHeight = 50;
    const {getByTestId} = render(<AppSpacer height={customHeight} />);
    const spacer = getByTestId('app-spacer');
    expect(spacer.props.style).toMatchObject({height: customHeight});
  });

  it('handles undefined height correctly', () => {
    const {getByTestId} = render(<AppSpacer height={undefined} />);
    const spacer = getByTestId('app-spacer');
    // Expect default height to be used when height is undefined
    expect(spacer.props.style).toMatchObject({height: 16});
  });
});
