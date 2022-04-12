import '../../index.css';
import Sidebar from '../sidebar';
import Switch from 'react-switch';
import { /*useEffect,*/ useState } from 'react';
import { SubscribeToDiscord, SubscribeToAction, UnsubscribeFromAction, UnsubscribeFromService/*, isSubscribed */ } from '../../functions/ManageSubscriptions';

export default function DiscordPage() {
    const [id, setId] = useState('');
    const [ping, setPing] = useState(false);

    function togglePing() {
        setPing(!ping);
        ping ? UnsubscribeFromAction('discord', 'new_mention').catch(console.error) : SubscribeToAction('discord', 'new_mention').catch(console.error);
    }

    return (
        <div className='bg-gray-800 grid-cols-2 gap-4 content-start flex flex-row min-h-screen'>
        <div className="flex flex-no-wrap">
        <Sidebar />
        </div>
        <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        <div className='w-full h-full flex justify-center flex-col'></div>
        <div className='text-center text-6xl text-blue-600 mb-8'>Discord</div>
        
        <div className='flex justify-center flex-col mb-5'>
        <div className='self-center'>
        <Switch className='self-center ml-16' checked={ping} onChange={() => togglePing()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#5865F2' /> 
        <p className='text-white text-xl'>Mail on New Mention</p>
        </div>

        <a className='bg-blue-600 mt-5 px-6 py-4 text-center self-center rounded text-white font-bold hover:bg-blue-700 hover:border-black' href='https://discord.com/api/oauth2/authorize?client_id=948214284842840064&permissions=8&scope=bot' target="_blank" rel='noreferrer'>
                Invite the bot</a>
        </div>

        <div className='text-center '>
        <input className='w-96 text-center border-white border-4 rounded-2xl' name='id' type='text' placeholder='Discord user ID' value={id} onChange={(e) => setId(e.target.value)} />
        <br />
        <button className='bg-transparent w-36 mr-6 mt-2 bg-blue-600 text-white-500 font-bold text-white py-2 px-4 border border-blue-600 hover:border-black hover:bg-blue-700 rounded' onClick={() => SubscribeToDiscord(id)}>Subscribe</button>
        {/* {!subscribed ?  */}
        {/* null : */}
        <button className='bg-transparent w-36 bg-gray-600 text-white font-semibold hover:bg-gray-700 py-2 px-4 border border-blue-600 hover:border-black rounded' onClick={() => UnsubscribeFromService('discord')}>Unsubscribe</button>
        {/* } */}
        </div>
        </div>
        </div>
    );
}