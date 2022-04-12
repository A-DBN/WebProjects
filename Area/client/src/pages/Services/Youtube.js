import '../../index.css';
import Sidebar from '../sidebar';
import Switch from 'react-switch';
import { /*useEffect,*/ useState } from 'react';
import { SubscribeToChannel, SubscribeToAction, UnsubscribeFromAction, UnsubscribeFromService/*, isSubscribed */ } from '../../functions/ManageSubscriptions';

export default function YoutubePage() {
    const [channel, setChannel] = useState('');
    const [milestone, setMilestone] = useState(false);
    const [newvid, setNewvid] = useState(false);
    const [isChannelValid, setIsChannelValid] = useState(false);

    function checkSetChannel(input) {
        setChannel(input);
        const regexUser = new RegExp(/(https?:\/\/(.+?\.)?youtube\.com\/user\/([A-Za-z0-9\-._~:?#[\]@!$&'()*+,;=]*)?)/gm);
        const regexC = new RegExp(/(https?:\/\/(.+?\.)?youtube\.com\/c\/([A-Za-z0-9\-._~:?#[\]@!$&'()*+,;=]*)?)/gm);
        const regexChannel = new RegExp(/(https?:\/\/(.+?\.)?youtube\.com\/channel\/([A-Za-z0-9\-._~:?#[\]@!$&'()*+,;=]*)?)/gm);
        if (regexUser.test(input) === true || regexC.test(input) === true || regexChannel.test(input) === true) {
            setIsChannelValid(true);
        } else {
            setIsChannelValid(false);
        }
    }

    function toggleMilestone() {
        setMilestone(!milestone);
        milestone ? UnsubscribeFromAction('youtube', 'milestone').catch(console.error) : SubscribeToAction('youtube', 'milestone').catch(console.error);
    }

    function toggleNewvid() {
        setNewvid(!newvid);
        newvid ? UnsubscribeFromAction('youtube', 'new_video').catch(console.error) : SubscribeToAction('youtube', 'new_video').catch(console.error);
    }


return (
<div className='bg-gray-800 grid-cols-2 gap-4 content-start flex flex-row min-h-screen'>
   <div className="flex flex-no-wrap">
   <Sidebar />
   </div>
   <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
    <div className='w-full h-full flex justify-center flex-col'>
   <div className='text-center text-6xl text-red-500 mb-8'>Youtube</div>
   
       <div className='self-center'>
       <Switch className='self-center ml-12' checked={milestone} onChange={() => toggleMilestone()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#ef4444' /> 
       <p className='text-white text-xl'>Milestone Updates</p>
       </div>
       <div className='self-center'>
       <Switch className='self-center ml-11' checked={newvid} onChange={() => toggleNewvid()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#ef4444' /> 
       <p className='text-white text-xl'>New Video Alerts</p>
       </div>
       </div>
   <div className='text-center mt-10'>
       <input className='w-96 text-center border-white border-4 rounded-2xl' name='channel' type='text' placeholder='channel URL' value={channel} onChange={(e) => checkSetChannel(e.target.value)} />
       <br />
       <button className='bg-transparent w-36 mr-6 mt-2 bg-red-500 text-white-500 font-bold text-white py-2 px-4 border border-red-500 hover:border-transparent rounded disabled:cursor-not-allowed disabled:bg-red-700' disabled={!isChannelValid} onClick={() => SubscribeToChannel('youtube', channel)}>Subscribe</button>
       <button className='bg-transparent w-36 bg-gray-600 text-white font-semibold hover:text-red-400 py-2 px-4 border border-red-500 hover:border-transparent rounded' onClick={() => UnsubscribeFromService('youtube')}>Unsubscribe</button>
       </div>
       </div>
   </div>
);
}