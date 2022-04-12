import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaLink, FaSignOutAlt } from 'react-icons/fa';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';
import { Logout, auth } from '../auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'; 

function LogoutAndRedirect() {
  Logout();
  console.log("Logout Button Clicked");
}

function Sidebar() {
  const [user, loading] = useAuthState(auth);

  let navigate = useNavigate();

  useEffect(() => {
    if (loading) { return; }
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <aside
    className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in">
    <div>
    <ProSidebar className='h-screen'>
      <SidebarHeader><p className='text-center text-5xl bg-blue-400 text-black'>Area</p></SidebarHeader>
    <Menu iconShape="square">
    <SubMenu title="Services" icon={<FaLink />}>
    <MenuItem> Youtube <Link to={'/services/youtube'} /></MenuItem>
    <MenuItem> Discord <Link to={'/services/discord'} /></MenuItem>
    <MenuItem> Spotify <Link to={'/services/spotify'} /></MenuItem>
    <MenuItem> Twitch <Link to={'/services/twitch'} /></MenuItem>
    <MenuItem> Google Translate <Link to={'/services/translate'} /></MenuItem>
    <MenuItem> Intra <Link to={'/services/intra'} /></MenuItem>
    <MenuItem> News <Link to={'/services/news'} /></MenuItem>
    <MenuItem> Weather <Link to={'/services/weather'} /></MenuItem>
    <MenuItem> Covid <Link to={'/services/covid'} /></MenuItem>
    </SubMenu>

    <SidebarFooter>
      <MenuItem icon={<FaSignOutAlt />}>
        <button onClick={() => LogoutAndRedirect()}>Log Out</button>
      </MenuItem>
    </SidebarFooter>
    </Menu>
    </ProSidebar>
    </div>
    </aside>
    );
  }

export default Sidebar;