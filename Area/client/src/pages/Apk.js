import '../index.css'
import apk from '../mobile/client.apk'

export default function ApkPage(){
    return(
        <div className='flex h-screen'>
        <div className='m-auto'>
        <a href={apk} download className='text-3xl bg-blue-500 text-white rounded border-black px-8 py-6 text-center align-middle'> Download APK </a>
        </div>
        </div>
    );
}