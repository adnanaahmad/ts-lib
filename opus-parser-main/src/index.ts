export {
    ConvertedFFmpegFile,
    FFmpegStream,
    FFmpegError,
    convertBinFromFile
} from './lib/ffmpeg-converter';
export {
    ConvertedOpusFile,
    OpusError,
    convertBinFromOpus,
    convertBinFromOpusBuffer
} from './lib/ogg-converter';
export {
    ConvertedPcmFile,
    PcmError,
    PcmInfo,
    convertBinFromPcm,
    convertBinFromPcmBuffer
} from './lib/pcm-converter';
export {
    ConvertedWavFile,
    WavError,
    convertBinFromWav,
    convertBinFromWavBuffer
} from './lib/wav-converter';

export {
    OggOpusHeader,
    ChannelMapping,
    Comments,
    parseHeader,
    parseHeaderFromBuffer
} from './lib/ogg-opus-header-parser';