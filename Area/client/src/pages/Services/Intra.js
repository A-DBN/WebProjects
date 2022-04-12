import '../../index.css';
import Sidebar from '../sidebar';
import Switch from 'react-switch';
import { /*useEffect,*/ useState } from 'react';
import { SubscribeToAction, subscribeToIntra, UnsubscribeFromService, UnsubscribeFromAction } from '../../functions/ManageSubscriptions';

export default function IntraPage() {
    const [autologin, setAutologin] = useState('');
    const [subGpa, setSubGpa] = useState(true);
    const [subNetsoul, setSubNetsoul] = useState(true);
    const [subCredits, setSubCredits] = useState(true);
    const [subActivity, setSubActivity] = useState(true);
    const [autologinValid, setAutologinValid] = useState(false);
    const regex = new RegExp(/(https?:\/\/(.+?\.)?intra\.epitech\.eu\/auth-([A-Za-z0-9\-._~:?#[\]@!$&'()*+,;=]*)?)/gm);

    function setCheckAutologin(value) {
        setAutologin(value);
        setAutologinValid(regex.test(value));
      }

    // const [subscribed, setIsSubscribed] = useState(true);

    // useEffect(() => {
      // const getSubscriptionStatus = async () => {
        // const status = await isSubscribed('youtube');
        // setIsSubscribed(status);
      // }
      // getSubscriptionStatus().catch(console.error);
    // }, []);

    function sendSubscription(){
      subGpa ? SubscribeToAction('intra', 'gpa').catch(console.error) : UnsubscribeFromAction('intra', 'gpa').catch(console.error);
      subNetsoul ? SubscribeToAction('intra', 'netsoul').catch(console.error) : UnsubscribeFromAction('intra', 'netsoul').catch(console.error);
      subCredits ? SubscribeToAction('intra', 'credits').catch(console.error) : UnsubscribeFromAction('intra', 'credits').catch(console.error);
      subActivity ? SubscribeToAction('intra', 'alerts').catch(console.error) : UnsubscribeFromAction('intra', 'alerts').catch(console.error);
      
      subscribeToIntra(autologin).catch(console.error);
    }

    return (
      <div className='bg-gray-800 grid-cols-2 gap-4 content-start flex flex-row min-h-screen'>
      <div className="flex flex-no-wrap">
        <Sidebar />
        </div>
        <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
            <div className='w-full h-full flex justify-center flex-col'>
        <div className='text-center mt-20'>
        <div className='text-center text-6xl text-blue-500 mb-8'>Epitech Intra</div>
        <input className='w-96 text-center border-white border-4 rounded-2xl mb-4' name='channel' type='text' placeholder='Autologin Link' value={autologin} onChange={(e) => setCheckAutologin(e.target.value)} />
        <br />

        <div className='flex justify-center flex-col'>

        <div className='flex justify-center flex-row'>
        <div>
        <Switch className='pl-3' checked={subGpa} onChange={() => setSubGpa(!subGpa)} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#3b83f6' />
        <p className='text-white text-xl pl-2'>GPA updates</p>
        </div>
        <div className='ml-20'>
        <Switch className='' checked={subNetsoul} onChange={() => setSubNetsoul(!subNetsoul)} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#3b83f6' /> 
        <p className='text-white text-xl'>Daily logtime</p>
        </div>
        </div>
        
        <div className='flex justify-center flex-row'>
        <div>
        <Switch className='pl-2' checked={subCredits} onChange={() => setSubCredits(!subCredits)} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#3b83f6' />  
        <p className='text-white text-xl pl-2'>New credits</p> 
        </div>
        <div className="ml-16 pl-4">
        <Switch checked={subActivity} onChange={() => setSubActivity(!subActivity)} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#3b83f6' />
        <p className='text-white text-xl'>New activity</p>
        </div>
        </div>
        </div>
        <br />
        <button className='bg-transparent w-36 mr-6 bg-blue-500 text-white-500 font-bold text-white py-2 px-4 border border-blue-500 hover:border-black hover:bg-blue-600 rounded disabled:cursor-not-allowed disabled:bg-blue-900 disabled:border-blue-500' disabled={!autologinValid} onClick={() => sendSubscription()}>
          Apply
        </button>
        {/* {!subscribed ?  */}
        {/* null : */}
        <button className='bg-transparent w-36 bg-gray-600 hover:text-blue-500 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={() => UnsubscribeFromService('intra')}>
          Disable
        </button>
        {/* } */}
        </div>
        </div>
    </div>
    </div>
    );
}