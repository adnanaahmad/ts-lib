import * as fs from 'fs';
import { OpusEncoder } from '@discordjs/opus';
import { SmartBuffer } from 'smart-buffer';
const OPUS_SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000];
export var PcmError;
(function (PcmError) {
    PcmError[PcmError["InvalidSampleRate"] = 0] = "InvalidSampleRate";
})(PcmError || (PcmError = {}));
export const convertBinFromPcm = async (filename, pcmInfo, outputFile) => {
    const fileBuffer = fs.readFileSync(filename);
    return convertBinFromPcmBuffer(fileBuffer, pcmInfo, outputFile);
};
export const convertBinFromPcmBuffer = async (fileBuffer, pcmInfo, outputFile) => {
    return new Promise((resolve, reject) => {
        if (!isSupportedSampleRate(pcmInfo.sampleRate)) {
            console.error('Opus encoder only supports sample rates of ' +
                '8000, 12000, 16000, 24000, 48000.' +
                ' Actual sample rate is ' + pcmInfo.sampleRate);
            reject(PcmError.InvalidSampleRate);
            return;
        }
        const encoderEncoder = new OpusEncoder(pcmInfo.sampleRate, pcmInfo.numChannels);
        const buffer = new SmartBuffer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGNtLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGNtLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUV6QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUzQyxNQUFNLDJCQUEyQixHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBV3ZFLE1BQU0sQ0FBTixJQUFZLFFBRVg7QUFGRCxXQUFZLFFBQVE7SUFDaEIsaUVBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUZXLFFBQVEsS0FBUixRQUFRLFFBRW5CO0FBRUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQzFCLEtBQUssRUFBRSxRQUFnQixFQUFFLE9BQWdCLEVBQUUsVUFBbUIsRUFDaEMsRUFBRTtJQUM1QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sdUJBQXVCLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNwRSxDQUFDLENBQUM7QUFFTixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FDaEMsS0FBSyxFQUFFLFVBQWtCLEVBQUUsT0FBZ0IsRUFBRSxVQUFtQixFQUNsQyxFQUFFO0lBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM1QyxPQUFPLENBQUMsS0FBSyxDQUFDLDZDQUE2QztnQkFDdkQsbUNBQW1DO2dCQUNuQyx5QkFBeUIsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ25DLE9BQU87U0FDVjtRQUVELE1BQU0sY0FBYyxHQUFHLElBQUksV0FBVyxDQUNsQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRWpDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osaURBQWlEO1FBQ2pELDhCQUE4QjtRQUM5QixNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sR0FBRyxHQUFHLFFBQVEsRUFBRTtZQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNuQixHQUFHLEdBQUcsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxlQUFlLEVBQUU7Z0JBQ2hDLE1BQU07YUFDVDtZQUNELE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsR0FBRyxJQUFJLGVBQWUsQ0FBQztTQUMxQjtRQUNELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLElBQUksVUFBVSxFQUFFO1lBQ1osRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNuRDtRQUNELE1BQU0sUUFBUSxHQUFHO1lBQ2IsYUFBYSxFQUFFLGlCQUFpQjtTQUNuQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBRU4sTUFBTSxxQkFBcUIsR0FBRyxDQUFDLFVBQWtCLEVBQVcsRUFBRTtJQUMxRCxPQUFPLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1RCxDQUFDLENBQUMifQ==