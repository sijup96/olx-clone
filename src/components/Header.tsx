import { useEffect, useState } from 'react'
import SearchIcon from '../assets/SearchIcon';
import ArrowIcon from '../assets/ArrowIcon';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import UserComponent from './UserComponent';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')
  useEffect(() => {
    const userInfo = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        setUserName(user.displayName || '')
      }
    })
    return () => userInfo()
  }, [])
  const signOutUser = () => {
    signOut(auth).then(() => setLoggedIn(!loggedIn)).catch((error) => { console.error(error); }
    )
  }
  return (
    <>
      <div className="px-2.5 py-4 bg-cyan-50">
        <div className="bg-cyan-50 flex relative items-center px-5 justify-between">

          <img
            className="w-12 h-7"
            src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Symbol.png"
            alt="olx_logo"
          />


          <div className="flex h-10 items-center space-x-4 bg-white">
            <SearchIcon />
            <input
              type="text"
              placeholder="India"
              className="h-10 outline-none"
            />
            <ArrowIcon />
          </div>
          <div className="w-1/2 flex bg-white">
            <input
              className="w-full ml-3  h-10 outline-none"
              type="text"
              placeholder="Find cars, mobiles & more.."
            />
            <div className="flex items-center justify-center bg-green-950 px-2">
              <SearchIcon color="white" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="font-bold text-green-950 ">ENGLISH</p>
            <ArrowIcon />
          </div>
          <div>{loggedIn && <UserComponent userName={userName} />}</div>
          <div className="flex items-center">
            {loggedIn ? (
              <button
                onClick={signOutUser}
                className="font-bold rounded bg-green-950 p-1 text-white"
              >
                LogOut
              </button>
            ) : (
              <Link to="/login" className="font-bold text-green-950 underline">
                Login
              </Link>
            )}
          </div>
          <div className="flex items-center">
            <Link
              to="/sale-product"
              className="font-bold text-md  rounded-3xl bg-white py-1 px-3  border-blue-500 border-solid border-4"
            >
              +SELL
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
