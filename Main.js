const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const { expect } = require("@playwright/test");

class MainPage {

    constructor(page) {
        this.page = page;
    }

    async goTo(URL) {
        await this.page.goto(URL);
    }
    async wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
            end = new Date().getTime();
        }
    }  
    async pause() {
		return await this.page.pause()
	} 
    async waitForAudioChange(audioOption){
        console.log("Waiting for language to change");
        await this.page.waitForResponse(resp => resp.url().includes(audioOption) && resp.status() === 200);
    } 
    async checkIfImageIsDifferent(image1, image2)
    {
        const img1 = PNG.sync.read(fs.readFileSync(image1));
        const img2 = PNG.sync.read(fs.readFileSync(image2));
        const {width, height} = img1;
        const diff = new PNG({width, height}); 
        const numDiffPixels= pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});
        fs.writeFileSync('diff.png', PNG.sync.write(diff));
        console.log("pixel difference is "+numDiffPixels)
        expect(numDiffPixels).toBeGreaterThan(20000)
    }
    async deleteScreenshotfile(filename)
    {
        try {
            fs.unlinkSync(filename);
            console.log("File removed:", filename);
          } catch (err) {
            console.error(err);
          }
    }
    async waitForLoadState(){
        await this.page.waitForLoadState('domcontentloaded')
    }
}

module.exports = {MainPage};
