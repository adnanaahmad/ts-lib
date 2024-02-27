
import * as fs from 'fs';

import test from 'ava';

import { convertBinFromPcm, convertBinFromPcmBuffer } from './pcm-converter';

test('parseBinFromPcm', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile5.pcm';
    const outputFileName = __dirname + '/testfiles/testfile5_output.bin';
    const expectedFileName = __dirname + '/testfiles/testfile5.bin';
    const result =
        await convertBinFromPcm(
            inputFileName,
            { numChannels: 1, sampleRate: 48000 },
            outputFileName);

    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));;
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});

test('parseBinFromWavBuffer', async (t) => {
    const inputFileBuffer =
        fs.readFileSync(__dirname + '/testfiles/testfile5.pcm')
    const expectedFileName = __dirname + '/testfiles/testfile5.bin';
    const result =
        await convertBinFromPcmBuffer(
            inputFileBuffer, { numChannels: 1, sampleRate: 48000 });

    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
});