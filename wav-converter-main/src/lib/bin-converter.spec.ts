import * as fs from 'fs';

import test from 'ava';

import { convertWavFromBin, convertWavFromBinBuffer } from './bin-converter';

test('convertWavFromBin', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile3.bin';
    const outputFileName = __dirname + '/testfiles/testfile3_output.wav';
    const expectedFileName = __dirname + '/testfiles/testfile3.wav';

    const result = await convertWavFromBin(
        inputFileName,
        {
            numChannels: 2, sampleRate: 48000
        },
        outputFileName);

    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));;
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});

test('convertWavFromBinBuffer', async (t) => {
    const inputFileBuffer =
        fs.readFileSync(__dirname + '/testfiles/testfile3.bin');
    const expectedFileName = __dirname + '/testfiles/testfile3.wav';

    const result = await convertWavFromBinBuffer(
        inputFileBuffer,
        {
            numChannels: 2, sampleRate: 48000
        });

    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));;
});