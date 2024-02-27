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
exports.convertBinFromOpusBuffer = exports.convertBinFromOpus = exports.OpusError = void 0;
const fs = __importStar(require("fs"));
const stream_1 = require("stream");
const ogg_1 = require("@suldashi/ogg");
const smart_buffer_1 = require("smart-buffer");
const ogg_opus_header_parser_1 = require("./ogg-opus-header-parser");
var OpusError;
(function (OpusError) {
    OpusError[OpusError["InvalidHeader"] = 0] = "InvalidHeader";
})(OpusError = exports.OpusError || (exports.OpusError = {}));
exports.convertBinFromOpus = async (filename, outputFile, headerFile) => {
    const fileStream = fs.createReadStream(filename);
    return convertBinFromOpusFileStream(fileStream, outputFile, headerFile);
};
exports.convertBinFromOpusBuffer = async (fileBuffer, outputFile, headerFile) => {
    const fileStream = stream_1.Readable.from(fileBuffer);
    return convertBinFromOpusFileStream(fileStream, outputFile, headerFile);
};
const convertBinFromOpusFileStream = async (fileStream, outputFile, headerFile) => {
    const oggDecoder = new ogg_1.Decoder();
    const headerBuffer = new smart_buffer_1.SmartBuffer();
    const buffer = new smart_buffer_1.SmartBuffer();
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
                opusHeaderResult = ogg_opus_header_parser_1.parseHeader(headerFile, true);
            }
            else {
                opusHeaderResult =
                    ogg_opus_header_parser_1.parseHeaderFromBuffer(headerFileBuffer, true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2dnLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvb2dnLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBQ3pCLG1DQUFrQztBQUVsQyx1Q0FBc0Q7QUFDdEQsK0NBQTJDO0FBRTNDLHFFQUlrQztBQU9sQyxJQUFZLFNBRVg7QUFGRCxXQUFZLFNBQVM7SUFDakIsMkRBQWEsQ0FBQTtBQUNqQixDQUFDLEVBRlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFFcEI7QUFFWSxRQUFBLGtCQUFrQixHQUMzQixLQUFLLEVBQUUsUUFBZ0IsRUFBRSxVQUFtQixFQUFFLFVBQW1CLEVBQ2xDLEVBQUU7SUFDN0IsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELE9BQU8sNEJBQTRCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM1RSxDQUFDLENBQUM7QUFFTyxRQUFBLHdCQUF3QixHQUNqQyxLQUFLLEVBQUUsVUFBa0IsRUFBRSxVQUFtQixFQUFFLFVBQW1CLEVBQ3BDLEVBQUU7SUFDN0IsTUFBTSxVQUFVLEdBQUcsaUJBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0MsT0FBTyw0QkFBNEIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVFLENBQUMsQ0FBQztBQUVOLE1BQU0sNEJBQTRCLEdBQzlCLEtBQUssRUFBRSxVQUFvQixFQUFFLFVBQW1CLEVBQUUsVUFBbUIsRUFDdEMsRUFBRTtJQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQVUsRUFBRSxDQUFDO0lBRXBDLE1BQU0sWUFBWSxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO0lBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsbUNBQW1DO1FBQ25DLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsTUFBTTtZQUNwQyx3REFBd0Q7WUFDeEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxNQUFNO2dCQUM5Qix5RUFBeUU7Z0JBQ3pFLGFBQWE7Z0JBQ2IsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRTtvQkFDdEIsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsRCxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDdEM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDcEIsTUFBTSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakQsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzthQUNsRDtZQUNELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxJQUFJLFVBQVUsRUFBRTtnQkFDWixFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM1QztZQUVELElBQUksZ0JBQXVDLENBQUM7WUFDNUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osZ0JBQWdCLEdBQUcsb0NBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsZ0JBQWdCO29CQUNaLDhDQUFxQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxnQkFBZ0IsWUFBWSxLQUFLLEVBQUU7Z0JBQ25DLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2hDLE9BQU87YUFDVjtZQUNELE1BQU0sUUFBUSxHQUFzQjtnQkFDaEMsTUFBTSxFQUFpQixnQkFBZ0I7Z0JBQ3ZDLGFBQWEsRUFBRSxVQUFVO2FBQzVCLENBQUM7WUFDRixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEIsT0FBTztRQUNYLENBQUMsQ0FBQyxDQUFBO1FBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9