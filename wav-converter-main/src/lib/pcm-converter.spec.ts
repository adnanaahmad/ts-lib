import * as fs from 'fs';

import test from 'ava';

import { convertWavFromPcm, convertWavFromPcmBuffer } from './pcm-converter';

test('convertWavFromPcm', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile.pcm';
    const outputFileName = __dirname + '/testfiles/testfile_output.wav';
    const expectedFileName = __dirname + '/testfiles/testfile.wav';

    const result = await convertWavFromPcm(
        inputFileName,
        {
            numChannels: 1, sampleRate: 44100, bitsPerSample: 16
        },
        outputFileName);

    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));;
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});

test('convertWavFromPcmBuffer', async (t) => {
    const inputFileBuffer =
        fs.readFileSync(__dirname + '/testfiles/testfile.pcm');
    const expectedFileName = __dirname + '/testfiles/testfile.wav';

    const result = await convertWavFromPcmBuffer(
        inputFileBuffer,
        {
            numChannels: 1, sampleRate: 44100, bitsPerSample: 16
        });

    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));;
});