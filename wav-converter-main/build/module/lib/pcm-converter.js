import * as fs from 'fs';
import { SmartBuffer } from 'smart-buffer';
import { convertWavHeaderToBuffer, getWavHeader, WAV_AUDIO_FORMAT_PCM } from './wav-header';
export var PcmError;
(function (PcmError) {
    PcmError[PcmError["InvalidHeaderGenerated"] = 0] = "InvalidHeaderGenerated";
})(PcmError || (PcmError = {}));
export const convertWavFromPcm = async (filename, pcmInfo, outputFile) => {
    const fileBuffer = fs.readFileSync(filename);
    return convertWavFromPcmBuffer(fileBuffer, pcmInfo, outputFile);
};
export const convertWavFromPcmBuffer = async (fileBuffer, pcmInfo, outputFile) => {
    return new Promise((resolve, reject) => {
        const header = convertWavHeaderToBuffer(getWavHeader(WAV_AUDIO_FORMAT_PCM, pcmInfo.numChannels, pcmInfo.sampleRate, pcmInfo.bitsPerSample), fileBuffer.length);
        if (header instanceof Error) {
            reject(PcmError.InvalidHeaderGenerated);
            return;
        }
        const buffer = new SmartBuffer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGNtLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGNtLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUV6QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTNDLE9BQU8sRUFDSCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLG9CQUFvQixFQUN2QixNQUFNLGNBQWMsQ0FBQztBQVl0QixNQUFNLENBQU4sSUFBWSxRQUVYO0FBRkQsV0FBWSxRQUFRO0lBQ2hCLDJFQUFzQixDQUFBO0FBQzFCLENBQUMsRUFGVyxRQUFRLEtBQVIsUUFBUSxRQUVuQjtBQUVELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUMxQixLQUFLLEVBQUUsUUFBZ0IsRUFBRSxPQUFnQixFQUFFLFVBQW1CLEVBQ2hDLEVBQUU7SUFDNUIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxPQUFPLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDcEUsQ0FBQyxDQUFDO0FBRU4sTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQ2hDLEtBQUssRUFBRSxVQUFrQixFQUFFLE9BQWdCLEVBQUUsVUFBbUIsRUFDbEMsRUFBRTtJQUM1QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLE1BQU0sTUFBTSxHQUFHLHdCQUF3QixDQUNuQyxZQUFZLENBQ1Isb0JBQW9CLEVBQ3BCLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFDMUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZCLElBQUksTUFBTSxZQUFZLEtBQUssRUFBRTtZQUN6QixNQUFNLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDeEMsT0FBTztTQUNWO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFL0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLElBQUksVUFBVSxFQUFFO1lBQ1osRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEM7UUFDRCxPQUFPLENBQUM7WUFDSixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7UUFDSCxPQUFPO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==