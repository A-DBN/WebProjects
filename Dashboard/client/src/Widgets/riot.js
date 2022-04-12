import React, { useState } from 'react';
import Banner from 'react-js-banner';
import axios from 'axios';
import './weather.css';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Riot() {
  const [item, setItem] = useState('Bottes');
  const [loading, setLoading] = useState(true);
  const [json_body, setBody] = useState(null);

  React.useEffect(() => {
    console.log("Component drawn");
    return () => {
      console.log("Component removed");
    };
  }, []);

  const getResponse = async () => {
    try {
      const r = await axios.get('http://localhost:8080/v1/riot/item', {
        params: { name: item }
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
      setBody(res);
      setLoading(false);
    });
  }

  return (

    <div className="App">
      <Banner title="League of Legends items" css={{ backgroundColor: "red" }} />
      <form onSubmit={HandleSubmit}>
        <label>
          City: <br />
          <input type="text" value={item} onChange={e => setItem(e.target.value)} />
        </label>
        <input type="submit" value="Update" />
      </form>
      {
        loading ? <Loader type="TailSpin" color="#00BFFF" height={20} width={20}/> : <p>
        Description: "{json_body['descriptions']}" <br /><br />
        Price: {json_body['gold']['base']} <br />
        Sells for: {json_body['gold']['sell']} <br />
        </p>
      }
    </div >
  );
}

export default Riot;