import { existsSync, lstatSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'fs';
import { basename, dirname, join, resolve } from 'path';

export class FileSystem {

  list(basePath: string) {
    const fullBasePath = resolve(basePath);
    const rootDir = dirname(fullBasePath);
    const list: { isDir: boolean; path: string; fullPath: string }[] = [];

    const dive = (dir: string) => {
      readdirSync(join(rootDir, dir)).forEach(subname => {
        const path = join(dir, subname);
        const fullPath = join(rootDir, path);
        const isDir = statSync(fullPath).isDirectory();

        list.push({ isDir, fullPath, path });

        if (isDir) {
          dive(path);
        }
      });
    }

    dive(basename(fullBasePath));

    return list.sort((a, b) => Number(a.path > b.path) - .5);
  }

  remove(path: string) {
    if (existsSync(path)) {
      if (lstatSync(path).isDirectory()) {
        readdirSync(path).forEach(file => {
          var curPath = join(path, file);
          if (lstatSync(curPath).isDirectory()) {
            this.remove(curPath);
          } else {
            unlinkSync(curPath);
          }
        });

        rmdirSync(path);
      } else {
        unlinkSync(path);
      }
    }
  }

}
