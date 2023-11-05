var fs = require('fs');
var osuAPI = require('./osuAPIfunctions.js');
var api_key = '';
//NOTE: dates are YYYY MM DD

const month = "2023-01"

const queryStuff = {
    "c": '',
    "m": 0,
    "s": 'ranked',
    "nsfw": true,
    "g": '',
    "l": '',
    "e": '',
    "r": '',
    "played": '',
    "q": "ranked=" + month,
    "page": 1 //page starts at 1, page 0 and 1 are the same.
}

var fileNames = {
    'beatmaps': 'csvs/beatmaps'+month+'.csv',
    'beatmapDiffs': 'csvs/beatmapDiffs'+month+'.csv'
}

async function createsFiles(){
    let inputString = 'id, artist, title, mapper, ranked_date, bpm, nsfw, storyboard, video, playcount,\n\n';
    fs.writeFile(fileNames.beatmaps, inputString, function(err,file){
        if(err) throw err;
    })
    inputString = 'url, artist, title, difficulty, SR, AR, OD, CS, HP, Circle Count, Slider Count, Spinner Count, Song Length, Map Length, Max Combo, Passcount, Playcount\n\n'
    fs.writeFile(fileNames.beatmapDiffs, inputString, function(err,file){
        if(err) throw err;
    })
}

async function writeBeatmapCSV(cleanInput) {
    writeStream = fs.createWriteStream(fileNames.beatmaps, { 'flags': 'a' });
    writeStream.write(cleanInput);
    return;
}

async function writeDifficultiesCSV(cleanInput) {
    writeStream = fs.createWriteStream(fileNames.beatmapDiffs, { 'flags': 'a' });
    writeStream.write(cleanInput);
    return;
}

async function iteratesThroughDifficulties(beatmapDiffs, artist, title) {
    let inputString = '';
    let diffs = [];
    for (let beatmapDiff of beatmapDiffs) {
        let diffObject = {
            'url': beatmapDiff['url'],
            'artist': artist,
            'title': title,
            'version': beatmapDiff['version'],
            'SR': beatmapDiff['difficulty_rating'],
            'AR': beatmapDiff['ar'],
            'OD': beatmapDiff['accuracy'],
            'CS': beatmapDiff['cs'],
            'HP': beatmapDiff['drain'],
            'Circle Count': beatmapDiff['count_circles'],
            'Slider Count': beatmapDiff['count_sliders'],
            'Spinner Count': beatmapDiff['count_spinners'],
            'Song Length': beatmapDiff['total_length'],
            'Map Length': beatmapDiff['hit_length'],
            'Max Combo': beatmapDiff['max_combo'],
            'Passcount': beatmapDiff['passcount'],
            'Playcount': beatmapDiff['playcount']
        }
        if(beatmapDiff['mode_int'] == 0 && beatmapDiff['ranked'] == 1){
            diffs.push(diffObject);
        }
        else{
            console.log('Either mode int or ranked status is wrong. Check it out:')
            console.log(beatmapDiff['url']);
        }
    }
    diffs.sort(function (a, b) {
        return (a.SR < b.SR ? -1 : 1);
    })
    for (i = 0; i < diffs.length; i++) {
        inputString += (
            diffs[i].url + ',' +
            '"' + diffs[i].artist + '"' + ',' +
            '"' + diffs[i].title + '"' + ',' +
            '"' + diffs[i].version + '"' + ',' +
            diffs[i].SR + ',' +
            diffs[i].AR + ',' +
            diffs[i].OD + ',' +
            diffs[i].CS + ',' +
            diffs[i].HP + ',' +
            diffs[i]['Circle Count'] + ',' +
            diffs[i]['Slider Count'] + ',' +
            diffs[i]['Spinner Count'] + ',' +
            diffs[i]['Song Length'] + ',' +
            diffs[i]['Map Length'] + ',' +
            diffs[i]['Max Combo'] + ',' +
            diffs[i]['Passcount'] + ',' +
            diffs[i]['Playcount'] + ',' +
            '\n'
        );
    }
    await writeDifficultiesCSV(inputString);
    return;
}

async function iteratesThroughBeatmapSets(beatmapSets) {
    let inputString = '';
    for (const beatmapSet of beatmapSets) {
        inputString += (
            beatmapSet['id'] + ',' +
            '"' + beatmapSet['artist'] + '"' + ',' +
            '"' + beatmapSet['title'] + '"' + ',' +
            beatmapSet['creator'] + ',' +
            beatmapSet['ranked_date'] + ',' +
            beatmapSet['bpm'] + ',' +
            beatmapSet['nsfw'] + ',' +
            beatmapSet['storyboard'] + ',' +
            beatmapSet['video'] + ',' +
            beatmapSet['play_count'] + ','
            + '\n'
        );
        await iteratesThroughDifficulties(beatmapSet['beatmaps'], beatmapSet['artist'], beatmapSet['title']);
    };
    await writeBeatmapCSV(inputString);
    return;
}

async function main() {
    await createsFiles();
    api_key = await osuAPI.getAPIkey();
    let i = 0;
    let queryResponse = await osuAPI.beatmapsetsSearch(api_key, queryStuff);
    const total = queryResponse['total'];
    let pages = Math.ceil(total/50);
    await iteratesThroughBeatmapSets(queryResponse['beatmapsets']);
    while(queryStuff.page < pages){
        queryStuff.page += 1;
        queryResponse = await osuAPI.beatmapsetsSearch(api_key, queryStuff);
        await iteratesThroughBeatmapSets(queryResponse['beatmapsets']);
    }
    console.log(total);
}

main();

