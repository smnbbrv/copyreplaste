"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    FileSystem.prototype.list = function (basePath) {
        var fullBasePath = path_1.resolve(basePath);
        var rootDir = path_1.dirname(fullBasePath);
        var list = [];
        var dive = function (dir) {
            fs_1.readdirSync(path_1.join(rootDir, dir)).forEach(function (subname) {
                var path = path_1.join(dir, subname);
                var fullPath = path_1.join(rootDir, path);
                var isDir = fs_1.statSync(fullPath).isDirectory();
                list.push({ isDir: isDir, fullPath: fullPath, path: path });
                if (isDir) {
                    dive(path);
                }
            });
        };
        dive(path_1.basename(fullBasePath));
        return list.sort(function (a, b) { return Number(a.path > b.path) - .5; });
    };
    return FileSystem;
}());
exports.FileSystem = FileSystem;
