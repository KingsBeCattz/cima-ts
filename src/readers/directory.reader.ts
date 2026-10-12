
import { lstatSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join }                                          from 'node:path';

export async function directoryReader<FileDef>(
  dir: string,
  callback: (
    file: FileDef,
    meta: Pick<ImportMeta, 'dir' | 'file' | 'path'>
  ) => Promise<void> | void
): Promise<boolean> {
  try {
    const root = join(process.cwd(), dir);
    if (!existsSync(root)) mkdirSync(root);
    for (const item of readdirSync(root)) {
      const module = join(root, item);
      if (lstatSync(module).isDirectory()) {
        await directoryReader(join(dir, item), callback);
        continue;
      }
      await callback(
        await import(`file://${module}?update=${Date.now()}`), {
          dir,
          file: item,
          path: module
        }
      );
    }
    return true
  } catch (e) {
    console.error("Error durante lectura de directorio:\n", String(e));
    return false
  }
}
