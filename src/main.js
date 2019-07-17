"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var file_system_1 = require("./file-system");
var replacer_1 = require("./replacer");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var replacer, fs, copyFrom, copyTo, originalFiles, replacementsOrder, replacements, worktree, exists;
        return __generator(this, function (_a) {
            replacer = new replacer_1.Replacer();
            fs = new file_system_1.FileSystem();
            copyFrom = 'test/test-name';
            copyTo = 'test';
            originalFiles = fs.list(copyFrom);
            replacementsOrder = [
                'dasherized',
                'camelized',
                'classified',
                'underscored',
                'capitalized',
            ];
            replacements = [
                ['names', 'coolies'],
                ['name', 'cool'],
            ];
            worktree = originalFiles.map(function (original) {
                var path = replacer.replace(original.path, replacements, replacementsOrder);
                return { original: original, target: { path: path, fullPath: path_1.join(path_1.resolve(copyTo), path) } };
            });
            exists = worktree.find(function (f) { return fs_1.existsSync(f.target.fullPath); });
            if (exists) {
                console.error(exists.target.fullPath, 'target already exists');
                process.exit(1);
            }
            console.log('Following will be created\n');
            console.log(worktree.map(function (f) { return console.log(f.original.path, '>>', f.target.path); }));
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
            return [2 /*return*/];
        });
    });
}
main();
