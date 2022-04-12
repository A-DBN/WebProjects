import '../../index.css';
import Sidebar from '../sidebar';
import Switch from 'react-switch';
import { /*useEffect,*/ useState } from 'react';
import { SubscribeToAction, UnsubscribeFromService, UnsubscribeFromAction, SubscribeToServiceNews } from '../../functions/ManageSubscriptions';

export default function NewsPage() {
    const [subscribed, setIsSubscribed] = useState(false);
    const [keyword, setKeyword] = useState('');

    function toggleSubscription() {
        setIsSubscribed(!subscribed);
        subscribed ? UnsubscribeFromAction('news', 'new_news').catch(console.error) : SubscribeToAction('news', 'new_news').catch(console.error);
    }

    return (
      <div className='bg-gray-800 grid-cols-2 gap-4 content-start flex flex-row min-h-screen'>
      <div className="flex flex-no-wrap">
        <Sidebar />
        </div>
        <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
            <div className='w-full h-full flex justify-center flex-col'>
        <div className='text-center mt-20'>
        <div className='text-center text-6xl text-blue-500 mb-8'>News</div>
        <input className='w-96 text-center border-white border-4 rounded-2xl mb-4' name='keyword' type='text' placeholder='Topic keyword' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <br />

        <div className='flex justify-center flex-col'>
        <div>
        <Switch className='justify-center' checked={subscribed} onChange={() => toggleSubscription()} checkedIcon={false} uncheckedIcon={false} offColor='#767577' onColor='#3b83f6' /> 
        <p className='text-white text-xl'>Get Daily News</p>
        </div>
        </div>
        <br />
        <button className='bg-transparent w-36 mr-6 bg-blue-500 text-white-500 font-bold text-white py-2 px-4 border border-blue-500 hover:border-black hover:bg-blue-600 rounded disabled:cursor-not-allowed disabled:bg-blue-900 disabled:border-blue-500'  disabled={keyword === '' ? true : false} onClick={() => SubscribeToServiceNews(keyword)}>
          Apply
        </button>
        {/* {!subscribed ?  */}
        {/* null : */}
        <button className='bg-transparent w-36 bg-gray-600 hover:text-blue-500 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={() => UnsubscribeFromService('news')}>
          Disable
        </button>
        {/* } */}
        </div>
        </div>
        </div>
    </div>
    );
}