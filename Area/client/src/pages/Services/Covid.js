import '../../index.css';
import Sidebar from '../sidebar';
import { /*useEffect,*/ useState } from 'react';
import { SubscribeToAction, UnsubscribeFromAction, SubscribeToCovid, UnsubscribeFromService/*, isSubscribed */ } from '../../functions/ManageSubscriptions';
import Dropdown from 'react-dropdown';
import Switch from 'react-switch';

export default function CovidPage() {
    const [tracker, setTracker] = useState('');
    const [region, setRegion] = useState('');

    const regions = [
        { label: 'Auvergne-Rhône-Alpes', value: 'Auvergne et Rhône-Alpes' },
        { label: 'Bourgogne-Franche-Comté', value: 'Bourgogne et Franche-Comté' },
        { label: 'Bretagne', value: 'Bretagne' },
        { label: 'Centre-Val de Loire', value: 'Centre-Val de Loire' },
        { label: 'Corse', value: 'Corse' },
        { label: 'Grand Est', value: 'Grand Est' },
        { label: 'Île-de-France', value: 'Île-de-France'},
        { label: 'Hauts-de-France', value: 'Hauts-de-France' },
        { label: 'Normandie', value: 'Normandie' },
        { label: 'Nouvelle-Aquitaine', value: 'Nouvelle Aquitaine' },
        { label: 'Occitanie', value: 'Occitanie'},
        { label: 'Pays de la Loire', value: 'Pays de la Loire'},
        { label: 'Provence-Alpes-Côte d\'Azur', value: 'Provence-Alpes-Côte d\'Azur' },
        { label: 'Guadeloupe', value: 'Guadeloupe' },
        { label: 'Martinique', value: 'Martinique' },
        { label: 'Guyane', value: 'Guyane' },
        { label: 'Réunion', value: 'Réunion' },
        { label: 'Mayotte', value: 'Mayotte' },
    ];

      function toggleTracker() {
        setTracker(!tracker);
        tracker ? UnsubscribeFromAction('covid', 'tracker').catch(console.error) : SubscribeToAction('covid', 'tracker').catch(console.error);
      }

    return (
      <div className='bg-gray-800 grid-cols-2 gap-4 content-start flex flex-row min-h-screen'>
      <div className="flex flex-no-wrap">   
            <Sidebar />
            </div>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
    <div className='w-full h-full flex justify-center flex-col'></div>
            <div className='text-center text-6xl text-red-700 mb-8'>Covid</div>

            <div className='flex justify-center flex-col'>
            <div className='self-center'>
            <Switch className='self-center ml-12' checked={tracker} onChange={() => toggleTracker()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#ef4444' /> 
            <p className='text-white text-xl'>Tracker Updates</p>
            </div>
            </div>

            <Dropdown className='text-white text-center mt-2 text-l border-4 border-white rounded' options={regions} onChange={(e) => setRegion(e.value)} value={region} placeholder='Select Region' />
            <br />
            
            <div className='self-center text-center'>
            <button className='bg-transparent w-36 mr-10 bg-red-500 text-white-500 font-bold text-white py-4 px-4 border border-red-500 hover:bg-red-700 hover:border-black rounded' onClick={() => SubscribeToCovid(region)}>Send</button>
            <button className='bg-transparent w-36 ml-10 bg-red-500 text-white-500 font-bold text-white py-4 px-4 border border-red-500 hover:border-transparent hover:bg-gray-500 rounded' onClick={() => UnsubscribeFromService('covid')}>Unsubscribe</button>
            </div>
            </div>
        </div>
        );
}