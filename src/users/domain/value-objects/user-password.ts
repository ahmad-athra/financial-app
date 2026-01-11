import * as bcrypt from 'node:crypto';

export class UserPassword {
  constructor(private readonly value: string) {
    // if (value.length < 8) {
    //     throw new Error('Password must be at least 8 characters long');
    // }
    const passwordHash = bcrypt.hash('sha1', value);
    this.value = passwordHash;
  }

  getValue(): string {
    return this.value;
  }
}
