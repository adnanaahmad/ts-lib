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
const wav_header_parser_1 = require("./wav-header-parser");
const EXT_WAV_EXTRA_DATA = [8, 0, 3, 0, 0, 0, 6, 0, 0, 0, 0, 0,
    16, 0, 128, 0, 0, 170, 0, 56, 155, 113];
ava_1.default('parseHeader_pcm', (t) => {
    const expected = {
        audioFormat: 1,
        numChannels: 1,
        sampleRate: 44100,
        byteRate: 88200,
        blockAlign: 2,
        bitsPerSample: 16,
        extraData: Buffer.from(''),
        headerLength: 44
    };
    t.deepEqual(wav_header_parser_1.parseHeader(__dirname + '/testfiles/testfile.wav'), expected);
});
ava_1.default('parseHeader_extensible', (t) => {
    const expected = {
        audioFormat: 65534,
        numChannels: 2,
        sampleRate: 8000,
        byteRate: 16000,
        blockAlign: 2,
        bitsPerSample: 8,
        extraData: Buffer.from(EXT_WAV_EXTRA_DATA),
        headerLength: 80
    };
    t.deepEqual(wav_header_parser_1.parseHeader(__dirname + '/testfiles/testfile2.wav'), expected);
});
ava_1.default('parseHeaderFromBuffer_pcm', (t) => {
    const expected = {
        audioFormat: 1,
        numChannels: 1,
        sampleRate: 44100,
        byteRate: 88200,
        blockAlign: 2,
        bitsPerSample: 16,
        extraData: Buffer.from(''),
        headerLength: 44
    };
    const fileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile.wav');
    t.deepEqual(wav_header_parser_1.parseHeaderFromBuffer(fileBuffer), expected);
});
ava_1.default('parseHeaderFromBuffer_extensible', (t) => {
    const expected = {
        audioFormat: 65534,
        numChannels: 2,
        sampleRate: 8000,
        byteRate: 16000,
        blockAlign: 2,
        bitsPerSample: 8,
        extraData: Buffer.from(EXT_WAV_EXTRA_DATA),
        headerLength: 80
    };
    const fileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile2.wav');
    t.deepEqual(wav_header_parser_1.parseHeaderFromBuffer(fileBuffer), expected);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2LWhlYWRlci1wYXJzZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvd2F2LWhlYWRlci1wYXJzZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBeUI7QUFFekIsOENBQXVCO0FBR3ZCLDJEQUc2QjtBQUU3QixNQUFNLGtCQUFrQixHQUNwQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMvQixFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUVoRCxhQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUMxQixNQUFNLFFBQVEsR0FBYztRQUN4QixXQUFXLEVBQUUsQ0FBQztRQUNkLFdBQVcsRUFBRSxDQUFDO1FBQ2QsVUFBVSxFQUFFLEtBQUs7UUFDakIsUUFBUSxFQUFFLEtBQUs7UUFDZixVQUFVLEVBQUUsQ0FBQztRQUNiLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxQixZQUFZLEVBQUUsRUFBRTtLQUNuQixDQUFDO0lBQ0YsQ0FBQyxDQUFDLFNBQVMsQ0FBQywrQkFBVyxDQUFDLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlFLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDakMsTUFBTSxRQUFRLEdBQWM7UUFDeEIsV0FBVyxFQUFFLEtBQUs7UUFDbEIsV0FBVyxFQUFFLENBQUM7UUFDZCxVQUFVLEVBQUUsSUFBSTtRQUNoQixRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxDQUFDO1FBQ2IsYUFBYSxFQUFFLENBQUM7UUFDaEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsWUFBWSxFQUFFLEVBQUU7S0FDbkIsQ0FBQztJQUNGLENBQUMsQ0FBQyxTQUFTLENBQUMsK0JBQVcsQ0FBQyxTQUFTLEdBQUcsMEJBQTBCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvRSxDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3BDLE1BQU0sUUFBUSxHQUFjO1FBQ3hCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsV0FBVyxFQUFFLENBQUM7UUFDZCxVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxDQUFDO1FBQ2IsYUFBYSxFQUFFLEVBQUU7UUFDakIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzFCLFlBQVksRUFBRSxFQUFFO0tBQ25CLENBQUM7SUFDRixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzFFLENBQUMsQ0FBQyxTQUFTLENBQUMseUNBQXFCLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDN0QsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUMzQyxNQUFNLFFBQVEsR0FBYztRQUN4QixXQUFXLEVBQUUsS0FBSztRQUNsQixXQUFXLEVBQUUsQ0FBQztRQUNkLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsVUFBVSxFQUFFLENBQUM7UUFDYixhQUFhLEVBQUUsQ0FBQztRQUNoQixTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUMxQyxZQUFZLEVBQUUsRUFBRTtLQUNuQixDQUFDO0lBQ0YsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsMEJBQTBCLENBQUMsQ0FBQztJQUMzRSxDQUFDLENBQUMsU0FBUyxDQUFDLHlDQUFxQixDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzdELENBQUMsQ0FBQyxDQUFDIn0=