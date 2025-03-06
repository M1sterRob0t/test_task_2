import { Endpoint, ResponseStatus, BASE_URL } from '.';
import { TestRaw } from '../types';

export const getTests = async (): Promise<TestRaw[]> => {
  const response = await fetch(BASE_URL + Endpoint.Tests);

  if (response.status === ResponseStatus.Success) {
    return response.json();
  } else {
    throw new Error(`Error! Status: ${response.status}. Message: ${response.statusText}`);
  }
};

export const getTest = async (id: string): Promise<TestRaw> => {
  const response = await fetch(`${BASE_URL}${Endpoint.Tests}/${id}`);

  if (response.status === ResponseStatus.Success) {
    return response.json();
  } else {
    throw new Error(`Error! Status: ${response.status}. Message: ${response.statusText}`);
  }
};
