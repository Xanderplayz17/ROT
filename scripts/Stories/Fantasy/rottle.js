/*
ROT Developers and Contributors:
Moises (OWNER/CEO/Developer),
Aex66 (Developer),
notbeer (ROT's base code)
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
__________ ___________________
\______   \\_____  \__    ___/
 |       _/ /   |   \|    |
 |    |   \/    |    \    |
 |____|_  /\_______  /____|
        \/         \/
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
© Copyright 2022 all rights reserved by Mo9ses. Do NOT steal, copy the code, or claim it as yours!
Please message Mo9ses#8583 on Discord, or join the ROT discord: https://discord.com/invite/2ADBWfcC6S
Website: https://www.rotmc.ml
Docs: https://docs.google.com/document/d/1hasFU7_6VOBfjXrQ7BE_mTzwacOQs5HC21MJNaraVgg
Thank you!
*/
import config from '../../config.js';
import { DatabasePaper } from '../../Papers/DatabasePaper.js';
import Server from '../../ServerBook.js';
const cmd = Server.command.create({
    name: 'rottle',
    description: 'A fun little word game were you have to guess the word that ROT is thinking of :)',
    aliases: ['rm', 'rottie'],
    category: 'Fantasy',
    developers: ['Aex66']
});
const rottle = new DatabasePaper('rottle');
cmd.startingArgs(['play', 'try', 'quit', 'stats']);
cmd.callback((plr) => {
    if (!rottle.has(plr.id))
        return rottle.write(plr.id, { inMatch: false });
});
cmd.staticType('play', 'play', (plr) => {
    var _a, _b;
    if (rottle.read(plr.id).inMatch)
        return plr.error('You cannot start a game with me if you are already in a game with me! Type "§4!rm quit§c" in chat and give me the win loser');
    rottle.write(plr.id, Object.assign(rottle.read(plr.id), {
        inMatch: true,
        word: words[~~(Math.random() * words.length)],
        attempts: 0,
        matchesPlayed: ((_b = (_a = rottle.read(plr.id)) === null || _a === void 0 ? void 0 : _a.matchesPlayed) !== null && _b !== void 0 ? _b : 0) + 1
    }));
    return plr.send(`The match has started! The word I am thinking of is §c${rottle.read(plr.id).word.length}§7 letters long! You only get §c${config.rottleAttemps}§7 attempts!`);
}, null, false);
cmd.staticType('try', 'try', (plr, val) => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!rottle.read(plr.id).inMatch)
        return plr.error('You are not in a match with me yet... Type "§4!rm play§c" in chat to start one.');
    if (((_a = val.split(' ')) === null || _a === void 0 ? void 0 : _a.length) > 1)
        return plr.error('It\'s only one word, and the word doesn\'t have any numbers or stuff like that. Don\'t worry, I didn\'t count that as a "attempt"');
    rottle.write(plr.id, Object.assign(rottle.read(plr.id), { attempts: rottle.read(plr.id).attempts + 1 }));
    if (rottle.read(plr.id).word === val) {
        rottle.write(plr.id, Object.assign(rottle.read(plr.id), {
            inMatch: false,
            wins: ((_c = (_b = rottle.read(plr.id)) === null || _b === void 0 ? void 0 : _b.wins) !== null && _c !== void 0 ? _c : 0) + 1,
            averageAttempts: ((_e = (_d = rottle.read(plr.id)) === null || _d === void 0 ? void 0 : _d.averageAttempts) !== null && _e !== void 0 ? _e : 0) + rottle.read(plr.id).attempts
        }));
        return plr.send(`Dang, you actally got the word right... GG\n§aWord:§c ${rottle.read(plr.id).word}\n§aAttempts:§c ` + rottle.read(plr.id).attempts);
    }
    if (rottle.read(plr.id).attempts >= config.rottleAttemps) {
        rottle.write(plr.id, Object.assign(rottle.read(plr.id), {
            inMatch: false,
            losses: ((_g = (_f = rottle.read(plr.id)) === null || _f === void 0 ? void 0 : _f.losses) !== null && _g !== void 0 ? _g : 0) + 1
        }));
        if (config.rottleRewards)
            Server.runCommands(config.rottleRewardsCmds.map(cmd => { return cmd.replace('@rottler', `"${plr.name}"`); }));
        return plr.send(`§cTen strikes, your OUT!§7 Thanks for the free win! The word was §c${rottle.read(plr.id).word}§7 by the way XD.`);
    }
    let tryWord = val.split('').map(letter => {
        return rottle.read(plr.id).word.split('').includes(letter) ? `§a${letter}` : `§4${letter}`;
    });
    return plr.send(`§cWrong!§7 Here are the letters that are in that word: §l${tryWord.join('')}§r§7. You have §c${10 - rottle.read(plr.id).attempts}§7 attempts left!`);
});
cmd.staticType('quit', 'quit', (plr) => {
    var _a, _b;
    if (!rottle.read(plr.id).inMatch)
        return plr.send('You are not in a match with me yet... Type "§4!rm play§c" in chat to start one.');
    rottle.write(plr.id, Object.assign(rottle.read(plr.id), {
        inMatch: false,
        losses: ((_b = (_a = rottle.read(plr.id)) === null || _a === void 0 ? void 0 : _a.losses) !== null && _b !== void 0 ? _b : 0) + 1
    }));
    return plr.send('Thanks for the free win loser!');
}, null, false);
cmd.dynamicType('stats', ['stats', 's', 'sto'], (plr) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    plr.send(`Here are your stats:\n§aWins:§c ${(_b = (_a = rottle.read(plr.id)) === null || _a === void 0 ? void 0 : _a.wins) !== null && _b !== void 0 ? _b : 0}\n§aLosses:§c ${(_d = (_c = rottle.read(plr.id)) === null || _c === void 0 ? void 0 : _c.losses) !== null && _d !== void 0 ? _d : '0?!?! Impossible!'}\n§aWin-loss ratio:§c ${(((_e = rottle.read(plr.id)) === null || _e === void 0 ? void 0 : _e.wins) / ((_f = rottle.read(plr.id)) === null || _f === void 0 ? void 0 : _f.losses))}\n§aMatches played:§c ${(_h = (_g = rottle.read(plr.id)) === null || _g === void 0 ? void 0 : _g.matchesPlayed) !== null && _h !== void 0 ? _h : 0}\n§aAverage attemps before a win:§c ` + (((_j = rottle.read(plr.id)) === null || _j === void 0 ? void 0 : _j.averageAttempts) / ((_k = rottle.read(plr.id)) === null || _k === void 0 ? void 0 : _k.wins)));
});
const words = [
    'cattle',
    'resident',
    'situation',
    'lace',
    'check',
    'share',
    'reliance',
    'learn',
    'drink',
    'north',
    'document',
    'extension',
    'elapse',
    'familiar',
    'worker',
    'ladder',
    'provision',
    'dentist',
    'throat',
    'knee',
    'host',
    'institution',
    'war',
    'discover',
    'pavement',
    'character',
    'slump',
    'pudding',
    'notice',
    'predict',
    'conductor',
    'blind',
    'hip',
    'rabbit',
    'respect',
    'so',
    'explode',
    'trance',
    'bold',
    'address',
    'guitar',
    'execute',
    'reform',
    'peasant',
    'faith',
    'walk',
    'church',
    'gravity',
    'form',
    'candle',
    'flavor',
    'introduction',
    'flood',
    'cheek',
    'eat',
    'fur',
    'budge',
    'preach',
    'direction',
    'kidney',
    'folklore',
    'trunk',
    'colony',
    'banquet',
    'restless',
    'diet',
    'urine',
    'vehicle',
    'profession',
    'fiction',
    'prize',
    'friend',
    'clinic',
    'seat',
    'revive',
    'harm',
    'coerce',
    'tender',
    'pause',
    'concentrate',
    'tidy',
    'sip',
    'profile',
    'cigarette',
    'nursery',
    'dictionary',
    'useful',
    'ward',
    'language',
    'clue',
    'us',
    'exclusive',
    'swipe',
    'part',
    'grimace',
    'hunter',
    'accurate',
    'constitution',
    'blackmail',
    'retreat',
    'outfit',
    'priority',
    'inspiration',
    'forum',
    'bracket',
    'willpower',
    'win',
    'atmosphere',
    'way',
    'minor',
    'acquaintance',
    'hall',
    'waiter',
    'right',
    'wording',
    'accompany',
    'tourist',
    'feeling',
    'program',
    'mercy',
    'prescription',
    'ear',
    'suspicion',
    'rate',
    'temple',
    'rhetoric',
    'philosophy',
    'fan',
    'video',
    'speed',
    'discovery',
    'sandwich',
    'carpet',
    'patience',
    'repetition',
    'contrast',
    'daughter',
    'condition',
    'worry',
    'ball',
    'tin',
    'system',
    'movement',
    'sweat',
    'ample',
    'function',
    'owe',
    'finish',
    'nut',
    'ballet',
    'rainbow',
    'score',
    'maze',
    'plug',
    'achieve',
    'swear',
    'list',
    'layout',
    'dependence',
    'link',
    'cylinder',
    'artist',
    'read',
    'garage',
    'deserve',
    'runner',
    'fresh',
    'joke',
    'term',
    'recording',
    'agency',
    'code',
    'cultural',
    'snatch',
    'welcome',
    'order',
    'magnetic',
    'dough',
    'active',
    'hostility',
    'architect',
    'climate',
    'interactive',
    'fair',
    'feeling',
    'lung',
    'aisle',
    'patient',
    'center',
    'elbow',
    'refrigerator',
    'handy',
    'defend',
    'poem',
    'reject',
    'embarrassment',
    'courtesy',
    'am',
    'literature',
    'lighter',
    'garage',
    'recovery',
    'fraud',
    'belly',
    'secure',
    'gaffe',
    'film',
    'embrace',
    'hardware',
    'package',
    'broadcast',
    'drain',
    'fashionable',
    'wrestle',
    'prisoner',
    'layer',
    'building',
    'watch',
    'video',
    'duke',
    'bridge',
    'nose',
    'curriculum',
    'confidence',
    'resort',
    'ecstasy',
    'economics',
    'valley',
    'exchange',
    'baseball',
    'patent',
    'industry',
    'tongue',
    'rhythm',
    'elegant',
    'enlarge',
    'express',
    'single',
    'flourish',
    'photography',
    'pollution',
    'judge',
    'give',
    'banish',
    'directory',
    'displace',
    'persist',
    'president',
    'disappoint',
    'understand',
    'humor',
    'revenge',
    'fossil',
    'thick',
    'ancestor',
    'mutation',
    'confrontation',
    'height',
    'love',
    'chaos',
    'parameter',
    'article',
    'exact',
    'half',
    'suitcase',
    'hilarious',
    'sunshine',
    'bird',
    'identity',
    'egg',
    'prospect',
    'similar',
    'favor',
    'participate',
    'union',
    'identification',
    'tradition',
    'common',
    'property',
    'addicted',
    'professional',
    'increase',
    'cope',
    'disappointment',
    'sell',
    'hole',
    'beginning',
    'film',
    'struggle',
    'bedroom',
    'cover',
    'chain',
    'implication',
    'corner',
    'drift',
    'equation',
    'provincial',
    'flawed',
    'disagree',
    'team',
];
