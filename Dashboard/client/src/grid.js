import React from 'react';
// Widgets
import YTChannelStats from './Widgets/youtube';
import GithubWidget from './Widgets/github';
import IntranetInfo from './Widgets/intra';
// Grid deps
import GridLayout from 'react-grid-layout'
import Banner from 'react-js-banner';
import './grid.css'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import CurrentWeather from './Widgets/weather';
import Riot from './Widgets/riot';

function WidgetGrid() {

  // const [newCounter, setNewCounter] = React.useState(0);
  const layout = [
    { i: 'Github', x: 0, y: 0, w: 3, h: 7, minW: 3, minH: 4, maxW: 4},
    { i: 'Youtube', x: 0, y: 5, w: 3, h: 9, minW: 3, minH: 9, maxW: 3 },
    { i: 'Intra', x: 3, y: 0, w: 3, h: 5, minW: 3, minH: 5, maxH: 6 },
    { i: 'WeatherCurrent', x: 3, y: 5, w: 3, h: 5, minW: 3 },
    { i: 'Riot', x: 6, y: 10, w: 3, h: 5, minW: 3 },
  ];

  // const addYTChannel = () => {
  //   console.log('add yt channel widget');
  //   layout.concat({ i: 'n' + newCounter, x: (layout.length * 2) % (12), w: 3, h: 4, minW: 3, minH: 4 });
  //   setNewCounter(newCounter + 1);
  // }

  return (
    <div>
      <Banner title="Dashboard" css={{ backgroundColor: "white" }} />
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
      <div id='Widget' key='Github'><GithubWidget /></div>
      <div id='Widget' key='Youtube'><YTChannelStats /></div>
      <div id='Widget' key='Intra'><IntranetInfo /></div>
      <div id='Widget' key='WeatherCurrent'><CurrentWeather /></div>
      <div id='Widget' key='Riot'><Riot/></div>
    </GridLayout>
    </div>
  );
}

export default WidgetGrid;