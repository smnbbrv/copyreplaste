"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    FileSystem.prototype.remove = function (path) {
        var _this = this;
        if (fs_1.existsSync(path)) {
            if (fs_1.lstatSync(path).isDirectory()) {
                fs_1.readdirSync(path).forEach(function (file) {
                    var curPath = path + "/" + file;
                    if (fs_1.lstatSync(curPath).isDirectory()) {
                        _this.remove(curPath);
                    }
                    else {
                        fs_1.unlinkSync(curPath);
                    }
                });
                fs_1.rmdirSync(path);
            }
            else {
                fs_1.unlinkSync(path);
            }
        }
    };
    return FileSystem;
}());
exports.FileSystem = FileSystem;
