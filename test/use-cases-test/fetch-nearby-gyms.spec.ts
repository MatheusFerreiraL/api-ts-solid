import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms';
import { beforeEach, describe, expect, it } from 'vitest';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Nearby Gym',
      description: null,
      phone: null,
      latitude: -12.863642,
      longitude: -38.4095403,
    });
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -10.7927746,
      longitude: -37.0899187,
    });
    const { gyms } = await sut.execute({
      userLatitude: -12.863642,
      userLongitude: -38.4095403,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Nearby Gym' })]);
  });
});
