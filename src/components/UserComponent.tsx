import React from 'react'

interface UserProp{
    userName:string
}

const UserComponent:React.FC<UserProp> = ({userName}) => {
  return (
    <div className='flex items-center'>
        <img className='w-10' src="https://statics.olx.in/external/base/img/avatar_2.png" alt="" />
        <p className='font-bold'>{userName}</p>
    </div>
  )
}

export default UserComponent
