import '../../index.css';
import Sidebar from '../sidebar';
import { /*useEffect,*/ useState } from 'react';
import Switch from 'react-switch';
import { SubscribeToChannel, UnsubscribeFromService, SubscribeToAction, UnsubscribeFromAction/*, isSubscribed */ } from '../../functions/ManageSubscriptions';

export default function TwitchPage() {
    const [channel, setChannel] = useState('');
    const [milestone, setMilestone] = useState(false);
    const [liveon, setLiveon] = useState(false);

    function toggleMilestone() {
        setMilestone(!milestone);
        milestone ? UnsubscribeFromAction('twitch', 'milestone').catch(console.error) : SubscribeToAction('twitch', 'milestone').catch(console.error);
    }

    function toggleLiveon() {
        setLiveon(!liveon);
        liveon ? UnsubscribeFromAction('twitch', 'live_on').catch(console.error) : SubscribeToAction('twitch', 'live_on').catch(console.error);
    }


    return (
<div className='bg-gray-800 grid-cols-2 gap-4 content-start flex flex-row min-h-screen'>
   <div className="flex flex-no-wrap">
   <Sidebar />
   </div>
   <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
    <div className='w-full h-full flex justify-center flex-col'>
   <div className='text-center text-6xl text-purple-500 mt-6'>Twitch</div>
   
       <div className='self-center'>
       <Switch className='self-center ml-14' checked={milestone} onChange={() => toggleMilestone()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#6441a5' /> 
       <p className='text-white text-xl'>Milestone Updates</p>
       </div>
       <div className='self-center'>
       <Switch className='self-center ml-12' checked={liveon} onChange={() => toggleLiveon()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#6441a5' /> 
       <p className='text-white text-xl'>Now Live Alerts</p>
       </div>
       </div>
   <div className='text-center mt-10'>
       <input className='w-96 text-center border-white border-4 rounded-2xl' name='channel' type='text' placeholder='Channel Name' value={channel} onChange={(e) => setChannel(e.target.value)} />
       <br />
       <button className='bg-transparent w-36 mr-6 mt-2 bg-purple-500 text-white-500 font-bold text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded' onClick={() => SubscribeToChannel('twitch', channel)}>Subscribe</button>
       <button className='bg-transparent w-36 bg-gray-600 text-white font-semibold hover:text-purple-400 py-2 px-4 border border-purple-500 hover:border-transparent rounded' onClick={() => UnsubscribeFromService('twitch')}>Unsubscribe</button>
       </div>
       </div>
       </div>
    );
}