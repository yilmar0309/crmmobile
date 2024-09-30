// ViewModelContext.test.tsx

import React from 'react';
import {act, render} from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
import {LeadsEntity} from '@/leads/data/remote/entities/leadsEntity';
import {useRepository} from '../LeadsScreen/useRepository';
import {
  useViewModelProvider,
  ViewModelProvider,
} from '../LeadsScreen/ViewModelContext';

jest.mock('../LeadsScreen/useRepository');
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('ViewModelProviderLeads', () => {
  const mockLeadsData: LeadsEntity[] = [
    {
      id: 1,
      nationalId: '123456789',
      firstName: 'Juan',
      lastName: 'Pérez',
      birthDate: '1990-01-15',
      email: 'juan.perez@example.com',
      status: 'pending',
      validationResults: {
        nationalRegistryCheck: null,
        judicialRecordsCheck: null,
        prospectQualificationScore: null,
      },
    } as LeadsEntity,
    {
      id: 2,
      nationalId: '987654321',
      firstName: 'María',
      lastName: 'González',
      birthDate: '1985-05-23',
      email: 'maria.gonzalez@example.com',
      status: 'pending',
      validationResults: {
        nationalRegistryCheck: null,
        judicialRecordsCheck: null,
        prospectQualificationScore: null,
      },
    } as LeadsEntity,
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides correct context values', () => {
    const mockIsFetching = false;
    const mockRefetch = jest.fn();
    const mockHandleValidateLeadApi = jest.fn().mockResolvedValue(undefined);

    (useRepository as jest.Mock).mockReturnValue({
      leadsData: mockLeadsData,
      isFetching: mockIsFetching,
      refetch: mockRefetch,
      handleValidateLeadApi: mockHandleValidateLeadApi,
    });

    const TestComponent = () => {
      const {
        leadsData,
        isFetching,
        getItem,
        getItemCount,
        handleValidateLead,
        refetch,
      } = useViewModelProvider();

      expect(leadsData).toBe(mockLeadsData);
      expect(isFetching).toBe(mockIsFetching);
      expect(getItem(mockLeadsData, 0)).toBe(mockLeadsData[0]);
      expect(getItemCount()).toBe(mockLeadsData.length);
      expect(typeof handleValidateLead).toBe('function');
      expect(typeof refetch).toBe('function');

      return null;
    };

    render(
      <ViewModelProvider>
        <TestComponent />
      </ViewModelProvider>,
    );
  });

  it('handleValidateLead shows success toast on success', async () => {

    let handleValidateLeadFunction: (id: number) => Promise<void>;

    const TestComponent = () => {
      const {handleValidateLead} = useViewModelProvider();
      handleValidateLeadFunction = handleValidateLead;
      return null;
    };

    render(
      <ViewModelProvider>
        <TestComponent />
      </ViewModelProvider>,
    );

    await act(async () => {
      await handleValidateLeadFunction(1);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      position: 'top',
      text1: 'Validation success',
    });
  });

  it('handleValidateLead shows error toast on failure', async () => {
    const mockHandleValidateLeadApi = jest
      .fn()
      .mockRejectedValue(new Error('API error'));

    (useRepository as jest.Mock).mockReturnValue({
      leadsData: [],
      isFetching: false,
      refetch: jest.fn(),
      handleValidateLeadApi: mockHandleValidateLeadApi,
    });

    let handleValidateLeadFunction: (id: number) => Promise<void>;

    const TestComponent = () => {
      const { handleValidateLead } = useViewModelProvider();
      handleValidateLeadFunction = handleValidateLead;
      return null;
    };

    render(
      <ViewModelProvider>
        <TestComponent />
      </ViewModelProvider>
    );

    // Invoke the function and wait for the async operations
    await act(async () => {
      await handleValidateLeadFunction(1);
    });

    // Assertions
    expect(mockHandleValidateLeadApi).toHaveBeenCalledWith('1');
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'top',
      text1: 'Validation Failed',
      text2: 'There was an error validating this lead.',
    });
  });
});
