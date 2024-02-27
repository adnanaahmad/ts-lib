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
const OGG_OPUS_HEAD_SIGNATURE = 'OpusHead';
const OGG_OPUS_TAGS_SIGNATURE = 'OpusTags';
exports.parseHeader = (fileName, custom) => {
    const fileBuffer = fs.readFileSync(fileName);
    return exports.parseHeaderFromBuffer(fileBuffer, custom);
};
exports.parseHeaderFromBuffer = (fileBuffer, custom) => {
    let offset = 0;
    let firstPacketLength = 0;
    if (custom) {
        firstPacketLength = fileBuffer.readUInt32LE(offset);
        offset += 4;
    }
    const opusHead = fileBuffer.subarray(offset, offset + 8).toString();
    offset += 8;
    if (opusHead != OGG_OPUS_HEAD_SIGNATURE) {
        return new Error('Invalid Opus file does not start with head signature');
    }
    // Read initial info
    const version = fileBuffer.readUInt8(offset);
    offset += 1;
    const outputChannels = fileBuffer.readUInt8(offset);
    offset += 1;
    const preskip = fileBuffer.readUInt16LE(offset);
    offset += 2;
    const sampleRate = fileBuffer.readUInt32LE(offset);
    offset += 4;
    const outputGain = fileBuffer.readInt16LE(offset);
    offset += 2;
    // Read channel mapping
    const family = fileBuffer.readInt8(offset);
    offset += 1;
    let streamCount = 1;
    let coupledCount = outputChannels - 1;
    let mapping = [];
    if (family != 0) {
        streamCount = fileBuffer.readInt8(offset);
        offset += 1;
        coupledCount = fileBuffer.readInt8(offset);
        offset += 1;
        mapping = new Array(outputChannels);
        for (let i = 0; i < outputChannels; i++) {
            mapping[i] = fileBuffer.readInt8(offset);
            offset += 1;
        }
    }
    if (custom && firstPacketLength != offset - 4) {
        return new Error('Invalid custom Opus file does not start ' +
            'with correct length for first packet');
    }
    let secondPacketLength = 0;
    if (custom) {
        secondPacketLength = fileBuffer.readUInt32LE(offset);
        offset += 4;
    }
    // Read comments
    const opusTags = fileBuffer.subarray(offset, offset + 8).toString();
    offset += 8;
    if (opusTags != OGG_OPUS_TAGS_SIGNATURE) {
        return new Error('Invalid Opus tags does not start with tags signature');
    }
    const vendorLength = fileBuffer.readUInt32LE(offset);
    offset += 4;
    const vendor = fileBuffer.subarray(offset, offset + vendorLength).toString();
    offset += vendorLength;
    const commentListLength = fileBuffer.readUint32LE(offset);
    offset += 4;
    const comments = new Array(commentListLength);
    for (let i = 0; i < commentListLength; i++) {
        const commentLength = fileBuffer.readUInt32LE(offset);
        offset += 4;
        comments[i] =
            fileBuffer.subarray(offset, offset + commentLength).toString();
        offset += commentLength;
    }
    if (custom && secondPacketLength != offset - firstPacketLength - 8) {
        return new Error('Invalid custom Opus tags does not start ' +
            'with correct length for second packet');
    }
    const opusHeader = {
        version: version,
        outputChannels: outputChannels,
        preskip: preskip,
        sampleRate: sampleRate,
        outputGain: outputGain,
        channelMapping: {
            family: family,
            streamCount: streamCount,
            coupledCount: coupledCount,
            mapping: mapping
        },
        comments: {
            vendor: vendor,
            comments: comments,
        },
        headerLength: offset,
    };
    return opusHeader;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2dnLW9wdXMtaGVhZGVyLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvb2dnLW9wdXMtaGVhZGVyLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBRXpCLE1BQU0sdUJBQXVCLEdBQUcsVUFBVSxDQUFDO0FBQzNDLE1BQU0sdUJBQXVCLEdBQUcsVUFBVSxDQUFDO0FBb0M5QixRQUFBLFdBQVcsR0FDcEIsQ0FBQyxRQUFnQixFQUFFLE1BQWUsRUFDUixFQUFFO0lBQ3hCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsT0FBTyw2QkFBcUIsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDO0FBRU8sUUFBQSxxQkFBcUIsR0FDOUIsQ0FBQyxVQUFrQixFQUFFLE1BQWUsRUFDVixFQUFFO0lBQ3hCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNmLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLElBQUksTUFBTSxFQUFFO1FBQ1IsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxNQUFNLElBQUksQ0FBQyxDQUFDO0tBQ2Y7SUFDRCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEUsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUNaLElBQUksUUFBUSxJQUFJLHVCQUF1QixFQUFFO1FBQ3JDLE9BQU8sSUFBSSxLQUFLLENBQ1osc0RBQXNELENBQUMsQ0FBQztLQUMvRDtJQUNELG9CQUFvQjtJQUNwQixNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxD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