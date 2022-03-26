import * as bcrypt from 'bcrypt';

export class Hash {
  public static hashString(str: string, saltOrRounds = 10): Promise<string> {
    return bcrypt.hash(str, saltOrRounds);
  }

  public static compareHash(checkHash: string, hash: string): Promise<boolean> {
    return bcrypt.compare(checkHash, hash);
  }
}
