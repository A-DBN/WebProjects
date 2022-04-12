import React, { useState } from 'react';
import Banner from 'react-js-banner';
import axios from 'axios';
import './intra.css';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function IntranetInfo() {
  const [link, setLink] = useState('autologin');
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
      const r = await axios.get('http://localhost:8080/v1/intra/user', {
        params: { autologin: link }
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
      <Banner title="Epitech Intranet infos" css={{ backgroundColor: "#015ca2" }} />
      <form onSubmit={HandleSubmit}>
        <label>
          Paste autologin link here <br />
          <input type="text" value={link} onChange={e => setLink(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {
        loading ? <Loader type="TailSpin" color="#00BFFF" height={20} width={20} /> : <p>
        Promotion: {json_body['promo']}<br />
        City: {json_body['city']}<br />
        Credits: {json_body['credits']}<br />
        GPA: {json_body['gpa']}<br />
        Last week logtime: {json_body['logtime']}
        </p>
      }
    </div >
  );
}

export default IntranetInfo;