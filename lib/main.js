#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var fs_1 = require("fs");
var path_1 = require("path");
var file_system_1 = require("./file-system");
var replacer_1 = require("./replacer");
function main() {
    commander_1.default
        .version('0.1.0')
        .option('--from <from>', 'The directory to copy')
        .option('--to <to>', 'The parent directory that will contain the copied one')
        .option('--replace <replace>', 'The comma-separated list of words to replace')
        .option('--with <with>', 'One-by one comma-separated list of replacements for "replace"')
        .option('--force', 'Overwrite existing target folder (if present)')
        .parse(process.argv);
    var cli = commander_1.default;
    var replace = cli.replace.split(',');
    var replaceWith = cli.with.split(',');
    var replacementsOrder = [
        'dasherized',
        'camelized',
        'classified',
        'underscored',
        'capitalized',
    ];
    var replacer = new replacer_1.Replacer();
    var fs = new file_system_1.FileSystem();
    var originalFiles = fs.list(cli.from);
    var replacements = replace.map(function (r, i) { return [r, replaceWith[i]]; });
    var worktree = originalFiles.map(function (original) {
        var path = replacer.replace(original.path, replacements, replacementsOrder);
        return { original: original, target: { path: path, fullPath: path_1.join(path_1.resolve(cli.to), path) } };
    });
    var exists = worktree.find(function (f) { return fs_1.existsSync(f.target.fullPath); });
    if (exists) {
        if (cli.force) {
            console.log('Owerwriting targets...');
            worktree.forEach(function (f) { return fs.remove(f.target.fullPath); });
        }
        else {
            console.error(exists.target.fullPath, 'target already exists');
            process.exit(1);
        }
    }
    console.log('Copying...');
    worktree.forEach(function (f) { return console.log(f.original.path, '>>', f.target.path); });
    worktree.forEach(function (f) {
        if (f.original.isDir) {
            fs_1.mkdirSync(f.target.fullPath, { recursive: true });
        }
        else {
            var originalContent = fs_1.readFileSync(f.original.fullPath, 'utf8');
            fs_1.writeFileSync(f.target.fullPath, replacer.replace(originalContent, replacements, replacementsOrder), 'utf8');
        }
    });
    console.log('Done!');
}
main();
