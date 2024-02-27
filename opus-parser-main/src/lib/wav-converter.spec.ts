
import * as fs from 'fs';

import test from 'ava';

import { convertBinFromWav, convertBinFromWavBuffer } from './wav-converter';

test('parseBinFromWav', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile4.wav';
    const outputFileName = __dirname + '/testfiles/testfile4_output.bin';
    const expectedFileName = __dirname + '/testfiles/testfile4.bin';
    const result = await convertBinFromWav(inputFileName, outputFileName);

    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.deepEqual(result.sampleRate, 48000);
    t.deepEqual(result.numChannels, 1);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));;
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});

test('parseBinFromWavBuffer', async (t) => {
    const inputFileBuffer =
        fs.readFileSync(__dirname + '/testfiles/testfile4.wav')
    const expectedFileName = __dirname + '/testfiles/testfile4.bin';
    const result = await convertBinFromWavBuffer(inputFileBuffer);

    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.deepEqual(result.sampleRate, 48000);
    t.deepEqual(result.numChannels, 1);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
});