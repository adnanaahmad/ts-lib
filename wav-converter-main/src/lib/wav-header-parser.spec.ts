import * as fs from 'fs';

import test from 'ava';

import { WavHeader } from './wav-header';
import {
    parseHeader,
    parseHeaderFromBuffer,
} from './wav-header-parser';

const EXT_WAV_EXTRA_DATA =
    [8, 0, 3, 0, 0, 0, 6, 0, 0, 0, 0, 0,
        16, 0, 128, 0, 0, 170, 0, 56, 155, 113];

test('parseHeader_pcm', (t) => {
    const expected: WavHeader = {
        audioFormat: 1,
        numChannels: 1,
        sampleRate: 44100,
        byteRate: 88200,
        blockAlign: 2,
        bitsPerSample: 16,
        extraData: Buffer.from(''),
        headerLength: 44
    };
    t.deepEqual(parseHeader(__dirname + '/testfiles/testfile.wav'), expected);
});

test('parseHeader_extensible', (t) => {
    const expected: WavHeader = {
        audioFormat: 65534,
        numChannels: 2,
        sampleRate: 8000,
        byteRate: 16000,
        blockAlign: 2,
        bitsPerSample: 8,
        extraData: Buffer.from(EXT_WAV_EXTRA_DATA),
        headerLength: 80
    };
    t.deepEqual(parseHeader(__dirname + '/testfiles/testfile2.wav'), expected);
});

test('parseHeaderFromBuffer_pcm', (t) => {
    const expected: WavHeader = {
        audioFormat: 1,
        numChannels: 1,
        sampleRate: 44100,
        byteRate: 88200,
        blockAlign: 2,
        bitsPerSample: 16,
        extraData: Buffer.from(''),
        headerLength: 44
    };
    const fileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile.wav');
    t.deepEqual(parseHeaderFromBuffer(fileBuffer), expected);
});

test('parseHeaderFromBuffer_extensible', (t) => {
    const expected: WavHeader = {
        audioFormat: 65534,
        numChannels: 2,
        sampleRate: 8000,
        byteRate: 16000,
        blockAlign: 2,
        bitsPerSample: 8,
        extraData: Buffer.from(EXT_WAV_EXTRA_DATA),
        headerLength: 80
    };
    const fileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile2.wav');
    t.deepEqual(parseHeaderFromBuffer(fileBuffer), expected);
});