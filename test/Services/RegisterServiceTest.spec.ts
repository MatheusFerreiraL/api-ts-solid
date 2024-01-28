import { UserAlredyExistError } from '@/Errors/UserAlredyExistError';
import { RegisterService } from '@/Services/RegisterService';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from 'test/InMemory/InMemoryUsersRepository';
import { expect, describe, it } from 'vitest';

describe('Register Service', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.executeRegister({
      name: 'John Doe',
      email: 'jdoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.executeRegister({
      name: 'John Doe',
      email: 'jdoe@email.com',
      password: '123456',
    });

    const isPasswordHashed = await compare('123456', user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it('should not be able do register user with same email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const email = 'jdoe@email.com';

    await registerService.executeRegister({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(async () => {
      await registerService.executeRegister({
        name: 'John Doe',
        email,
        password: '123456',
      });
    }).rejects.toBeInstanceOf(UserAlredyExistError);
  });
});
