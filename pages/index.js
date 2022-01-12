import React, { Fragment, useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import {Accordion} from 'react-bootstrap';

export default function Crud() {
  // get data from database
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    setLoading(true);
    axios.get('https://express-crud-backend.herokuapp.com/api')
    .then((res) => { 
      setData(res.data)
      setLoading(false); 
    })
    .catch((err) => { 
      console.log(err) 
    })
  }

  useEffect(() => {
    getData();  
  }, []);

  return (
    <div>

      <Head>
        <title>Web Dev - Web App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel="icon" href="https://clipground.com/images/programming-logo-clipart-5.jpg"></link>
      </Head>

      <nav
        style={{position:'fixed'}}
        className='bg-blue-50 flex justify-center m-0 py-1 px-0 top-0 shadow-sm space-x-3 text-dark w-100 z-10'
      >
        {[
          ['Home', '/',1],
          ['Login','/login',2],
        ].map(([title, url, id]) => (
          <Link href={url} key={id}>
            <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-700 hover:text-gray-900">
              {title}
            </a>
          </Link>
        ))}
      </nav>

      <main>
        <div>
          <div className='mx-auto mb-5 text-center w-5/6' style={{marginTop:'75px'}}>
            <h3 className='font-bold text-2xl text-blue-700 mt-2'>
              Learning Path Web Dev
            </h3>
            <p>Compilation of Web Programming Front End & Back End (Node.js) Learning Sources</p>
            <p className='font-bold'>by M. Rafli Ramadhan</p>
          </div>
          <Accordion defaultActiveKey="0" className='bg-slate-200 mx-auto mt-1 mb-3 w-5/6'>
            {loading ? (
              <p className='text-center font-bold text-xl'>Loading...</p>
              ) : (data.map((item, index) => {
                return (
                  <Accordion.Item eventKey={index} className='my-2 shadow' key={index}>
                    <Accordion.Header>
                      <p className='font-bold my-0 hover:underline'>{item.title}</p>
                    </Accordion.Header>
                    <Accordion.Body className='p-0'>
                      <iframe src={item.link}
                        style={{width: '100%',height: '1100px'}}
                      ></iframe>
                    </Accordion.Body>
                  </Accordion.Item>
                )
              }))
            }
          </Accordion>
        </div>
      </main>
    </div>
  )
}
