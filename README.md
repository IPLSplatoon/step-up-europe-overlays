# step-up-europe-overlays
Overlays Graphics Package for [Step Up, Europe!](https://twitter.com/SUE_Splat) live stream / production.

### Examples
- [Scoreboard](https://github.com/IPLSplatoon/step-up-europe-overlays/blob/master/Images/SUEScoreboard.gif)
- [Break Screen](https://www.youtube.com/watch?v=EtJiteopxJs&ab_channel=InklingPerformanceLabs)

## Before using

This bundle is not intended to be used verbatim. We're open-sourcing this bundle in hopes that people will use it as a thing to learn from, rather than just taking and using it for their own broadcast.

Some Assets are not included due to this 

TL;DR: **Do not just download and use this bundle as, make something new for this and learn for it!**

## Install

1.1. Install NodeCG and [nodecg-cli](https://github.com/nodecg/nodecg-cli) (optional)

If you're using nodecg-cli:

2.1. Run `nodecg install IPLSplatoon/step-up-europe-overlays`.

2.2. Install the dashboard by running `nodecg install inkfarer/ipl-overlay-controls`

### Otherwise:

2.1. Clone step-up-europe-overlays to `nodecg/bundles/step-up-europe-overlays` and clone [ipl-overlay-controls](https://github.com/inkfarer/ipl-overlay-controls) to `nodecg/bundles/ipl-overlay-controls`.

2.2. Install dependencies by running `npm install` in `nodecg/bundles/step-up-europe-overlays` and `nodecg/bundles/ipl-overlay-controls`.

3.1. For last.fm integration to work, create the configuration file at `nodecg/cfg/ipl-overlay-controls.json`.

Example configuration file:
```json
{
	"lastfm": {
		"targetAccount": "Your last.fm account name",
		"apiKey": "your API key",
		"secret": "your secret"
	}
}
```

## Usage

Start NodeCG. By default, the dashboard can be accessed from `localhost:9090` in your browser.

From the dashboard, URLs to the graphics can be found from the graphics tab. To use them, they should be added as browser sources in a broadcast application such as OBS Studio. The graphics are made to run at a resolution of 1920x1080.

## Fonts

Fonts used by SUE overlays are not included and you will need to aquire these files and their Commercial License required from the following

- [Gibson](https://fonts.adobe.com/fonts/gibson)

## Credits

- Splatoon 2 map portraits are property of Nintendo and were downloaded from the [Splatoon wiki.](https://splatoonwiki.org/)
- Overlays designs and graphics are by [TheMoo](https://twitter.com/TheMoo_spl) & [Vincent Lee](https://github.com/vlee489)
- Implimentation work by [Vincent Lee](https://github.com/vlee489) & [Inkfarer](https://github.com/inkfarer)