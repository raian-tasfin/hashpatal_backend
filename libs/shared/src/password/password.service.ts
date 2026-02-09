import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async match(pass: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(pass, hash);
    return isMatch;
  }
}
