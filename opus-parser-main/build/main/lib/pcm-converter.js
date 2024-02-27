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
exports.convertBinFromPcmBuffer = exports.convertBinFromPcm = exports.PcmError = void 0;
const fs = __importStar(require("fs"));
const opus_1 = require("@discordjs/opus");
const smart_buffer_1 = require("smart-buffer");
const OPUS_SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000];
var PcmError;
(function (PcmError) {
    PcmError[PcmError["InvalidSampleRate"] = 0] = "InvalidSampleRate";
})(PcmError = exports.PcmError || (exports.PcmError = {}));
exports.convertBinFromPcm = async (filename, pcmInfo, outputFile) => {
    const fileBuffer = fs.readFileSync(filename);
    return exports.convertBinFromPcmBuffer(fileBuffer, pcmInfo, outputFile);
};
exports.convertBinFromPcmBuffer = async (fileBuffer, pcmInfo, outputFile) => {
    return new Promise((resolve, reject) => {
        if (!isSupportedSampleRate(pcmInfo.sampleRate)) {
            console.error('Opus encoder only supports sample rates of ' +
                '8000, 12000, 16000, 24000, 48000.' +
                ' Actual sample rate is ' + pcmInfo.sampleRate);
            reject(PcmError.InvalidSampleRate);
            return;
        }
        const encoderEncoder = new opus_1.OpusEncoder(pcmInfo.sampleRate, pcmInfo.numChannels);
        const buffer = new smart_buffer_1.SmartBuffer();
        const totalLen = fileBuffer.length;
        let pos = 0;
        // The OPUS encoder only supports 16-bit integers
        // We encode in frames of 10ms
        const sampleSizeBytes = (pcmInfo.sampleRate / 100) * 2;
        while (pos < totalLen) {
            const readTo = Math.min(pos + sampleSizeBytes, totalLen);
            const bytes = fileBuffer.subarray(pos, readTo);
            if (bytes.length < sampleSizeBytes) {
                break;
            }
            const encoded = encoderEncoder.encode(bytes);
            // Write the sample length and the sample
            buffer.writeUInt8(encoded.length);
            buffer.writeBuffer(encoded);
            pos += sampleSizeBytes;
        }
        const encodedfileBuffer = buffer.toBuffer();
        if (outputFile) {
            fs.writeFileSync(outputFile, encodedfileBuffer);
        }
        const response = {
            encodedBuffer: encodedfileBuffer
        };
        resolve(response);
    });
};
const isSupportedSampleRate = (sampleRate) => {
    return OPUS_SUPPORTED_SAMPLE_RATES.includes(sampleRate);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGNtLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGNtLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBRXpCLDBDQUE4QztBQUM5QywrQ0FBMkM7QUFFM0MsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQVd2RSxJQUFZLFFBRVg7QUFGRCxXQUFZLFFBQVE7SUFDaEIsaUVBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUZXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBRW5CO0FBRVksUUFBQSxpQkFBaUIsR0FDMUIsS0FBSyxFQUFFLFFBQWdCLEVBQUUsT0FBZ0IsRUFBRSxVQUFtQixFQUNoQyxFQUFFO0lBQzVCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsT0FBTywrQkFBdUIsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsQ0FBQztBQUVPLFFBQUEsdUJBQXVCLEdBQ2hDLEtBQUssRUFBRSxVQUFrQixFQUFFLE9BQWdCLEVBQUUsVUFBbUIsRUFDbEMsRUFBRTtJQUM1QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDNUMsT0FBTyxDQUFDLEtBQUssQ0FBQyw2Q0FBNkM7Z0JBQ3ZELG1DQUFtQztnQkFDbkMseUJBQXlCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNuQyxPQUFPO1NBQ1Y7UUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFJLGtCQUFXLENBQ2xDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO1FBRWpDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osaURBQWlEO1FBQ2pELDhCQUE4QjtRQUM5QixNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sR0FBRyxHQUFHLFFBQVEsRUFBRTtZQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNuQixHQUFHLEdBQUcsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxlQUFlLEVBQUU7Z0JBQ2hDLE1BQU07YUFDVDtZQUNELE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsR0FBRyxJQUFJLGVBQWUsQ0FBQztTQUMxQjtRQUNELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLElBQUksVUFBVSxFQUFFO1lBQ1osRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNuRDtRQUNELE1BQU0sUUFBUSxHQUFHO1lBQ2IsYUFBYSxFQUFFLGlCQUFpQjtTQUNuQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBRU4sTUFBTSxxQkFBcUIsR0FBRyxDQUFDLFVBQWtCLEVBQVcsRUFBRTtJQUMxRCxPQUFPLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1RCxDQUFDLENBQUMifQ==