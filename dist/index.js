"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const gm = require("gm");
class generatorAvatar {
    static draw(inputs, artifact) {
        return __awaiter(this, void 0, void 0, function* () {
            let gens = new Array();
            let outlineSize = this.finalSize - this.globalOffset * 2;
            let imgSize = inputs.length > 4 ? ((outlineSize - 4 * this.paddingSize) / 3) : ((outlineSize - 3 * this.paddingSize) / 2);
            inputs.forEach((ipt, idx) => __awaiter(this, void 0, void 0, function* () {
                yield this.resize(ipt, this.outputs[idx], imgSize);
            }));
            inputs.forEach((ipt, j) => {
                let colSize = inputs.length > 4 ? 3 : 2;
                let rowSize = Math.ceil(inputs.length / colSize);
                let yOffset = (rowSize - Math.ceil((inputs.length - j) / colSize)) * (imgSize + this.paddingSize);
                if (rowSize < colSize) {
                    yOffset += (colSize - rowSize) * imgSize / 2;
                }
                let xOffset = (colSize - (inputs.length - j - 1) % colSize - 1) * (imgSize + this.paddingSize);
                if ((inputs.length % colSize !== 0 && (inputs.length - j) > (rowSize - 1) * colSize)) {
                    xOffset -= ((colSize - inputs.length % colSize) * imgSize) / 2 + this.paddingSize;
                }
                gens.push([`+${this.globalOffset + this.paddingSize + xOffset}+${this.globalOffset + this.paddingSize + yOffset}`, this.outputs[j]]);
            });
            yield this.generate(gens, artifact);
        });
    }
    static resize(ipt, opt, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                gm(ipt).resize(size, size, '!').write(opt, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    }
    static generate(magics, artifact) {
        return new Promise((resolve, reject) => {
            let cmd = gm().in('-page', '+0+0').in(this.backgroud);
            for (let i = 0; i < magics.length; i++) {
                cmd.in('-page', String(magics[i][0])).in(String(magics[i][1]));
            }
            cmd.mosaic().write(artifact, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}
generatorAvatar.paddingSize = 12;
generatorAvatar.finalSize = 640;
generatorAvatar.globalOffset = 8;
generatorAvatar.outputs = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'];
generatorAvatar.backgroud = "../assets/bg.jpg";
module.exports = generatorAvatar;
//# sourceMappingURL=index.js.map