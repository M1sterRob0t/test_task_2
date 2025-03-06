import { Endpoint, ResponseStatus, BASE_URL } from '.';
import { Site } from '../types';

const HTTPS_PROTOCOL = 'https://';
const HTTP_PROTOCOL = 'http://';


export const getSites = async (): Promise<Site[]> => {
  const response = await fetch(BASE_URL + Endpoint.Sites);

  if (response.status === ResponseStatus.Success) {
    const data: Site[] = await response.json();
    return data.map((el) => ({
      ...el,
      url: el.url.includes(HTTPS_PROTOCOL) ? el.url.slice(HTTPS_PROTOCOL.length) : el.url.slice(HTTP_PROTOCOL.length),
    }));
  } else throw new Error(`Ошибка! Статус: ${response.status}. Сообщение: ${response.statusText}`);
};
