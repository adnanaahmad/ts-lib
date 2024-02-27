
import * as fs from 'fs';

import test from 'ava';

import { convertBinFromOpus, convertBinFromOpusBuffer } from './ogg-converter';
import { OggOpusHeader } from './ogg-opus-header-parser';

test('parseBinFromOpus', async (t) => {
    const expectedHeader: OggOpusHeader = {
        version: 1,
        outputChannels: 2,
        preskip: 312,
        sampleRate: 48000,
        outputGain: 0,
        channelMapping: {
            family: 0,
            streamCount: 1,
            coupledCount: 1,
            mapping: []
        },
        comments: {
            vendor: 'Lavf57.83.100',
            comments: ['encoder=Lavc57.107.100 libopus',
                'title=Symphony No.6 (1st movement)',
                'artist=Ludwig van Beethoven',
                'album=www.mfiles.co.uk',
                'DESCRIPTION=� Music Files Ltd',
                'genre=Classical']
        },
        headerLength: 237,
    };
    const inputFileName = __dirname + '/testfiles/testfile.opus';
    const outputFileName = __dirname + '/testfiles/testfile_output.bin';
    const outputHeaderFileName =
        __dirname + '/testfiles/testfile_output.opusheader';
    const expectedFileName = __dirname + '/testfiles/testfile.bin';
    const expectedHeaderFileName = __dirname + '/testfiles/testfile.opusheader';
    const result = await convertBinFromOpus(
        inputFileName,
        outputFileName,
        outputHeaderFileName)

    const outputFileBuffer = fs.readFileSync(outputFileName);
    const outputHeaderFileBuffer = fs.readFileSync(outputHeaderFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    const expectedHeaderFileBuffer = fs.readFileSync(expectedHeaderFileName);
    t.deepEqual(result.header, expectedHeader);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    t.true(outputHeaderFileBuffer.equals(expectedHeaderFileBuffer));
    fs.unlinkSync(outputFileName);
    fs.unlinkSync(outputHeaderFileName);
});

test('parseBinFromOpusBuffer', async (t) => {
    const expectedHeader: OggOpusHeader = {
        version: 1,
        outputChannels: 2,
        preskip: 312,
        sampleRate: 48000,
        outputGain: 0,
        channelMapping: {
            family: 0,
            streamCount: 1,
            coupledCount: 1,
            mapping: []
        },
        comments: {
            vendor: 'Lavf57.83.100',
            comments: ['encoder=Lavc57.107.100 libopus',
                'title=Symphony No.6 (1st movement)',
                'artist=Ludwig van Beethoven',
                'album=www.mfiles.co.uk',
                'DESCRIPTION=� Music Files Ltd',
                'genre=Classical']
        },
        headerLength: 237,
    };
    const inputFileBuffer =
        fs.readFileSync(__dirname + '/testfiles/testfile.opus');
    const expectedFileName = __dirname + '/testfiles/testfile.bin';
    const result = await convertBinFromOpusBuffer(inputFileBuffer)

    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.deepEqual(result.header, expectedHeader);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
});