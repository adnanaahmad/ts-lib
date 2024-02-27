import * as fs from 'fs';
import { Readable } from 'stream';
import { Decoder as OggDecoder } from '@suldashi/ogg';
import { SmartBuffer } from 'smart-buffer';
import { parseHeader, parseHeaderFromBuffer } from './ogg-opus-header-parser';
export var OpusError;
(function (OpusError) {
    OpusError[OpusError["InvalidHeader"] = 0] = "InvalidHeader";
})(OpusError || (OpusError = {}));
export const convertBinFromOpus = async (filename, outputFile, headerFile) => {
    const fileStream = fs.createReadStream(filename);
    return convertBinFromOpusFileStream(fileStream, outputFile, headerFile);
};
export const convertBinFromOpusBuffer = async (fileBuffer, outputFile, headerFile) => {
    const fileStream = Readable.from(fileBuffer);
    return convertBinFromOpusFileStream(fileStream, outputFile, headerFile);
};
const convertBinFromOpusFileStream = async (fileStream, outputFile, headerFile) => {
    const oggDecoder = new OggDecoder();
    const headerBuffer = new SmartBuffer();
    const buffer = new SmartBuffer();
    return new Promise((resolve, reject) => {
        // pipe the ogg file to the Decoder
        oggDecoder.on('stream', function (stream) {
            // emitted for each `ogg_packet` instance in the stream.
            stream.on('data', function (packet) {
                // The first two packets are header packets after which each packet is an
                // OPUS frame
                if (packet.packetno <= 1) {
                    headerBuffer.writeUInt32LE(packet._packet.length);
                    headerBuffer.writeBuffer(packet._packet);
                }
                else {
                    buffer.writeUInt32LE(packet._packet.length);
                    buffer.writeBuffer(packet._packet);
                }
            });
        });
        oggDecoder.on('finish', function () {
            const headerFileBuffer = headerBuffer.toBuffer();
            if (headerFile) {
                fs.writeFileSync(headerFile, headerFileBuffer);
            }
            const fileBuffer = buffer.toBuffer();
            if (outputFile) {
                fs.writeFileSync(outputFile, fileBuffer);
            }
            let opusHeaderResult;
            if (headerFile) {
                opusHeaderResult = parseHeader(headerFile, true);
            }
            else {
                opusHeaderResult =
                    parseHeaderFromBuffer(headerFileBuffer, true);
            }
            if (opusHeaderResult instanceof Error) {
                reject(OpusError.InvalidHeader);
                return;
            }
            const opusFile = {
                header: opusHeaderResult,
                encodedBuffer: fileBuffer
            };
            resolve(opusFile);
            return;
        });
        fileStream.pipe(oggDecoder);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2dnLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvb2dnLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWxDLE9BQU8sRUFBRSxPQUFPLElBQUksVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFM0MsT0FBTyxFQUVILFdBQVcsRUFDWCxxQkFBcUIsRUFDeEIsTUFBTSwwQkFBMEIsQ0FBQztBQU9sQyxNQUFNLENBQU4sSUFBWSxTQUVYO0FBRkQsV0FBWSxTQUFTO0lBQ2pCLDJEQUFhLENBQUE7QUFDakIsQ0FBQyxFQUZXLFNBQVMsS0FBVCxTQUFTLFFBRXBCO0FBRUQsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQzNCLEtBQUssRUFBRSxRQUFnQixFQUFFLFVBQW1CLEVBQUUsVUFBbUIsRUFDbEMsRUFBRTtJQUM3QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsT0FBTyw0QkFBNEIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVFLENBQUMsQ0FBQztBQUVOLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUNqQyxLQUFLLEVBQUUsVUFBa0IsRUFBRSxVQUFtQixFQUFFLFVBQW1CLEVBQ3BDLEVBQUU7SUFDN0IsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3QyxPQUFPLDRCQUE0QixDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDNUUsQ0FBQyxDQUFDO0FBRU4sTUFBTSw0QkFBNEIsR0FDOUIsS0FBSyxFQUFFLFVBQW9CLEVBQUUsVUFBbUIsRUFBRSxVQUFtQixFQUN0QyxFQUFFO0lBQzdCLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFFcEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUN2QyxNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsbUNBQW1DO1FBQ25DLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsTUFBTTtZQUNwQyx3REFBd0Q7WUFDeEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxNQUFNO2dCQUM5Qix5RUFBeUU7Z0JBQ3pFLGFBQWE7Z0JBQ2IsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRTtvQkFDdEIsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsRCxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDdEM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDcEIsTUFBTSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakQsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzthQUNsRDtZQUNELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxJQUFJLFVBQVUsRUFBRTtnQkFDWixFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM1QztZQUVELElBQUksZ0JBQXVDLENBQUM7WUFDNUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNwRDtpQkFBTTtnQkFDSCxnQkFBZ0I7b0JBQ1oscUJBQXFCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDckQ7WUFDRCxJQUFJLGdCQUFnQixZQUFZLEtBQUssRUFBRTtnQkFDbkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDaEMsT0FBTzthQUNWO1lBQ0QsTUFBTSxRQUFRLEdBQXNCO2dCQUNoQyxNQUFNLEVBQWlCLGdCQUFnQjtnQkFDdkMsYUFBYSxFQUFFLFVBQVU7YUFDNUIsQ0FBQztZQUNGLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQixPQUFPO1FBQ1gsQ0FBQyxDQUFDLENBQUE7UUFDRixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=