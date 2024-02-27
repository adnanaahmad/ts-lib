import * as fs from 'fs';

const OGG_OPUS_HEAD_SIGNATURE = 'OpusHead';
const OGG_OPUS_TAGS_SIGNATURE = 'OpusTags';

// The OPUS Header.
// See RFC 7845
export type OggOpusHeader = {
    // 8 bits
    readonly version: number;
    // 8 bits
    readonly outputChannels: number;
    // 16 bits
    readonly preskip: number;
    // 32 bits
    readonly sampleRate: number;
    // 16 bits
    readonly outputGain: number;
    readonly channelMapping: ChannelMapping;
    readonly comments: Comments;
    readonly headerLength: number;
};

export type ChannelMapping = {
    // 8 bits
    readonly family: number;
    // 8 bits
    readonly streamCount: number;
    // 8 bits
    readonly coupledCount: number;
    // As many elements as there are output channels with each element being 8-bit
    readonly mapping: readonly number[];
};

export type Comments = {
    readonly vendor: string;
    readonly comments: readonly string[];
};

export const parseHeader =
    (fileName: string, custom: boolean):
        OggOpusHeader | Error => {
        const fileBuffer = fs.readFileSync(fileName);
        return parseHeaderFromBuffer(fileBuffer, custom);
    };

export const parseHeaderFromBuffer =
    (fileBuffer: Buffer, custom: boolean):
        OggOpusHeader | Error => {
        let offset = 0;
        let firstPacketLength = 0;
        if (custom) {
            firstPacketLength = fileBuffer.readUInt32LE(offset);
            offset += 4;
        }
        const opusHead = fileBuffer.subarray(offset, offset + 8).toString();
        offset += 8;
        if (opusHead != OGG_OPUS_HEAD_SIGNATURE) {
            return new Error(
                'Invalid Opus file does not start with head signature');
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
        let mapping: number[] = [];
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
            return new Error(
                'Invalid Opus tags does not start with tags signature');
        }
        const vendorLength = fileBuffer.readUInt32LE(offset);
        offset += 4;
        const vendor =
            fileBuffer.subarray(offset, offset + vendorLength).toString();
        offset += vendorLength;
        const commentListLength = fileBuffer.readUint32LE(offset);
        offset += 4;
        const comments: string[] = new Array(commentListLength);
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
        const opusHeader: OggOpusHeader = {
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