import { CheckInService } from '@/Services/CheckInService';
import { Decimal } from '@prisma/client/runtime/library';
import { InMemoryCheckInsRepository } from 'test/InMemory/InMemoryCheckInsRepository';
import { InMemoryGymsRepository } from 'test/InMemory/InMemoryGymsRepository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe('Check In Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Frangolandia',
      description: '',
      latitude: new Decimal(-6.5753311),
      longitude: new Decimal(53.3238659),
      phone: '',
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -6.5753311,
      userLongitude: 53.3238659,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in more than once in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 20, 22, 5));
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -6.5753311,
      userLongitude: 53.3238659,
    });

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -6.5753311,
        userLongitude: 53.3238659,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in more than once in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 20, 22, 5));
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -6.5753311,
      userLongitude: 53.3238659,
    });

    vi.setSystemTime(new Date(2024, 0, 25, 25, 33, 57));
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -6.5753311,
      userLongitude: 53.3238659,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in when out of range', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Trembomia',
      description: '',
      longitude: new Decimal(-6.2601776),
      latitude: new Decimal(53.3493096),
      phone: '',
    });

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -6.5753311,
        userLongitude: 53.3238659,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
