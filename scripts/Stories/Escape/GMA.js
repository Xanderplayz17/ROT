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
import Server from '../../ServerBook.js';
const cmd = Server.command.create({
    name: 'gma',
    description: `Switches your or other members to adventure mode more easily`,
    aliases: ['gamemodea', 'modea', 'gm2'],
    category: 'Escape',
    admin: true,
    developers: ['Aex66']
});
cmd.startingArgs('name', false);
cmd.callback((plr, args) => {
    if (args.length)
        return;
    plr.runCommandAsync('gamemode a');
    plr.send('You are now in adventure mode!');
});
cmd.playerType('name', (sender, plr) => {
    sender.send(`${plr.nameTag} now in adventure mode!`);
    plr.runCommandAsync('gamemode a');
    plr.send('You are now in adventure mode!');
});
