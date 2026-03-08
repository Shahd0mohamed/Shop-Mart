import LoginForm from '@/components/LoginForm/LoginForm'
import React from 'react'

export default function login() {
  return <div className='flex flex-col justify-center items-center h-[80vh]'>

    <div className='mb-3 pb-3 font-bold'>login Form</div>
    <LoginForm />

  </div>

}
