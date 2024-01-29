import { InvalidCredentialsError } from '@/Errors/InvalidCredentialsError';
import { AuthenticateUser } from '@/Middlewares/AuthenticateUser';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from 'test/InMemory/InMemoryUsersRepository';
import { expect, describe, it, beforeEach } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUser;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUser(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jane',
      email: 'janedoe@email.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'janedoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'janedoe@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate wrong password', async () => {
    await usersRepository.create({
      name: 'Jane',
      email: 'janedoe@email.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'janedoe@email.com',
        password: '654321',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
