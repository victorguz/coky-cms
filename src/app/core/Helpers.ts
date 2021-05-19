import * as bcrypt from 'bcrypt';

export module Helpers {
  export async function encode(cad: string): Promise<string> {
    return await bcrypt.hash(cad, 15)
  }
}
