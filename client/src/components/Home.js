import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [filterDescription, setFilterDescription] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [itemPerPage, setItemPerPage] = useState(5);
  const [filterType, setFilterType] = useState(true);
  const [data, setData] = useState([]);


  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/recruitment/positions.json?description=${filterDescription}&location=${filterLocation}&page=${page}&full_time=${filterType}&limit=${itemPerPage}`, {
        method: 'GET',
        headers: {access_token: localStorage.getItem('access_token')}
      });
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handlePageChange = (e) => {
    setPage(e);
  };

  const handleFilterDescription = (e) => {
    setFilterDescription(e.target.value)
  }

  const handleFilterLocation = (e) => {
    setFilterLocation(e.target.value)
  }

  const handleFilterType = (e) => {
    if(filterType !== '') setFilterType('')
    else setFilterType(true)
    
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    navigate('/login')
  };

  const filter = (e) => {
    e.preventDefault();
    fetchData()
  }

  const goToDetailPage = (id) => {
    navigate(`/detail/${id}`)
  }

  return (
    <div>
      <button class="logoutbtn" onClick={(e)=> {logout(e)}}>Logout</button>
      <div id="DataTable">
        <form class="form-inline" onSubmit={(e)=> {filter(e)}}>
          <label>Description:</label>
          <input placeholder="Enter Description"onChange={handleFilterDescription} />
          <label>Location:</label>
          <input placeholder="Enter Location" onChange={handleFilterLocation}/>
          <label>
            <input type="checkbox" checked={filterType} name="remember" onChange={handleFilterType}/> Full Time
          </label>
          <button type="submit">Submit</button>
        </form>
        <div id="table_box_bootstrap"></div>
        <table>
          <thead>
            <tr>
              <th>Job List</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="scroll-pane">
            {data.map((item, index) => (
              <tr onClick={()=>{goToDetailPage(item.id)}}>
                <td>{item.title} , {item.company} - {item.type} </td>
                <td>{item.location} - {item.created_at}</td>
              </tr>
          ))}

          </tbody>
        </table>
        <div class="pagination">
          <a href="#" onClick={() => {handlePageChange(page - 1)}}>&laquo;</a>
          <a href="#">{page}</a>
          <a href="#" onClick={() => {handlePageChange(page + 1)}}>&raquo;</a>
        </div>
      </div>
    </div>
  );
};

export default Login;