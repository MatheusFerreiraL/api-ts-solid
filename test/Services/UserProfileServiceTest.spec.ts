import { ResourceNotFoundError } from '@/Errors/ResourceNotFoundError';
import { UsersRepository } from '@/Repositories/UsersRepository';
import { UserProfileService } from '@/Services/UserProfileService';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from 'test/InMemory/InMemoryUsersRepository';
import { beforeEach, describe, expect, it } from 'vitest';

let usersRepository: UsersRepository;
let sut: UserProfileService;

describe('User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UserProfileService(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Jane Doe',
      email: 'jdoe@email.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('Jane Doe');
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        userId: 'non-existing-id',
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
