import React, { useState } from 'react';
import Banner from 'react-js-banner';
import axios from 'axios';
import './youtube.css';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function YTChannelStats() {
  const [channel, setChannel] = useState('PewDiePie');
  const [loading, setLoading] = useState(true);
  const [yt_body, setInfo] = useState(null);

  React.useEffect(() => {
    console.log("Component drawn");
    return () => {
      console.log("Component removed");
    };
  }, []);

  const getResponse = async () => {
    try {
      const r = await axios.get('http://localhost:8080/v1/youtube/channel', {
        params: { channel: channel }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      console.log(body);
      return body;
    } catch (error) {
      console.log(error);
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    getResponse().then((res) => {
      setInfo(res);
      setLoading(false);
    });
  }

  return (

    <div className="App">
      <Banner title="YouTube Channel Stats" css={{ backgroundColor: "red" }} />
      <form onSubmit={HandleSubmit}>
        <label>
          Channel: <br />
          <input type="text" value={channel} onChange={e => setChannel(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {
        loading ? <Loader type="TailSpin" color="#00BFFF" height={20} width={20} /> : <p>
          Subscribers: {yt_body['subscribers']}<br />
          Total Views: {yt_body['view_count']}<br />
          Total Videos: {yt_body['video_count']}<br /><br />
          "{yt_body['description']}"<br /><br />
          <img src={yt_body['thumbnail']} alt="channel icon" /></p>
      }
    </div >
  );
}

export default YTChannelStats;