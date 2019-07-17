#!/usr/bin/env node

import commander from 'commander';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { FileSystem } from './file-system';
import { Replacer } from './replacer';

function main() {
  commander
    .version('0.1.0')
    .option('--from <from>', 'The directory to copy')
    .option('--to <to>', 'The parent directory that will contain the copied one')
    .option('--replace <replace>', 'The comma-separated list of words to replace')
    .option('--with <with>', 'One-by one comma-separated list of replacements for "replace"')
    .option('--force', 'Overwrite existing target folder (if present)')
    .parse(process.argv);

  const cli = commander as unknown as {
    from: string;
    to: string;
    replace: string;
    with: string;
    force: boolean;
  };

  const replace: string[] = cli.replace.split(',');
  const replaceWith: string[] = cli.with.split(',');
  const replacementsOrder = [
    'dasherized',
    'camelized',
    'classified',
    'underscored',
    'capitalized',
  ];

  const replacer = new Replacer();
  const fs = new FileSystem();
  const originalFiles = fs.list(cli.from);
  const replacements = replace.map((r, i) => [r, replaceWith[i]]);

  const worktree = originalFiles.map(original => {
    const path = replacer.replace(original.path, replacements, replacementsOrder);

    return { original, target: { path, fullPath: join(resolve(cli.to), path) } };
  });

  const exists = worktree.find(f => existsSync(f.target.fullPath));

  if (exists) {
    if (cli.force) {
      console.log('Owerwriting targets...');
      worktree.forEach(f => fs.remove(f.target.fullPath))
    } else {
      console.error(exists.target.fullPath, 'target already exists');
      process.exit(1);
    }
  }

  console.log('Copying...');

  worktree.forEach(f => console.log(f.original.path, '>>', f.target.path));

  worktree.forEach(f => {
    if (f.original.isDir) {
      mkdirSync(f.target.fullPath, { recursive: true });
    } else {
      const originalContent = readFileSync(f.original.fullPath, 'utf8');

      writeFileSync(f.target.fullPath, replacer.replace(originalContent, replacements, replacementsOrder), 'utf8');
    }
  });

  console.log('Done!');
}

main();
