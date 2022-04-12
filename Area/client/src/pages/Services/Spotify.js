import '../../index.css';
import Sidebar from '../sidebar';
import { /*useEffect,*/ useState } from 'react';
import { SubscribeToAction, UnsubscribeFromAction, SubscribeToService, UnsubscribeFromService } from '../../functions/ManageSubscriptions';
import Switch from 'react-switch';

export default function SpotifyPage() {
    const [trendnews, setTrendnews] = useState('');

    function toggleTrendnews() {
        setTrendnews(!trendnews);
        trendnews ? UnsubscribeFromAction('spotify', 'new_trend').catch(console.error) : SubscribeToAction('spotify', 'new_trend').catch(console.error);
    }

    return (
        <div className='bg-gray-800 grid-cols-2 gap-4 content-start flex flex-row min-h-screen'>
            <div className="flex flex-no-wrap">
            <Sidebar />
            </div>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
            <div className='w-full h-full flex justify-center flex-col'>
            <div className='text-center text-6xl text-green-500 mb-8'>Spotify</div>

            <div className='flex justify-center flex-col'>
            <div className='self-center'>
            <Switch className='self-center ml-12' checked={trendnews} onChange={() => toggleTrendnews()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#1DB954' /> 
            <p className='text-white text-xl'>New Trend Alerts</p>
            </div>
            </div></div>

            <div className='self-center text-center'>
            <button className='bg-transparent w-36 mr-6 bg-green-500 text-white-500 font-bold text-white py-3 px-4 border border-green-500 hover:bg-green-600 hover:border-black rounded' onClick={() => SubscribeToService('spotify')}>Subscribe</button>
            <button className='bg-transparent w-36 ml-6 bg-green-500 text-white-500 font-bold text-white py-3 px-4 border border-green-500 hover:border-transparent hover:bg-gray-500 rounded' onClick={() => UnsubscribeFromService('spotify')}>Unsubscribe</button>
            </div></div>
        </div>
        );
}