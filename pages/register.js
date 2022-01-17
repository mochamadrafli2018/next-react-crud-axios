import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [nameValidation, setNameValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [passwordConfirmationValidation, setPasswordConfirmationValidation] = useState(true);
  const [passwordConfirmationValidationSame, setPasswordConfirmationValidationSame] = useState(true);
  const [passwordLengthValidation, setPasswordLengthValidation] = useState(true);
  const [send, setSend] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const registerHandler = async (e) => {
    // validation after button was click
    if (!name) {setNameValidation(false);}
    if (!email) {setEmailValidation(false);}
    if (!password) {setPasswordValidation(false);}
    if (password && password.length < 8) {setPasswordLengthValidation(false);}
    if (!passwordConfirmation) {setPasswordConfirmationValidation(false);}
    if (passwordConfirmation !== password) {setPasswordConfirmationValidationSame(false);}
    e.preventDefault();
    // send data to server
    await axios.post('http://localhost:5000/api/register', 
      ({
        name,
        email,
        gender,
        password,
      })
    )
    .then((res) => {
      setSend(true);
      // re-empty input
      setName(''); 
      setEmail(''); 
      setPassword('');
      setGender('male');
      setPasswordConfirmation('');
      router.push('/login');
    })
    .catch((error) => {
      setSend(false);
      setError(error.message);
    })
  };

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
      <main className='flex flex-col poppins p-0 mx-0' style={{marginTop:'70px'}}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-5px rounded shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold">Daftar sebagai Pengguna Baru</h4>
                <hr/>
                  <form onSubmit={registerHandler}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Nama Panggilan</label>
                          <input type="text" className="form-control" 
                            value={name} 
                            onChange={(e) => {
                              setName(e.target.value);
                              setNameValidation(true);
                              setSend(false);
                              setError('');
                            }} 
                            placeholder="Masukkan Nama Panggilan"
                          />
                        </div>
                        {nameValidation === false && (
                          <div className="alert alert-danger">
                            Nama harus diisi
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" 
                            value={email} 
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailValidation(true);
                              setSend(false);
                              setError('');
                            }}
                            placeholder="Masukkan Alamat Email"
                          />
                        </div>
                        {emailValidation === false && (
                          <div className="alert alert-danger">
                            Email harus diisi
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input type="password" className="form-control" 
                            value={password} 
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setPasswordValidation(true);
                              setPasswordLengthValidation(true);
                              setSend(false);
                              setError('');
                            }}
                            placeholder="Masukkan Password"
                          />
                        </div>
                        {passwordValidation === false && (
                          <div className="alert alert-danger">
                            Password harus diisi
                          </div>
                        )}
                        {passwordLengthValidation === false && (
                          <div className="alert alert-danger">
                            Password harus lebih dari 8
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Konfirmasi Password</label>
                          <input type="password" className="form-control" 
                            value={passwordConfirmation} 
                            onChange={(e) => {
                              setPasswordConfirmation(e.target.value);
                              setPasswordConfirmationValidation(true);
                              setPasswordConfirmationValidationSame(true);
                              setSend(false);
                              setError('');
                            }}
                            placeholder="Masukkan Konfirmasi Password"
                          />
                        </div>
                        {passwordConfirmationValidation === false && (
                          <div className="alert alert-danger">
                            Konfirmasi password perlu diisi
                          </div>
                        )}
                        {passwordConfirmationValidationSame === false && (
                          <div className="alert alert-danger">
                            Password tidak sama
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='row'>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Gender</label>
                          <select className="form-control" id="exampleFormControlSelect1"
                            value={gender}
                            onChange={(e) => {
                              setGender(e.target.value);
                              setSend(false);
                              setError('');
                            }}
                          >
                            <option value='male'>Laki-laki</option>
                            <option value='female'>Perempuan</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button onClick={registerHandler} type="submit" className="btn btn-primary">DAFTAR</button>
                    </div>
                    {send === true && (
                      <div className="alert alert-info mt-3">
                        Berhasil terdaftar
                      </div>
                    )}
                    {error === 'Request failed with status code 409' && (
                      <div className="alert alert-danger mt-3">
                        Email telah digunakan orang lain.
                      </div>
                    )}
                    {error === 'Request failed with status code 500' && (
                      <div className="alert alert-danger mt-3">
                        Ada kesalahan pada server, coba lagi.
                      </div>
                    )}
                    <div className="mt-3">
                      <p>Sudah daftar? Silahkan masukkan akun anda dengan klik tombol berikut</p>
                    </div>
                    <div className="d-grid gap-2">
                      <button onClick={() => { router.push('/login') }} className="btn btn-outline-primary">MASUK</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}