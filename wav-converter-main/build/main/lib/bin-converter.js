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
exports.convertWavFromBinBuffer = exports.convertWavFromBin = exports.BinError = void 0;
const fs = __importStar(require("fs"));
const opus_1 = require("@discordjs/opus");
const smart_buffer_1 = require("smart-buffer");
const wav_header_1 = require("./wav-header");
const OPUS_SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000];
var BinError;
(function (BinError) {
    BinError[BinError["InvalidFile"] = 0] = "InvalidFile";
    BinError[BinError["InvalidHeaderGenerated"] = 1] = "InvalidHeaderGenerated";
    BinError[BinError["InvalidSampleRate"] = 2] = "InvalidSampleRate";
})(BinError = exports.BinError || (exports.BinError = {}));
exports.convertWavFromBin = async (filename, binInfo, outputFile) => {
    const fileBuffer = fs.readFileSync(filename);
    return exports.convertWavFromBinBuffer(fileBuffer, binInfo, outputFile);
};
exports.convertWavFromBinBuffer = async (fileBuffer, binInfo, outputFile) => {
    return new Promise((resolve, reject) => {
        if (!isSupportedSampleRate(binInfo.sampleRate)) {
            console.error('Opus encoder only supports sample rates of' +
                ' 8000, 12000, 16000, 24000, 48000.' +
                ' Actual sample rate is ' + binInfo.sampleRate);
            reject(BinError.InvalidSampleRate);
            return;
        }
        const encoderEncoder = new opus_1.OpusEncoder(binInfo.sampleRate, binInfo.numChannels);
        const buffer = new smart_buffer_1.SmartBuffer();
        const totalLen = fileBuffer.length;
        let pos = 0;
        while (pos < totalLen) {
            const sampleSizeBytes = fileBuffer.readUInt8(pos);
            pos += 1;
            if (sampleSizeBytes + pos > totalLen) {
                reject(BinError.InvalidFile);
                return;
            }
            const bytes = fileBuffer.subarray(pos, pos + sampleSizeBytes);
            pos += sampleSizeBytes;
            const encoded = encoderEncoder.decode(bytes);
            buffer.writeBuffer(encoded);
        }
        // The Opus library always decode to 16 bits per sample
        const header = wav_header_1.convertWavHeaderToBuffer(wav_header_1.getWavHeader(wav_header_1.WAV_AUDIO_FORMAT_PCM, binInfo.numChannels, binInfo.sampleRate, 
        /* bitsPerSample= */ 16), buffer.length);
        if (header instanceof Error) {
            reject(BinError.InvalidHeaderGenerated);
            return;
        }
        buffer.insertBuffer(header, 0);
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
const isSupportedSampleRate = (sampleRate) => {
    return OPUS_SUPPORTED_SAMPLE_RATES.includes(sampleRate);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYmluLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBRXpCLDBDQUE4QztBQUM5QywrQ0FBMkM7QUFFM0MsNkNBSXNCO0FBRXRCLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFXdkUsSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBQ2hCLHFEQUFXLENBQUE7SUFDWCwyRUFBc0IsQ0FBQTtJQUN0QixpRUFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBSlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFJbkI7QUFFWSxRQUFBLGlCQUFpQixHQUMxQixLQUFLLEVBQUUsUUFBZ0IsRUFBRSxPQUFnQixFQUFFLFVBQW1CLEVBQ2hDLEVBQUU7SUFDNUIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxPQUFPLCtCQUF1QixDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDcEUsQ0FBQyxDQUFDO0FBRU8sUUFBQSx1QkFBdUIsR0FDaEMsS0FBSyxFQUFFLFVBQWtCLEVBQUUsT0FBZ0IsRUFBRSxVQUFtQixFQUNsQyxFQUFFO0lBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM1QyxPQUFPLENBQUMsS0FBSyxDQUFDLDRDQUE0QztnQkFDdEQsb0NBQW9DO2dCQUNwQyx5QkFBeUIsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ25DLE9BQU87U0FDVjtRQUNELE1BQU0sY0FBYyxHQUFHLElBQUksa0JBQVcsQ0FDbEMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7UUFFakMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixPQUFPLEdBQUcsR0FBRyxRQUFRLEVBQUU7WUFDbkIsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ1QsSUFBSSxlQUFlLEdBQUcsR0FBRyxHQUFHLFFBQVEsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0IsT0FBTzthQUNWO1lBQ0QsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDO1lBQzlELEdBQUcsSUFBSSxlQUFlLENBQUM7WUFDdkIsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9CO1FBRUQsdURBQXVEO1FBQ3ZELE1BQU0sTUFBTSxHQUFHLHFDQUF3QixDQUNuQyx5QkFBWSxDQUNSLGlDQUFvQixFQUNwQixPQUFPLENBQUMsV0FBVyxFQUNuQixPQUFPLENBQUMsVUFBVTtRQUNsQixvQkFBb0IsQ0FBQyxFQUFFLENBQUMsRUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5CLElBQUksTUFBTSxZQUFZLEtBQUssRUFBRTtZQUN6QixNQUFNLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDeEMsT0FBTztTQUNWO1FBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLElBQUksVUFBVSxFQUFFO1lBQ1osRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEM7UUFDRCxPQUFPLENBQUM7WUFDSixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7UUFDSCxPQUFPO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFTixNQUFNLHFCQUFxQixHQUFHLENBQUMsVUFBa0IsRUFBVyxFQUFFO0lBQzFELE9BQU8sMkJBQTJCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzVELENBQUMsQ0FBQyJ9