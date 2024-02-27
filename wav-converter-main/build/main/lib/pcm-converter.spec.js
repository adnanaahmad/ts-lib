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
const pcm_converter_1 = require("./pcm-converter");
ava_1.default('convertWavFromPcm', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile.pcm';
    const outputFileName = __dirname + '/testfiles/testfile_output.wav';
    const expectedFileName = __dirname + '/testfiles/testfile.wav';
    const result = await pcm_converter_1.convertWavFromPcm(inputFileName, {
        numChannels: 1, sampleRate: 44100, bitsPerSample: 16
    }, outputFileName);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));
    ;
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});
ava_1.default('convertWavFromPcmBuffer', async (t) => {
    const inputFileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile.pcm');
    const expectedFileName = __dirname + '/testfiles/testfile.wav';
    const result = await pcm_converter_1.convertWavFromPcmBuffer(inputFileBuffer, {
        numChannels: 1, sampleRate: 44100, bitsPerSample: 16
    });
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGNtLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wY20tY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBRXpCLDhDQUF1QjtBQUV2QixtREFBNkU7QUFFN0UsYUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNsQyxNQUFNLGFBQWEsR0FBRyxTQUFTLEdBQUcseUJBQXlCLENBQUM7SUFDNUQsTUFBTSxjQUFjLEdBQUcsU0FBUyxHQUFHLGdDQUFnQyxDQUFDO0lBQ3BFLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxHQUFHLHlCQUF5QixDQUFDO0lBRS9ELE1BQU0sTUFBTSxHQUFHLE1BQU0saUNBQWlCLENBQ2xDLGFBQWEsRUFDYjtRQUNJLFdBQVcsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRTtLQUN2RCxFQUNELGNBQWMsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN6RCxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7SUFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQ3BELEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMseUJBQXlCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sZUFBZSxHQUNqQixFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzNELE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxHQUFHLHlCQUF5QixDQUFDO0lBRS9ELE1BQU0sTUFBTSxHQUFHLE1BQU0sdUNBQXVCLENBQ3hDLGVBQWUsRUFDZjtRQUNJLFdBQVcsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRTtLQUN2RCxDQUFDLENBQUM7SUFFUCxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7QUFDekQsQ0FBQyxDQUFDLENBQUMifQ==