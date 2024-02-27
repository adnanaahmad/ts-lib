import * as fs from 'fs';
import { OpusEncoder } from '@discordjs/opus';
import { SmartBuffer } from 'smart-buffer';
import { convertWavHeaderToBuffer, getWavHeader, WAV_AUDIO_FORMAT_PCM } from './wav-header';
const OPUS_SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000];
export var BinError;
(function (BinError) {
    BinError[BinError["InvalidFile"] = 0] = "InvalidFile";
    BinError[BinError["InvalidHeaderGenerated"] = 1] = "InvalidHeaderGenerated";
    BinError[BinError["InvalidSampleRate"] = 2] = "InvalidSampleRate";
})(BinError || (BinError = {}));
export const convertWavFromBin = async (filename, binInfo, outputFile) => {
    const fileBuffer = fs.readFileSync(filename);
    return convertWavFromBinBuffer(fileBuffer, binInfo, outputFile);
};
export const convertWavFromBinBuffer = async (fileBuffer, binInfo, outputFile) => {
    return new Promise((resolve, reject) => {
        if (!isSupportedSampleRate(binInfo.sampleRate)) {
            console.error('Opus encoder only supports sample rates of' +
                ' 8000, 12000, 16000, 24000, 48000.' +
                ' Actual sample rate is ' + binInfo.sampleRate);
            reject(BinError.InvalidSampleRate);
            return;
        }
        const encoderEncoder = new OpusEncoder(binInfo.sampleRate, binInfo.numChannels);
        const buffer = new SmartBuffer();
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
        const header = convertWavHeaderToBuffer(getWavHeader(WAV_AUDIO_FORMAT_PCM, binInfo.numChannels, binInfo.sampleRate, 
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYmluLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUV6QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUzQyxPQUFPLEVBQ0gsd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixvQkFBb0IsRUFDdkIsTUFBTSxjQUFjLENBQUM7QUFFdEIsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQVd2RSxNQUFNLENBQU4sSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBQ2hCLHFEQUFXLENBQUE7SUFDWCwyRUFBc0IsQ0FBQTtJQUN0QixpRUFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBSlcsUUFBUSxLQUFSLFFBQVEsUUFJbkI7QUFFRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FDMUIsS0FBSyxFQUFFLFFBQWdCLEVBQUUsT0FBZ0IsRUFBRSxVQUFtQixFQUNoQyxFQUFFO0lBQzVCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsT0FBTyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsQ0FBQztBQUVOLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUNoQyxLQUFLLEVBQUUsVUFBa0IsRUFBRSxPQUFnQixFQUFFLFVBQW1CLEVBQ2xDLEVBQUU7SUFDNUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzVDLE9BQU8sQ0FBQyxLQUFLLENBQUMsNENBQTRDO2dCQUN0RCxvQ0FBb0M7Z0JBQ3BDLHlCQUF5QixHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDbkMsT0FBTztTQUNWO1FBQ0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxXQUFXLENBQ2xDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFFakMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixPQUFPLEdBQUcsR0FBRyxRQUFRLEVBQUU7WUFDbkIsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ1QsSUFBSSxlQUFlLEdBQUcsR0FBRyxHQUFHLFFBQVEsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0IsT0FBTzthQUNWO1lBQ0QsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDO1lBQzlELEdBQUcsSUFBSSxlQUFlLENBQUM7WUFDdkIsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9CO1FBRUQsdURBQXVEO1FBQ3ZELE1BQU0sTUFBTSxHQUFHLHdCQUF3QixDQUNuQyxZQUFZLENBQ1Isb0JBQW9CLEVBQ3BCLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxVQUFVO1FBQ2xCLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxFQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkIsSUFBSSxNQUFNLFlBQVksS0FBSyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN4QyxPQUFPO1NBQ1Y7UUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsSUFBSSxVQUFVLEVBQUU7WUFDWixFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUNELE9BQU8sQ0FBQztZQUNKLFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQztRQUNILE9BQU87SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVOLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxVQUFrQixFQUFXLEVBQUU7SUFDMUQsT0FBTywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUQsQ0FBQyxDQUFDIn0=