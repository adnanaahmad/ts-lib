
import * as fs from 'fs';

import test from 'ava';

import { convertWavFromFile } from './ffmpeg-converter';


test('convertBinFromFile', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile4.mp4';
    const outputFileName = __dirname + '/testfiles/testfile4_output.wav';
    const expectedFileName = __dirname + '/testfiles/testfile4.wav';
    await convertWavFromFile(
        inputFileName,
        outputFileName);

    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});