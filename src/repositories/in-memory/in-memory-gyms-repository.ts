import { IGymsRepository } from '@/interfaces/Irepositories/Igyms-repository';
import { Gym, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(JSON.stringify(data.latitude)),
      longitude: new Prisma.Decimal(JSON.stringify(data.longitude)),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
