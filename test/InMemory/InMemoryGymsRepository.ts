import { GymsRepository } from '@/Repositories/GymsRepository';
import { Gym } from '@prisma/client';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId);
    if (!gym) return null;

    return gym;
  }
}
