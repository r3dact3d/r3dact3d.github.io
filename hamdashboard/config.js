const topBarCenterText = `W5AWW - EM11hn`;
// Menu items
// Structure is as follows HTML Color code, Option, target URL, scaling 1=Original Size, side (optional, nothing is Left, "R" is Right)
// The values are [color code, menu text, target link, scale factor, side],
// add new lines following the structure for extra menu options. The comma at the end is important!
const aURL = [
  ["add10d", "BACK", "#", "1"],
  ["add10d", "BACK", "#", "1", "R"],
  ["ff9100", "REFRESH", "#", "1"],
  ["0dd1a7", "HELP", "#", "1"],

  [
    "2196F3",
    "CLUBLOG",
    "https://clublog.org/livestream/W5AWW",
    "1.7",
  ],

  [
    "2196F3",
    "CONTEST",
    "https://www.contestcalendar.com/fivewkcal.html",
    "1",
  ],

  [
    "2196F3",
    "DX CLUSTER",
    "https://dxcluster.ha8tks.hu/map/",
    "1",
  ],

  [
    "2196F3",
    "POTA",
    "https://pota.app",
    "1",
  ],
  [
    "2196F3",
    "Band Plan",
    "https://kd4atw.org/wp-content/uploads/2012/05/band_plan.png",
    "1",
  ],
  [
    "2196F3",
    "VHF",
    "https://vhf.dxview.org/",
    "1",
  ],
  [
    "2196F3",
    "APRS",
    "https://aprs.fi/#!z=11&call=a%2FW5AWW-4&others=1&timerange=3600&tail=3600",
    "1",
  ],
  ["2196F3", "WINLINK", "https://cms.winlink.org:444/maps/propagation.aspx", "1"],
  [
    "2196F3",
    "ADSB",
    "https://globe.adsbexchange.com/",
    "1",
  ],
  

  //["2196F3", "PISTAR", "http://pi-star.local/", "1.2"],

 
  // Right side slideout
  [
    "2196F3",
    "TIME.IS",
    "https://time.is/",
    "1",
    "R",
  ],
  [
    "2196F3",
    "TRAFFIC",
    "https://drivetexas.org/?ll=-97.3637,31.5485&z=12",
    "1",
    "R",
  ],
  [
    "2196F3",
    "TRAFFIC CAMS",
    "https://its.txdot.gov/its/District/WAC/cameras",
    "1",
    "R",
  ],
  [
    "2196F3",
    "SPACEX",
    "https://www.youtube.com/embed/cOmmvhDQ2HM?autoplay=1",
    "1", 
    "R"
  ],
  ["2196F3", "Stuff In Space", "https://stuffin.space/", "1","R"],
  [
    "2196F3",
    "WEATHER",
    "https://ambientweather.net/dashboard/65fa92cdc595aab3229199dac16cadcf",
    "1",
    "R",
  ],
  [
    "FF000F",
    "Wx Alerts",
    "https://alerts.weather.gov/search?zone=TXC309",
    "1",
    "R",
    // ,TXC035"; - Bosque
    // ,TXC217"; - Hill
  ],
[
  "2196F3",
  "WINDS",
  "https://earth.nullschool.net/#current/wind/surface/level/orthographic=-100.96,32.73,1821",
  "1",
  "R",
],
[
  "2196F3",
  "FLOODS",
  "https://water.noaa.gov/?wfo=fwd#@=-97.6227301,31.5983166,8.8949433&b=topographic&g=obsFcst,1!1!1!1!1!1!1!1!1!1!1!1!1!1!1!0!0!0!0!0,0.5,1!1!1!1!0,0,0&ab=0,0,#D94B4A,1,1,1,#cccccc,1,0,0,#B243B1,1,0,0,#98E09A,1&a=all,0.35&s=0,0,0.9,0.9&n=false,#72afe9,0.9,0,0.9,0,0.9&p=false,0.75,0,7,0,1,2024,6,17,0&d=0,0,1,1,1,1,1,1,#006EFF,1,#006EFF,1,#006EFF&q=",
  "1",
  "R",
],



];

// Dashboard items
// Structure is Title, Image Source URL
// [Title, Image Source URL],
// the comma at the end is important!
// You can't add more items because there are only 12 placeholders on the dashboard
// but you can replace the titles and the images with anything you want.
const aIMG = [
  [
    "RADARS",
    "https://radar.weather.gov/ridge/standard/CONUS_loop.gif",
    "https://radar.weather.gov/ridge/standard/KGRK_loop.gif",
    "https://radar.weather.gov/ridge/standard/KFWS_loop.gif",
  ],
  [
    "SATELLITES",
    "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/GEOCOLOR/GOES16-CONUS-GEOCOLOR-625x375.gif",
    "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/sp/GEOCOLOR/300x300.jpg",
  ],
  
  [
    "FORECASTS",
	  "https://www.wpc.ncep.noaa.gov/noaa/noaa.gif",
    "http://www.weather.gov/images/fwd/graphicast/image3.jpg",
    "http://www.weather.gov/images/fwd/graphicast/image7.jpg",
    "http://www.weather.gov/images/fwd/graphicast/image2.jpg",
  ],

  [
    "LOCAL",
    "https://tfsfrp.tamu.edu/wildfires/DecBan.png",
    "https://droughtmonitor.unl.edu/data/png/current/current_tx_trd.png",
    "https://www.weather.gov/images/fwd/drought/latestdmtx.png",
  ],
  [
    "LIGHTNING",
    "https://images.lightningmaps.org/blitzortung/america/index.php?animation=usa",
    "https://www.blitzortung.org/en/Images/image_b_tx.png",
  ],
  [
    "Hepburn Tropo",
    "https://www.dxinfocentre.com/tr_map/fcst/car006.png?latest",
  ],
  [
    "MAPS",
    "https://www.mapability.com/ei8ic/maps/ARRL_RAC_Sections_2023_1254x969.png",
    "https://www.mapability.com/ei8ic/maps/USA_Call_Areas_1652.png",
    "https://www.mapability.com/ei8ic/maps/CQ_Zones_02.png",

  ],
  [
    "ISS & RS-44 POSITION",
    "https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544",
    "https://www.heavens-above.com/orbitdisplay.aspx?icon=default&width=600&height=300&mode=M&satid=44909",
  ],
  [
    "PSK",
    "https://pskreporter.info/pskmap.html?preset&callsign=w5aww&timerange=86400&blankifnone=1&mapCenter=38.831322926667525,-94.73750089830887,4.6750794820546435",
  ],

  [
    "HF CONDITIONS",
    "https://prop.kc2g.com/renders/current/mufd-normal-now.svg",
    "https://www.timeanddate.com/scripts/sunmap.php?iso=now",
    "https://www.sws.bom.gov.au/Images/HF%20Systems/Global%20HF/Ionospheric%20Map/WorldIMap.gif",
    "https://services.swpc.noaa.gov/images/animations/d-rap/global/d-rap/latest.png",
  ],

  ["10M PROPAGATION", "https://www.tvcomm.co.uk/g7izu/Autosave/NA_ES_AutoSave.JPG"],

  [
    "HF PROPAGATION",
    "https://www.hamqsl.com/solar101vhf.php",
    "https://www.hamqsl.com/solar100sc.php",
    "https://www.hamqsl.com/solarpich.php",
  ],
];
