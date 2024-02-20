import { CheckIn } from '@prisma/client';

export interface FetchUserCheckInsHistoryReply {
  checkIns: CheckIn[];
}
