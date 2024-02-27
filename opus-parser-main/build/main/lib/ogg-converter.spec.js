"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const ava_1 = __importDefault(require("ava"));
const ogg_converter_1 = require("./ogg-converter");
ava_1.default('parseBinFromOpus', async (t) => {
    const expectedHeader = {
        version: 1,
        outputChannels: 2,
        preskip: 312,
        sampleRate: 48000,
        outputGain: 0,
        channelMapping: {
            family: 0,
            streamCount: 1,
            coupledCount: 1,
            mapping: []
        },
        comments: {
            vendor: 'Lavf57.83.100',
            comments: ['encoder=Lavc57.107.100 libopus',
                'title=Symphony No.6 (1st movement)',
                'artist=Ludwig van Beethoven',
                'album=www.mfiles.co.uk',
                'DESCRIPTION=� Music Files Ltd',
                'genre=Classical']
        },
        headerLength: 237,
    };
    const inputFileName = __dirname + '/testfiles/testfile.opus';
    const outputFileName = __dirname + '/testfiles/testfile_output.bin';
    const outputHeaderFileName = __dirname + '/testfiles/testfile_output.opusheader';
    const expectedFileName = __dirname + '/testfiles/testfile.bin';
    const expectedHeaderFileName = __dirname + '/testfiles/testfile.opusheader';
    const result = await ogg_converter_1.convertBinFromOpus(inputFileName, outputFileName, outputHeaderFileName);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const outputHeaderFileBuffer = fs.readFileSync(outputHeaderFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    const expectedHeaderFileBuffer = fs.readFileSync(expectedHeaderFileName);
    t.deepEqual(result.header, expectedHeader);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    t.true(outputHeaderFileBuffer.equals(expectedHeaderFileBuffer));
    fs.unlinkSync(outputFileName);
    fs.unlinkSync(outputHeaderFileName);
});
ava_1.default('parseBinFromOpusBuffer', async (t) => {
    const expectedHeader = {
        version: 1,
        outputChannels: 2,
        preskip: 312,
        sampleRate: 48000,
        outputGain: 0,
        channelMapping: {
            family: 0,
            streamCount: 1,
            coupledCount: 1,
            mapping: []
        },
        comments: {
            vendor: 'Lavf57.83.100',
            comments: ['encoder=Lavc57.107.100 libopus',
                'title=Symphony No.6 (1st movement)',
                'artist=Ludwig van Beethoven',
                'album=www.mfiles.co.uk',
                'DESCRIPTION=� Music Files Ltd',
                'genre=Classical']
        },
        headerLength: 237,
    };
    const inputFileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile.opus');
    const expectedFileName = __dirname + '/testfiles/testfile.bin';
    const result = await ogg_converter_1.convertBinFromOpusBuffer(inputFileBuffer);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.deepEqual(result.header, expectedHeader);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2dnLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vZ2ctY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQXlCO0FBRXpCLDhDQUF1QjtBQUV2QixtREFBK0U7QUFHL0UsYUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNqQyxNQUFNLGNBQWMsR0FBa0I7UUFDbEMsT0FBTyxFQUFFLENBQUM7UUFDVixjQUFjLEVBQUUsQ0FBQztRQUNqQixPQUFPLEVBQUUsR0FBRztRQUNaLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFVBQVUsRUFBRSxDQUFDO1FBQ2IsY0FBYyxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUM7WUFDVCxXQUFXLEVBQUUsQ0FBQztZQUNkLFlBQVksRUFBRSxDQUFDO1lBQ2YsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELFFBQVEsRUFBRTtZQUNOLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLFFBQVEsRUFBRSxDQUFDLGdDQUFnQztnQkFDdkMsb0NBQW9DO2dCQUNwQyw2QkFBNkI7Z0JBQzdCLHdCQUF3QjtnQkFDeEIsK0JBQStCO2dCQUMvQixpQkFBaUIsQ0FBQztTQUN6QjtRQUNELFlBQVksRUFBRSxHQUFHO0tBQ3BCLENBQUM7SUFDRixNQUFNLGFBQWEsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7SUFDN0QsTUFBTSxjQUFjLEdBQUcsU0FBUyxHQUFHLGdDQUFnQyxDQUFDO0lBQ3BFLE1BQU0sb0JBQW9CLEdBQ3RCLFNBQVMsR0FBRyx1Q0FBdUMsQ0FBQztJQUN4RCxNQUFNLGdCQUFnQixHQUFHLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQztJQUMvRCxNQUFNLHNCQUFzQixHQUFHLFNBQVMsR0FBRyxnQ0FBZ0MsQ0FBQztJQUM1RSxNQUFNLE1BQU0sR0FBRyxNQUFNLGtD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