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
const ffmpeg_converter_1 = require("./ffmpeg-converter");
ava_1.default('convertBinFromFile', async (t) => {
    const expectedHeader = {
        version: 1,
        outputChannels: 1,
        preskip: 312,
        sampleRate: 48000,
        outputGain: 0,
        channelMapping: {
            family: 0,
            streamCount: 1,
            coupledCount: 0,
            mapping: []
        },
        comments: {
            vendor: 'Lavf59.27.100',
            comments: ['language=eng',
                'handler_name=SoundHandler',
                'vendor_id=[0][0][0][0]',
                'encoder=Lavc59.37.100 libopus',
                'major_brand=isom',
                'minor_version=512',
                'compatible_brands=isomiso2mp41']
        },
        headerLength: 235,
    };
    const inputFileName = __dirname + '/testfiles/testfile3.mp4';
    const outputFileName = __dirname + '/testfiles/testfile3_output.bin';
    const outputOpusFileName = __dirname + '/testfiles/testfile3_output.opus';
    const expectedFileName = __dirname + '/testfiles/testfile3.bin';
    const result = await ffmpeg_converter_1.convertBinFromFile(inputFileName, outputFileName, outputOpusFileName);
    t.deepEqual(result.header, expectedHeader);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mZm1wZWctY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQXlCO0FBRXpCLDhDQUF1QjtBQUV2Qix5REFBd0Q7QUFHeEQsYUFBSSxDQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuQyxNQUFNLGNBQWMsR0FBa0I7UUFDbEMsT0FBTyxFQUFFLENBQUM7UUFDVixjQUFjLEVBQUUsQ0FBQztRQUNqQixPQUFPLEVBQUUsR0FBRztRQUNaLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFVBQVUsRUFBRSxDQUFDO1FBQ2IsY0FBYyxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUM7WUFDVCxXQUFXLEVBQUUsQ0FBQztZQUNkLFlBQVksRUFBRSxDQUFDO1lBQ2YsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELFFBQVEsRUFBRTtZQUNOLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLFFBQVEsRUFBRSxDQUFDLGNBQWM7Z0JBQ3JCLDJCQUEyQjtnQkFDM0Isd0JBQXdCO2dCQUN4QiwrQkFBK0I7Z0JBQy9CLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixnQ0FBZ0MsQ0FBQztTQUN4QztRQUNELFlBQVksRUFBRSxHQUFHO0tBQ3BCLENBQUM7SUFDRixNQUFNLGFBQWEsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7SUFDN0QsTUFBTSxjQUFjLEdBQUcsU0FBUyxHQUFHLGlDQUFpQyxDQUFDO0lBQ3JFLE1BQU0sa0JBQWtCLEdBQUcsU0FBUyxHQUFHLGtDQUFrQyxDQUFDO0lBQzFFLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0lBQ2hFLE1BQU0sTUFBTSxHQUFHLE1BQU0scUNBQWtCLENBQ25DLGFBQWEsRUFDYixjQUFjLEVBQ2Qsa0JBQWtCLENBQUMsQ0FBQTtJQUV2QixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDM0MsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUNwRCxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDIn0=