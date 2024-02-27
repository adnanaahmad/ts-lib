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
exports.parseHeaderFromBuffer = exports.parseHeader = void 0;
const fs = __importStar(require("fs"));
const wav_header_1 = require("./wav-header");
exports.parseHeader = (fileName) => {
    const fileBuffer = fs.readFileSync(fileName);
    return exports.parseHeaderFromBuffer(fileBuffer);
};
exports.parseHeaderFromBuffer = (fileBuffer) => {
    let offset = 0;
    const chunkId = fileBuffer.subarray(offset, offset + 4).toString();
    offset += 4;
    if (chunkId != wav_header_1.WAV_CHUNK_ID) {
        return new Error('Invalid WAV file does not start with correct chunk ID');
    }
    const chunkSize = fileBuffer.readUInt32LE(offset);
    offset += 4;
    if (fileBuffer.length != chunkSize + 8) {
        return new Error('Invalid WAV file has incorrect length');
    }
    const format = fileBuffer.subarray(offset, offset + 4).toString();
    offset += 4;
    if (format != wav_header_1.WAV_FORMAT) {
        return new Error('Invalid WAV file has incorrect format');
    }
    const subchunk1Id = fileBuffer.subarray(offset, offset + 4).toString();
    offset += 4;
    if (subchunk1Id != wav_header_1.WAV_FMT_SUBCHUNK_ID) {
        return new Error('Invalid WAV file has incorrect subchunk 1 ID');
    }
    const subChunk1Size = fileBuffer.readUInt32LE(offset);
    offset += 4;
    const audioFormat = fileBuffer.readUInt16LE(offset);
    offset += 2;
    const numChannels = fileBuffer.readUInt16LE(offset);
    offset += 2;
    const sampleRate = fileBuffer.readUInt32LE(offset);
    offset += 4;
    const byteRate = fileBuffer.readUInt32LE(offset);
    offset += 4;
    const blockAlign = fileBuffer.readUInt16LE(offset);
    offset += 2;
    const bitsPerSample = fileBuffer.readUInt16LE(offset);
    offset += 2;
    let extraData = Buffer.from('');
    if (subChunk1Size != 16) {
        if (audioFormat == 1) {
            return new Error('Invalid WAV file has incorrect size for subchunk 1');
        }
        const extraDataSize = fileBuffer.readUInt16LE(offset);
        offset += 2;
        if (subChunk1Size != 16 + 2 + extraDataSize) {
            return new Error('Invalid WAV file has incorrect size for extra data');
        }
        extraData = fileBuffer.subarray(offset, offset + extraDataSize);
        offset += extraDataSize;
    }
    let dataChunkReached = false;
    while (!dataChunkReached && offset < fileBuffer.length) {
        const subchunkId = fileBuffer.subarray(offset, offset + 4).toString();
        offset += 4;
        if (subchunkId == wav_header_1.WAV_DATA_SUBCHUNK_ID) {
            dataChunkReached = true;
            break;
        }
        const subchunkLength = fileBuffer.readUInt32LE(offset);
        offset += 4;
        offset += subchunkLength;
    }
    if (!dataChunkReached) {
        return new Error('Invalid WAV file does not have data subchunk ID');
    }
    // The header completes 4 bytes after the data subchunk's ID
    const headerLength = offset + 4;
    const wavHeader = {
        audioFormat: audioFormat,
        numChannels: numChannels,
        sampleRate: sampleRate,
        byteRate: byteRate,
        blockAlign: blockAlign,
        bitsPerSample: bitsPerSample,
        extraData: extraData,
        headerLength: headerLength
    };
    return wavHeader;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2LWhlYWRlci1wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3dhdi1oZWFkZXItcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBeUI7QUFFekIsNkNBTXNCO0FBR1QsUUFBQSxXQUFXLEdBQUcsQ0FBQyxRQUFnQixFQUFxQixFQUFFO0lBQy9ELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsT0FBTyw2QkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUM7QUFFVyxRQUFBLHFCQUFxQixHQUM5QixDQUFDLFVBQWtCLEVBQXFCLEVBQUU7SUFDdEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25FLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDWixJQUFJLE9BQU8sSUFBSSx5QkFBWSxFQUFFO1FBQ3pCLE9BQU8sSUFBSSxLQUFLLENBQ1osdURBQXVELENBQUMsQ0FBQztLQUNoRTtJQUNELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUNaLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1FBQ3BDLE9BQU8sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUM3RDtJQUNELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsRSxNQUFNLElBQUksQ0FBQyxDQUFD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