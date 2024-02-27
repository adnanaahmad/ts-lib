import test from 'ava';

import {
    convertWavHeaderToBuffer,
    getDefaultWavHeader,
    getWavHeader,
    WAV_AUDIO_FORMAT_PCM,
    WavHeader
} from './wav-header';

test('getDefaultWavHeader', (t) => {
    const expected: WavHeader = {
        audioFormat: 0,
        numChannels: 0,
        sampleRate: 0,
        byteRate: 0,
        blockAlign: 0,
        bitsPerSample: 0,
        extraData: Buffer.from(''),
        headerLength: 44
    };
    t.deepEqual(getDefaultWavHeader(), expected);
});

test('getWavHeader', (t) => {
    const expected: WavHeader = {
        audioFormat: WAV_AUDIO_FORMAT_PCM,
        numChannels: 2,
        sampleRate: 10000,
        byteRate: 40000,
        blockAlign: 4,
        bitsPerSample: 16,
        extraData: Buffer.from('hello'),
        headerLength: 51
    };
    t.deepEqual(
        getWavHeader(
            WAV_AUDIO_FORMAT_PCM,
            /* numChannels= */ 2,
            /* sampleRate= */ 10000,
            /* bitsPerSample= */ 16,
            Buffer.from('hello')),
        expected);
});

test('convertWavHeaderToBuffer', (t) => {
    const input: WavHeader = {
        audioFormat: 1,
        numChannels: 1,
        sampleRate: 44100,
        byteRate: 88200,
        blockAlign: 2,
        bitsPerSample: 16,
        extraData: Buffer.from(''),
        headerLength: 44
    };
    const expected =
        Buffer.from([0x52, 0x49, 0x46, 0x46, 0x1E, 0x00, 0x09, 0x00,
            0x57, 0x41, 0x56, 0x45, 0x66, 0x6D, 0x74, 0x20,
            0x10, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
            0x44, 0xAC, 0x00, 0x00, 0x88, 0x58, 0x01, 0x00,
            0x02, 0x00, 0x10, 0x00, 0x64, 0x61, 0x74, 0x61,
            0xFA, 0xFF, 0x08, 0x00])
    t.deepEqual(
        convertWavHeaderToBuffer(input, /* fileLength= */ 589818), expected);
});
