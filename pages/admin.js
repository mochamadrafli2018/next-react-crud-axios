import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [keywordValidation, setKeywordValidation] = useState(true);
  const [keywordMatch, setKeywordMatch] = useState(true);
  const [send, setSend] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const loginHandler = async (e) => {
    // validation after button was click
    if (!email) { setEmailValidation(false); }
    if (!password) { setPasswordValidation(false); }
    if (!keyword) { setKeywordValidation(false); }
    if (keyword && keyword !== 'admin') {setKeywordMatch(false);}
    e.preventDefault();
    // send data to server
    await axios.post('http://localhost:5000/api/login', 
      ({
        email,
        password,
      })
    )
    .then((response) => {
      // set token on localStorage
      setToken(response.data.token);
      (localStorage.setItem('token', response.data.token));
      router.push('/register');
    })
    .catch((error) => {
      setError(error.message);
    })
  }
  
  return (
    <div className="poppins" >
      <nav
        style={{position:'fixed'}}
        className='bg-blue-50 flex justify-center m-0 py-1 px-0 top-0 shadow-sm space-x-3 text-dark w-full z-10'
      >
        {[
          ['Home', '/'],
          ['Login','/login'],
          ['Register', '/register'],
          ['Admin', '/admin'],
        ].map(([title, url, index]) => (
          <Link href={url} key={index}>
            <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-700 hover:text-gray-900">
              {title}
            </a>
          </Link>
        ))}
      </nav>
      <main className='flex flex-col poppins' style={{marginTop:'70px'}}>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <div className='card border-5px rounded shadow-sm'>
              <div className='card-body'>   
                <h4 className='fw-bold'>Admin Login</h4>
                <hr/>
                <form onSubmit={loginHandler}>
                  <div className='mb-3'>
                    <label className='form-label'>Email</label>
                    <input 
                      type='email' 
                      className='form-control' 
                      value={email} 
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailValidation(true);
                        setSend(false);
                        setError('');
                      }}
                      placeholder='Masukkan Alamat Email'
                    />
                  </div>
                  {emailValidation === false && (
                    <div className="alert alert-danger">
                      Email harus diisi
                    </div>
                  )}
                  <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input 
                      type='password' 
                      className='form-control' 
                      value={password} 
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordValidation(true);
                        setSend(false);
                        setError('');
                      }} 
                      placeholder='Masukkan Password'
                    />
                  </div>
                  {passwordValidation === false && (
                    <div className="alert alert-danger">
                      Password harus diisi
                    </div>
                  )}
                  <div className='mb-3'>
                    <label className='form-label'>Keyword</label>
                    <input 
                      type='text' 
                      className='form-control' 
                      value={keyword} 
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        setKeywordValidation(true);
                        setKeywordMatch(true);
                        setSend(false);
                        setError('');
                      }} 
                      placeholder='Masukkan Password'
                    />
                  </div>
                  {keywordValidation === false && (
                    <div className="alert alert-danger">
                      Keyword harus diisi
                    </div>
                  )}
                  {keywordMatch === false && (
                    <div className="alert alert-danger">
                      Keyword salah
                    </div>
                  )}
                  <div className='d-grid gap-2'>
                    <button onClick={loginHandler} type='submit' className='btn btn-primary'>
                      MASUK
                    </button>
                  </div>
                  {send === true && (
                    <div className="alert alert-info mt-3">
                      Tunggu sebentar...
                    </div>
                  )}
                  {error === 'Request failed with status code 409' && (
                    <div className="alert alert-danger mt-3">
                      Email terdaftar, tapi password salah.
                    </div>
                  )}
                  {error === 'Request failed with status code 500' && (
                    <div className="alert alert-danger mt-3">
                      Maaf email tidak terdaftar.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}