// Replicants
const bigTextValue = nodecg.Replicant('mainFlavorText', 'ipl-overlay-controls');
const casterNames = nodecg.Replicant('casterNames', 'ipl-overlay-controls');
const nowPlaying = nodecg.Replicant('nowPlaying', 'ipl-overlay-controls');
const nowPlayingManual = nodecg.Replicant('nowPlayingManual', 'ipl-overlay-controls');
const mSongEnabled = nodecg.Replicant('mSongEnabled', 'ipl-overlay-controls');
const musicShown = nodecg.Replicant('musicShown', 'ipl-overlay-controls');
const currentBreakScene = nodecg.Replicant('currentBreakScene', 'ipl-overlay-controls');
const nextTeams = nodecg.Replicant('nextTeams', 'ipl-overlay-controls');
const currentMaplistID = nodecg.Replicant('currentMaplistID', 'ipl-overlay-controls');
const mapWinners = nodecg.Replicant('mapWinners', 'ipl-overlay-controls');
const SBData = nodecg.Replicant('SBData', 'ipl-overlay-controls');
const NSTimerShown = nodecg.Replicant('NSTimerShown', 'ipl-overlay-controls');
const nextStageTime = nodecg.Replicant('nextStageTime', 'ipl-overlay-controls');
const maplists = nodecg.Replicant('maplists', 'ipl-overlay-controls');

const mapNameToImagePath = {
    "Ancho-V Games": "stages/S2_Stage_Ancho-V_Games.png",
    "Arowana Mall": "stages/S2_Stage_Arowana_Mall.png",
    "Blackbelly Skatepark": "stages/S2_Stage_Blackbelly_Skatepark.png",
    "Camp Triggerfish": "stages/S2_Stage_Camp_Triggerfish.png",
    "Goby Arena": "stages/S2_Stage_Goby_Arena.png",
    "Humpback Pump Track": "stages/S2_Stage_Humpback_Pump_Track.png",
    "Inkblot Art Academy": "stages/S2_Stage_Inkblot_Art_Academy.png",
    "Kelp Dome": "stages/S2_Stage_Kelp_Dome.png",
    "MakoMart": "stages/S2_Stage_MakoMart.png",
    "Manta Maria": "stages/S2_Stage_Manta_Maria.png",
    "Moray Towers": "stages/S2_Stage_Moray_Towers.png",
    "Musselforge Fitness": "stages/S2_Stage_Musselforge_Fitness.png",
    "New Albacore Hotel": "stages/S2_Stage_New_Albacore_Hotel.png",
    "Piranha Pit": "stages/S2_Stage_Piranha_Pit.png",
    "Port Mackerel": "stages/S2_Stage_Port_Mackerel.png",
    "Shellendorf Institute": "stages/S2_Stage_Shellendorf_Institute.png",
    "Shifty Station": "stages/S2_Stage_Shifty_Station.png",
    "Snapper Canal": "stages/S2_Stage_Snapper_Canal.png",
    "Starfish Mainstage": "stages/S2_Stage_Starfish_Mainstage.png",
    "Sturgeon Shipyard": "stages/S2_Stage_Sturgeon_Shipyard.png",
    "The Reef": "stages/S2_Stage_The_Reef.png",
    "Wahoo World": "stages/S2_Stage_Wahoo_World.png",
    "Walleye Warehouse": "stages/S2_Stage_Walleye_Warehouse.png",
    "Skipper Pavilion": "stages/S2_Stage_Skipper_Pavilion.png",
    "Unknown Map": "stages/low-ink-unknown-map.png"
};