import React, { useState } from 'react';
import Banner from 'react-js-banner';
import axios from 'axios';
import Select from 'react-select';
import './github.css';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function GithubInfos() {
  const [user, setUser] = useState('KaniDev');
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [json_resp, setResp] = useState(null);
  const searchOptions = [
    {value: 'all', label: 'All'},
    {value: 'owner', label: 'Owned only'},
    {value: 'member', label: 'Member only'},
  ];

  React.useEffect(() => {
    console.log("Component drawn");
    return () => {
      console.log("Component removed");
    };
  }, []);

  const getResponse = async () => {
    try {
      const r = await axios.get('http://localhost:8080/v1/github/userRepository', {
        params: { user: user, type: type, per_page: 30 }
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
      setResp(res);
      setLoading(false);
    });
  }

  const ListRepositories = () => {
    return json_resp.map((repo) => <li><a rel="noreferrer" target="_blank" href={'https://github.com/' + repo['full_name']}>{repo['name']}</a></li>);
  }

  return (

    <div className="App">
      <Banner title="Github repositories" css={{ backgroundColor: "grey" }} />
      <form onSubmit={HandleSubmit}>
        <label>
          Username: <br />
          <input type="text" value={user} onChange={e => setUser(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Select styles={{width: 1}} options={searchOptions} onChange={e => setType(e.value)} />

      {
        loading ? <Loader type="TailSpin" color="#00BFFF" height={20} width={20} /> : <p>
        List of repositories: <br />
        <ListRepositories />
        </p>
      }
    </div >
  );
}

export default GithubInfos;