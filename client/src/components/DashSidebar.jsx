import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/user.slice.js";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();

  const [tab, setTab] = useState("");

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method : 'POST'
      });
      const data = await res.json();

      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to={"/dashboard?tab=profile"}>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
            <Sidebar.Item
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor={"dark"}
              className="cursor-pointer"
              active={tab === "profile"}
              as={'div'}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiOutlineUserGroup}
                as='div'
              >
                Users
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item
                active={tab === 'comments'}
                icon={HiAnnotation}
                as='div'
              >
                Comments
              </Sidebar.Item>
            </Link>
          </>
          )}
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
