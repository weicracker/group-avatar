import * as gm from "gm";
class generatorAvatar {
    static paddingSize: number = 12;
    static finalSize: number = 640;
    static globalOffset: number = 8;
    static outputs: string[] = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'];
    static backgroud: string = "../assets/bg.jpg";
    static async draw(inputs: string[], artifact: string) {
        let gens = new Array<any>();
        let outlineSize = this.finalSize - this.globalOffset * 2;
        let imgSize = inputs.length > 4 ? ((outlineSize - 4 * this.paddingSize) / 3) : ((outlineSize - 3 * this.paddingSize) / 2);
        inputs.forEach(async (ipt, idx) => {
            await this.resize(ipt, this.outputs[idx], imgSize);
        })
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
        })
        await this.generate(gens, artifact);
    }
    static async resize(ipt: string, opt: string, size: number): Promise<any> {
        return new Promise((resolve, reject) => {
            gm(ipt).resize(size, size, '!').write(opt, function (err: Error) {
                if (err) { return reject(err); }
                resolve();
            });
        })
    }
    static generate(magics, artifact): Promise<any> {
        return new Promise((resolve, reject) => {
            let cmd = gm().in('-page', '+0+0').in(this.backgroud);
            for (let i = 0; i < magics.length; i++) {
                cmd.in('-page', String(magics[i][0])).in(String(magics[i][1]));
            }
            cmd.mosaic().write(artifact, function (err) {
                if (err) { return reject(err); }
                resolve();
            });
        });
    }
}

module.exports = generatorAvatar;