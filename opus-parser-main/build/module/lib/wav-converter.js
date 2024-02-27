import * as fs from 'fs';
import { OpusEncoder } from '@discordjs/opus';
import { SmartBuffer } from 'smart-buffer';
import { parseHeaderFromBuffer } from 'wav-converter';
const OPUS_SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000];
export var WavError;
(function (WavError) {
    WavError[WavError["InvalidHeader"] = 0] = "InvalidHeader";
    WavError[WavError["InvalidSampleRate"] = 1] = "InvalidSampleRate";
    WavError[WavError["InvalidSampleSize"] = 2] = "InvalidSampleSize";
})(WavError || (WavError = {}));
export const convertBinFromWav = async (filename, outputFile) => {
    const fileBuffer = fs.readFileSync(filename);
    return convertBinFromWavBuffer(fileBuffer, outputFile);
};
export const convertBinFromWavBuffer = async (fileBuffer, outputFile) => {
    return new Promise((resolve, reject) => {
        const headerOrError = parseHeaderFromBuffer(fileBuffer);
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
        const encoderEncoder = new OpusEncoder(header.sampleRate, header.numChannels);
        const buffer = new SmartBuffer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2LWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvd2F2LWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUV6QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFakUsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQVF2RSxNQUFNLENBQU4sSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBQ2hCLHlEQUFhLENBQUE7SUFDYixpRUFBaUIsQ0FBQTtJQUNqQixpRUFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBSlcsUUFBUSxLQUFSLFFBQVEsUUFJbkI7QUFFRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FDMUIsS0FBSyxFQUFFLFFBQWdCLEVBQUUsVUFBbUIsRUFDZCxFQUFFO0lBQzVCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsT0FBTyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDM0QsQ0FBQyxDQUFDO0FBRU4sTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQ2hDLEtBQUssRUFBRSxVQUFrQixFQUFFLFVBQW1CLEVBQ2hCLEVBQUU7SUFDNUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxNQUFNLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxJQUFJLGFBQWEsWUFBWSxLQUFLLEVBQUU7WUFD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