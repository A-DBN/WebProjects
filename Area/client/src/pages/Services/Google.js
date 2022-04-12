import '../../index.css';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import { /*useEffect,*/ useState } from 'react';
import { SendTextToTranslate/*, isSubscribed */ } from '../../functions/ManageSubscriptions';
import Dropdown from 'react-dropdown';

export default function TranslatePage() {
    const [language, setLanguage] = useState('');
    const [text, setText] = useState('');

    const languages = [
        { value: 'af', label: 'Afrikaans' },
        { value: 'sq', label: 'Albanian' },
        { value: 'am', label: 'Amharic' },
        { value: 'ar', label: 'Arabic' },
        { value: 'hy', label: 'Armenian' },
        { value: 'az', label: 'Azerbaijani' },
        { value: 'eu', label: 'Basque' },
        { value: 'be', label: 'Belarusian' },
        { value: 'bn', label: 'Bengali' },
        { value: 'bs', label: 'Bosnian' },
        { value: 'bg', label: 'Bulgarian' },
        { value: 'ca', label: 'Catalan' },
        { value: 'ny', label: 'Chichewa' },
        { value: 'co', label: 'Corsican' },
        { value: 'hr', label: 'Croatian' },
        { value: 'cs', label: 'Czech' },
        { value: 'da', label: 'Danish' },
        { value: 'nl', label: 'Dutch' },
        { value: 'en', label: 'English' },
        { value: 'eo', label: 'Esperanto' },
        { value: 'et', label: 'Estonian' },
        { value: 'tl', label: 'Filipino' },
        { value: 'fi', label: 'Finnish' },
        { value: 'fr', label: 'French' },
        { value: 'fy', label: 'Frisian' },
        { value: 'gl', label: 'Galician' },
        { value: 'ka', label: 'Georgian' },
        { value: 'de', label: 'German' },
        { value: 'el', label: 'Greek' },
        { value: 'gu', label: 'Gujarati' },
        { value: 'ht', label: 'Haitian Creole' },
        { value: 'ha', label: 'Hausa' },
        { value: 'iw', label: 'Hebrew' },
        { value: 'hi', label: 'Hindi' },
        { value: 'hu', label: 'Hungarian' },
        { value: 'is', label: 'Icelandic' },
        { value: 'ig', label: 'Igbo' },
        { value: 'id', label: 'Indonesian' },
        { value: 'ga', label: 'Irish' },
        { value: 'it', label: 'Italian' },
        { value: 'ja', label: 'Japanese' },
        { value: 'jw', label: 'Javanese' },
        { value: 'kn', label: 'Kannada' },
        { value: 'kk', label: 'Kazakh' },
        { value: 'km', label: 'Khmer' },
        { value: 'ko', label: 'Korean' },
        { value: 'ku', label: 'Kurdish (Kurmanji)' },
        { value: 'ky', label: 'Kyrgyz' },
        { value: 'lo', label: 'Lao' },
        { value: 'la', label: 'Latin' },
        { value: 'lv', label: 'Latvian' },
        { value: 'lt', label: 'Lithuanian' },
        { value: 'lb', label: 'Luxembourgish' },
        { value: 'mk', label: 'Macedonian' },
        { value: 'mg', label: 'Malagasy' },
        { value: 'ms', label: 'Malay' },
        { value: 'ml', label: 'Malayalam' },
        { value: 'mt', label: 'Maltese' },
        { value: 'mi', label: 'Maori' },
        { value: 'mr', label: 'Marathi' },
        { value: 'mn', label: 'Mongolian' },
        { value: 'my', label: 'Myanmar (Burmese)' },
        { value: 'ne', label: 'Nepali' },
        { value: 'no', label: 'Norwegian' },
        { value: 'ps', label: 'Pashto' },
        { value: 'fa', label: 'Persian' },
        { value: 'pl', label: 'Polish' },
        { value: 'pt', label: 'Portuguese' },
        { value: 'pa', label: 'Punjabi' },
        { value: 'ro', label: 'Romanian' },
        { value: 'ru', label: 'Russian' },
        { value: 'sm', label: 'Samoan' },
        { value: 'gd', label: 'Scots Gaelic' },
        { value: 'sr', label: 'Serbian' },
        { value: 'st', label: 'Sesotho' },
        { value: 'sn', label: 'Shona' },
        { value: 'sd', label: 'Sindhi' },
        { value: 'si', label: 'Sinhala' },
        { value: 'sk', label: 'Slovak' },
        { value: 'sl', label: 'Slovenian' },
        { value: 'so', label: 'Somali' },
        { value: 'es', label: 'Spanish' },
        { value: 'su', label: 'Sundanese' },
        { value: 'sw', label: 'Swahili' },
        { value: 'sv', label: 'Swedish' },
        { value: 'tg', label: 'Tajik' },
        { value: 'ta', label: 'Tamil' },
        { value: 'te', label: 'Telugu' },
        { value: 'th', label: 'Thai' },
        { value: 'tr', label: 'Turkish' },
        { value: 'uk', label: 'Ukrainian' },
        { value: 'ur', label: 'Urdu' },
        { value: 'uz', label: 'Uzbek' },
        { value: 'vi', label: 'Vietnamese' },
        { value: 'cy', label: 'Welsh' },
        { value: 'xh', label: 'Xhosa' },
        { value: 'yi', label: 'Yiddish' },
        { value: 'yo', label: 'Yoruba' },
        { value: 'zu', label: 'Zulu' },
        ];

    return (
        <div className='bg-gray-800 grid-cols-2 gap-4 content-start flex flex-row min-h-screen h-full'>
        <div className="flex flex-no-wrap">
            <Sidebar />
            </div>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
            <div className='w-full h-full flex justify-center flex-col'>
            <div className='text-center text-6xl text-orange-400 mb-8 mt-10'>Translate</div>
            <div className='justify-center flex'><Link className='text-2xl py-4 px-2 justify-center text-white bg-blue-500 border-red-500 border-4 rounded' to='/services/discord'>Remember to invite the Discord bot AND to set your UID to get results !</Link></div>
            <div className='text-center mt-10'>
            <input className='w-96 text-center border-white border-4 text-lg rounded-2xl' name='text' type='text' placeholder='Text to translate' value={text} onChange={(e) => setText(e.target.value)} />
            <button className='bg-transparent w-36 ml-8 mt-2 mb-6 bg-orange-400 text-white-500 font-bold text-white py-2 px-4 border border-red-500 hover:border-transparent rounded ' onClick={() => SendTextToTranslate(text, language)}>Send</button>
            
            <br />
            </div>
            </div>
            <Dropdown className='text-white text-center mt-28 text-l border-4 border-white rounded bg-gray-800' options={languages} onChange={(e) => setLanguage(e.value)} value={language} placeholder='Select Language' />
            <br />            
        </div>
        </div>
        );
}