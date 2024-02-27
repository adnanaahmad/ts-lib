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
exports.convertBinFromWavBuffer = exports.convertBinFromWav = exports.WavError = void 0;
const fs = __importStar(require("fs"));
const opus_1 = require("@discordjs/opus");
const smart_buffer_1 = require("smart-buffer");
const wav_converter_1 = require("wav-converter");
const OPUS_SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000];
var WavError;
(function (WavError) {
    WavError[WavError["InvalidHeader"] = 0] = "InvalidHeader";
    WavError[WavError["InvalidSampleRate"] = 1] = "InvalidSampleRate";
    WavError[WavError["InvalidSampleSize"] = 2] = "InvalidSampleSize";
})(WavError = exports.WavError || (exports.WavError = {}));
exports.convertBinFromWav = async (filename, outputFile) => {
    const fileBuffer = fs.readFileSync(filename);
    return exports.convertBinFromWavBuffer(fileBuffer, outputFile);
};
exports.convertBinFromWavBuffer = async (fileBuffer, outputFile) => {
    return new Promise((resolve, reject) => {
        const headerOrError = wav_converter_1.parseHeaderFromBuffer(fileBuffer);
        if (headerOrError instanceof Error) {
            console.error('Unable to parse WAV file ' + headerOrError);
            reject(WavError.InvalidHeader);
            return;
        }
        const header = headerOrError;
        if (!isSupportedSampleRate(header.sampleRate)) {
            console.error('Opus encoder only supports sample rates of' +
                ' 8000, 12000, 16000, 24000, 48000.' +
                ' Actual sample rate is ' + header.sampleRate);
            reject(WavError.InvalidSampleRate);
            return;
        }
        const encoderEncoder = new opus_1.OpusEncoder(header.sampleRate, header.numChannels);
        const buffer = new smart_buffer_1.SmartBuffer();
        const totalLen = fileBuffer.length;
        let pos = header.headerLength;
        // The OPUS encoder only supports 16-bit integers
        // We encode in frames of 10ms
        if (header.bitsPerSample != 16) {
            console.error('Opus encoder only supports 16 bit integers');
            reject(WavError.InvalidSampleSize);
            return;
        }
        const sampleSizeBytes = (header.sampleRate / 100) * (header.bitsPerSample / 8);
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
            numChannels: header.numChannels,
            sampleRate: header.sampleRate,
            encodedBuffer: encodedfileBuffer
        };
        resolve(response);
    });
};
const isSupportedSampleRate = (sampleRate) => {
    return OPUS_SUPPORTED_SAMPLE_RATES.includes(sampleRate);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2LWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvd2F2LWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBRXpCLDBDQUE4QztBQUM5QywrQ0FBMkM7QUFDM0MsaURBQWlFO0FBRWpFLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFRdkUsSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBQ2hCLHlEQUFhLENBQUE7SUFDYixpRUFBaUIsQ0FBQTtJQUNqQixpRUFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBSlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFJbkI7QUFFWSxRQUFBLGlCQUFpQixHQUMxQixLQUFLLEVBQUUsUUFBZ0IsRUFBRSxVQUFtQixFQUNkLEVBQUU7SUFDNUIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxPQUFPLCtCQUF1QixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUM7QUFFTyxRQUFBLHVCQUF1QixHQUNoQyxLQUFLLEVBQUUsVUFBa0IsRUFBRSxVQUFtQixFQUNoQixFQUFFO0lBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsTUFBTSxhQUFhLEdBQUcscUNBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEQsSUFBSSxhQUFhLFlBQVksS0FBSyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsYUFBYSxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvQixPQUFPO1NBQ1Y7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