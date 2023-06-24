import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import './Detail.css';
import { Link } from "react-router-dom";

const Login = () => {
  const { id } = useParams();
  const [data, setData] = useState({})


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/recruitment/positions/${id}`, {
        method: 'GET',
        headers: {access_token: localStorage.getItem('access_token')}
      });
      const jsonData = await response.json();
      setData(jsonData[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div>
      <Link class="backbtn" to="/">Back</Link>
      <div class="grid-container">
        <div class="header">
          <td>{data.title} , {data.type},  {data.location}</td>
        </div>
        <div class="main">
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>  
        <div class="right">
          <img src='https://images.pexels.com/photos/14448266/pexels-photo-14448266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="Image Description" />
        </div>
      </div>
      
    </div>
  );
};

export default Login;