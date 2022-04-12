import '../../index.css';
import Sidebar from '../sidebar';
import Switch from 'react-switch';
import { /*useEffect,*/ useState } from 'react';
import { SubscribeToWeather, SubscribeToAction, UnsubscribeFromAction, UnsubscribeFromService } from '../../functions/ManageSubscriptions';

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weather_change, setWeatherChange] = useState(false);
    const [ip_change, setIpChange] = useState(false);

    function toggleWeatherChange() {
        setWeatherChange(!weather_change);
        weather_change ? UnsubscribeFromAction('weather', 'weather_change').catch(console.error) : SubscribeToAction('weather', 'weather_change').catch(console.error);
    }

    function toggleIpChange() {
        setIpChange(!ip_change);
        ip_change ? UnsubscribeFromAction('weather', 'ip_change').catch(console.error) : SubscribeToAction('weather', 'ip_change').catch(console.error);
    }

    return (
        <div className='bg-gray-800 grid-cols-2 gap-4 content-start flex flex-row min-h-screen'>
        <div className="flex flex-no-wrap">
        <Sidebar />
        </div>
        <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
            <div className='w-full h-full flex flex-col'></div>
        <div className='text-center text-6xl text-yellow-400 mb-8'>Weather</div>
        
        <div className='flex justify-center flex-col'>
        <div className='self-center'>
            <Switch className='self-center ml-12' checked={weather_change} onChange={() => toggleWeatherChange()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#eab308' />
        <p className='text-white text-xl'>Weather Changes</p>
        </div>

        <div className='self-center'>
            <Switch className='self-center ml-5' checked={ip_change} onChange={() => toggleIpChange()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#eab308' />
        <p className='text-white text-xl'>IP changes</p>
        </div>
        </div>

        <div className='text-center '>
        <input className='w-96 text-center border-white border-4 rounded-2xl' name='city' type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
        <br />
        <button className='bg-transparent w-36 mr-6 mt-2 bg-yellow-500 text-black font-medium py-2 px-4 border border-black hover:border-transparent rounded' onClick={() => SubscribeToWeather(city)}>Subscribe</button>
        {/* {!subscribed ?  */}
        {/* null : */}
        <button className='bg-transparent w-36 bg-gray-600 text-white font-semibold hover:text-red-400 py-2 px-4 border border-red-500 hover:border-transparent rounded' onClick={() => UnsubscribeFromService('weather')}>Unsubscribe</button>
        {/* } */}
        </div>
        </div>
        </div>
    );
}