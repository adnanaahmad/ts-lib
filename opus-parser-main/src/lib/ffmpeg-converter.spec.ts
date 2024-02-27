
import * as fs from 'fs';

import test from 'ava';

import { convertBinFromFile } from './ffmpeg-converter';
import { OggOpusHeader } from './ogg-opus-header-parser';

test('convertBinFromFile', async (t) => {
    const expectedHeader: OggOpusHeader = {
        version: 1,
        outputChannels: 1,
        preskip: 312,
        sampleRate: 48000,
        outputGain: 0,
        channelMapping: {
            family: 0,
            streamCount: 1,
            coupledCount: 0,
            mapping: []
        },
        comments: {
            vendor: 'Lavf59.27.100',
            comments: ['language=eng',
                'handler_name=SoundHandler',
                'vendor_id=[0][0][0][0]',
                'encoder=Lavc59.37.100 libopus',
                'major_brand=isom',
                'minor_version=512',
                'compatible_brands=isomiso2mp41']
        },
        headerLength: 235,
    };
    const inputFileName = __dirname + '/testfiles/testfile3.mp4';
    const outputFileName = __dirname + '/testfiles/testfile3_output.bin';
    const outputOpusFileName = __dirname + '/testfiles/testfile3_output.opus';
    const expectedFileName = __dirname + '/testfiles/testfile3.bin';
    const result = await convertBinFromFile(
        inputFileName,
        outputFileName,
        outputOpusFileName)

    t.deepEqual(result.header, expectedHeader);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});