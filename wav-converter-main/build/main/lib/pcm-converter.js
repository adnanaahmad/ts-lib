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
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertWavFromPcmBuffer = exports.convertWavFromPcm = exports.PcmError = void 0;
const fs = __importStar(require("fs"));
const smart_buffer_1 = require("smart-buffer");
const wav_header_1 = require("./wav-header");
var PcmError;
(function (PcmError) {
    PcmError[PcmError["InvalidHeaderGenerated"] = 0] = "InvalidHeaderGenerated";
})(PcmError = exports.PcmError || (exports.PcmError = {}));
exports.convertWavFromPcm = async (filename, pcmInfo, outputFile) => {
    const fileBuffer = fs.readFileSync(filename);
    return exports.convertWavFromPcmBuffer(fileBuffer, pcmInfo, outputFile);
};
exports.convertWavFromPcmBuffer = async (fileBuffer, pcmInfo, outputFile) => {
    return new Promise((resolve, reject) => {
        const header = wav_header_1.convertWavHeaderToBuffer(wav_header_1.getWavHeader(wav_header_1.WAV_AUDIO_FORMAT_PCM, pcmInfo.numChannels, pcmInfo.sampleRate, pcmInfo.bitsPerSample), fileBuffer.length);
        if (header instanceof Error) {
            reject(PcmError.InvalidHeaderGenerated);
            return;
        }
        const buffer = new smart_buffer_1.SmartBuffer();
        buffer.writeBuffer(header);
        buffer.writeBuffer(fileBuffer);
        const file = buffer.toBuffer();
        if (outputFile) {
            fs.writeFileSync(outputFile, file);
        }
        resolve({
            wavBuffer: file
        });
        return;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGNtLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGNtLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBRXpCLCtDQUEyQztBQUUzQyw2Q0FJc0I7QUFZdEIsSUFBWSxRQUVYO0FBRkQsV0FBWSxRQUFRO0lBQ2hCLDJFQUFzQixDQUFBO0FBQzFCLENBQUMsRUFGVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUVuQjtBQUVZLFFBQUEsaUJBQWlCLEdBQzFCLEtBQUssRUFBRSxRQUFnQixFQUFFLE9BQWdCLEVBQUUsVUFBbUIsRUFDaEMsRUFBRTtJQUM1QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sK0JBQXVCLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNwRSxDQUFDLENBQUM7QUFFTyxRQUFBLHVCQUF1QixHQUNoQyxLQUFLLEVBQUUsVUFBa0IsRUFBRSxPQUFnQixFQUFFLFVBQW1CLEVBQ2xDLEVBQUU7SUFDNUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxNQUFNLE1BQU0sR0FBRyxxQ0FBd0IsQ0FDbkMseUJBQVksQ0FDUixpQ0FBb0IsRUFDcEIsT0FBTyxDQUFDLFdBQVcsRUFDbkIsT0FBTyxDQUFDLFVBQVUsRUFDbEIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUMxQixVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkIsSUFBSSxNQUFNLFlBQVksS0FBSyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN4QyxPQUFPO1NBQ1Y7UUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFL0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLElBQUksVUFBVSxFQUFFO1lBQ1osRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEM7UUFDRCxPQUFPLENBQUM7WUFDSixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7UUFDSCxPQUFPO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==