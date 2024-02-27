import * as fs from 'fs';

import test from 'ava';

import {
    OggOpusHeader,
    parseHeader,
    parseHeaderFromBuffer
} from './ogg-opus-header-parser';

test('parseHeader_classic', (t) => {
    const expected: OggOpusHeader = {
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
        headerLength: 229,
    };
    t.deepEqual(parseHeader(
        __dirname + '/testfiles/testfile.classicopusheader', false), expected);
});

test('parseHeader_custom', (t) => {
    const expected: OggOpusHeader = {
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
    t.deepEqual(parseHeader(
        __dirname + '/testfiles/testfile.opusheader', true), expected);
});

test('parseHeaderFromBuffer_classic', (t) => {
    const expected: OggOpusHeader = {
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
        headerLength: 229,
    };
    const fileBuffer =
        fs.readFileSync(__dirname + '/testfiles/testfile.classicopusheader');
    t.deepEqual(parseHeaderFromBuffer(fileBuffer, false), expected);
});

test('parseHeaderFromBuffer_custom', (t) => {
    const expected: OggOpusHeader = {
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
    const fileBuffer =
        fs.readFileSync(__dirname + '/testfiles/testfile.opusheader');
    t.deepEqual(parseHeaderFromBuffer(fileBuffer, true), expected);
});