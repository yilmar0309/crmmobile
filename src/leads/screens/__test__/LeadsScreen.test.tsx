// src/__tests__/LeadsScreen.test.tsx

import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {LeadsScreen} from '../LeadsScreen';
import * as leadsViewModel from '../LeadsScreen/ViewModelContext';

jest.mock('../LeadsScreen/ViewModelContext', () => ({
  useViewModelProvider: jest.fn(),
  ViewModelProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('@/core/components/AppRenderCard', () => {
  return {
    AppRenderCard: jest.fn(() => null),
  };
});

jest.mock('@/core/components', () => {
  const {View} = require('react-native');
  return {
    AppContainer: ({
      children,
      testID,
    }: {
      children: React.ReactNode;
      testID?: string;
    }) => <View testID={testID}>{children}</View>,
    AppLoadingList: ({testID}: {testID?: string}) => (
      <View testID={testID || 'app-loading-list'} />
    ),
  };
});

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

describe('LeadsScreen', () => {
  let props: any;
  let AppRenderCardMock: jest.Mock;

  beforeEach(() => {
    props = createTestProps({});
    jest.clearAllMocks();
    AppRenderCardMock = require('@/core/components/AppRenderCard')
      .AppRenderCard as jest.Mock;
  });

  it('renders correctly when isFetching is false', () => {
    const mockLeadsData = [
      {
        id: 1,
        name: 'Lead 1',
      },
      {
        id: 2,
        name: 'Lead 2',
      },
    ];

    const mockViewModelReturn = {
      leadsData: mockLeadsData,
      isFetching: false,
      refetch: jest.fn(),
      getItem: (data: any, index: number) => data[index],
      getItemCount: () => mockLeadsData.length,
      handleValidateLead: jest.fn(),
    };

    (leadsViewModel.useViewModelProvider as jest.Mock).mockImplementation(
      () => mockViewModelReturn,
    );

    const {getByTestId, toJSON} = render(<LeadsScreen {...props} />);

    expect(getByTestId('virtualized-list')).toBeTruthy();

    expect(AppRenderCardMock).toHaveBeenCalledTimes(mockLeadsData.length);

    mockLeadsData.forEach((lead, index) => {
      expect(AppRenderCardMock).toHaveBeenNthCalledWith(
        index + 1,
        {
          item: lead,
          onValidate: mockViewModelReturn.handleValidateLead,
        },
        {},
      );
    });

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders loading state when isFetching is true', () => {
    const mockViewModelReturn = {
      leadsData: [],
      isFetching: true,
      refetch: jest.fn(),
      getItem: jest.fn(),
      getItemCount: jest.fn(),
      handleValidateLead: jest.fn(),
    };

    (leadsViewModel.useViewModelProvider as jest.Mock).mockImplementation(
      () => mockViewModelReturn,
    );

    const {getByTestId} = render(<LeadsScreen {...props} />);

    expect(getByTestId('app-loading-list')).toBeTruthy();
  });

  it('calls refetch when list is refreshed', () => {
    const mockLeadsData = [
      {
        id: 1,
        name: 'Lead 1',
      },
      {
        id: 2,
        name: 'Lead 2',
      },
    ];

    const mockRefetch = jest.fn();

    const mockViewModelReturn = {
      leadsData: mockLeadsData,
      isFetching: false,
      refetch: mockRefetch,
      getItem: (data: any, index: number) => data[index],
      getItemCount: () => mockLeadsData.length,
      handleValidateLead: jest.fn(),
    };

    (leadsViewModel.useViewModelProvider as jest.Mock).mockImplementation(
      () => mockViewModelReturn,
    );

    const {getByTestId} = render(<LeadsScreen {...props} />);

    const list = getByTestId('virtualized-list');

    fireEvent(list, 'onRefresh');

    expect(mockRefetch).toHaveBeenCalled();
  });
});
