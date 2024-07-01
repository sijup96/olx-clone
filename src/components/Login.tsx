import { useRef, useState } from 'react'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)


    const handleButtonClick = async () => {
        const email = emailRef.current?.value || ''
        const password = passwordRef.current?.value || ''
        const message = checkValidData({ email, password })
        if (message) {
            setError(message)
            return
        }
        if (!isSignInForm) {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: nameRef.current?.value
                })
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                })
                navigate('/')

            } catch (error) {
                console.error(error);

            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                navigate('/')
            } catch (error) {
                setError('other')
            }
        }

    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div className='flex justify-center items-center h-screen bg-black bg-opacity-50' >
            <div className='w-1/4'>
                <div className='p-5 bg-white flex flex-col '>
                    <div className='flex items-center justify-center'>
                        <img src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Symbol.png" className='w-9/12 ' alt="logo" />
                    </div>
                    <div>
                        <form className='flex flex-col' onSubmit={(e) => e.preventDefault()}>
                            {!isSignInForm && (<>
                                <p className='mt-5'>User Name</p>
                                <input type="text" className='mt-5 p-2' placeholder='user name' ref={nameRef} />
                            </>
                            )}
                            <p className='mt-5'>Email address</p>
                            <input type="text" className='mt-5 p-2' placeholder='email' ref={emailRef} />
                            {error === 'email' &&
                                <p className='text-red-600'>Please enter a valid email</p>}
                            <p className='mt-5'>Password</p>
                            <input className='mt-5 p-2' type="password" placeholder='password' ref={passwordRef} />
                            {error === 'password' &&
                                <p className='text-red-600'>Please enter a valid password</p>}
                            <div className=' flex flex-col items-center mt-5 justify-center'>
                                <button className=' bg-green-950 w-20 rounded-lg p-2 font-bold text-white' onClick={handleButtonClick}>
                                    {isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                                {error === 'other' &&
                                    <p className='text-red-600 mt-5'>Invalid credentials</p>}
                            </div>

                        </form>
                    </div>
                    <div className='flex mt-5 space-x-2'>
                        <p>{isSignInForm ? 'Dont have an account?' : 'have an account?'}</p>
                        <span className='underline cursor-pointer' onClick={toggleSignInForm}>
                            {isSignInForm ? 'Sign Up' : 'Sign In'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
