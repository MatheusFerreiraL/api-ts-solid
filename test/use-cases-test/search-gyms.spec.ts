import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from '@/use-cases/search-gyms';
import { beforeEach, describe, expect, it } from 'vitest';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Frangolandia',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });
    await gymsRepository.create({
      title: 'Sibirilas',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const { gyms } = await sut.execute({ query: 'Sibirilas', page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Sibirilas' })]);
  });

  it('should be able to fetch paginated gym search', async () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 22; i++) {
      // eslint-disable-next-line no-await-in-loop
      await gymsRepository.create({
        title: `${i} dias sem frangos`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    }

    const { gyms } = await sut.execute({ query: 'frangos', page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: '21 dias sem frangos' }),
      expect.objectContaining({ title: '22 dias sem frangos' }),
    ]);
  });
});
