import { nasaApi } from './api';
import { NasaApod } from '../types';

export async function fetchApodList(count = 6): Promise<NasaApod[]> {
  const { data } = await nasaApi.get<NasaApod[]>('/planetary/apod', {
    params: { count },
  });
  return data.filter(item => item.media_type === 'image');
}

export async function fetchApodByDate(date: string): Promise<NasaApod> {
  const { data } = await nasaApi.get<NasaApod>('/planetary/apod', {
    params: { date },
  });
  return data;
}
