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
const bin_converter_1 = require("./bin-converter");
ava_1.default('convertWavFromBin', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile3.bin';
    const outputFileName = __dirname + '/testfiles/testfile3_output.wav';
    const expectedFileName = __dirname + '/testfiles/testfile3.wav';
    const result = await bin_converter_1.convertWavFromBin(inputFileName, {
        numChannels: 2, sampleRate: 48000
    }, outputFileName);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));
    ;
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});
ava_1.default('convertWavFromBinBuffer', async (t) => {
    const inputFileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile3.bin');
    const expectedFileName = __dirname + '/testfiles/testfile3.wav';
    const result = await bin_converter_1.convertWavFromBinBuffer(inputFileBuffer, {
        numChannels: 2, sampleRate: 48000
    });
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9iaW4tY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBRXpCLDhDQUF1QjtBQUV2QixtREFBNkU7QUFFN0UsYUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNsQyxNQUFNLGFBQWEsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7SUFDN0QsTUFBTSxjQUFjLEdBQUcsU0FBUyxHQUFHLGlDQUFpQyxDQUFDO0lBQ3JFLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0lBRWhFLE1BQU0sTUFBTSxHQUFHLE1BQU0saUNBQWlCLENBQ2xDLGFBQWEsRUFDYjtRQUNJLFdBQVcsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUs7S0FDcEMsRUFDRCxjQUFjLENBQUMsQ0FBQztJQUVwQixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDekQsTUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDO0lBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUNwRCxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHlCQUF5QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN4QyxNQUFNLGVBQWUsR0FDakIsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsMEJBQTBCLENBQUMsQ0FBQztJQUM1RCxNQUFNLGdCQUFnQixHQUFHLFNBQVMsR0FBRywwQkFBMEIsQ0FBQztJQUVoRSxNQUFNLE1BQU0sR0FBRyxNQUFNLHVDQUF1QixDQUN4QyxlQUFlLEVBQ2Y7UUFDSSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLO0tBQ3BDLENBQUMsQ0FBQztJQUVQLE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQztBQUN6RCxDQUFDLENBQUMsQ0FBQyJ9