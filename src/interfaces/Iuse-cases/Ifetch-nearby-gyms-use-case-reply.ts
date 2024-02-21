import { Gym } from '@prisma/client';

export interface FetchNearbyGymsReply {
  gyms: Gym[];
}
