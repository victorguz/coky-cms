import * as bcrypt from 'bcrypt';
/**
 * Helpers - coky helper functions
* @author Victorguz <victorguzber@gmail.com> May-2021
*/
export module Helpers {

  export async function encode(cad: string): Promise<string> {
    return await bcrypt.hash(cad, 15)
  }

  export async function compareEncoded(first, second): Promise<boolean> {
    return await bcrypt.compare(first, second)
  }

}
