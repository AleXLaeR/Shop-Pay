import fs from 'fs';
import jwt from 'jsonwebtoken';

export function getTypeEnum<T extends string | number>(): string[] {
  return Object.keys({} as { [K in T]: null });
}

export function createJwtToken(payload: string | Record<string, string>): string {
  return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    expiresIn: '7d',
  });
}

export async function readStaticTemplate(
  fileName: string,
  placeholders?: Record<string, string>,
): Promise<string> {
  let content = await fs.promises.readFile(`./templates/${fileName}.html`, 'utf-8');

  if (placeholders) {
    Object.entries(placeholders).forEach(([key, value]) => {
      content = content.replaceAll(key, value);
    });
  }
  return content;
}
