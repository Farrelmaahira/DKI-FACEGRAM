import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Request from "../components/Request";
import Explore from "../components/Explore";
import axios from "axios";
import { useState, useEffect } from "react";
const Home = () => {
  const [data, setData] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const token = sessionStorage.getItem("token");
  const fetchApi = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/posts?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data.posts);
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <>
    <Navbar></Navbar>
      <main className="mt-5">
        <div className="container py-5">
          <div className="row justify-content-between">
            <div className="col-md-8">
              <h5 className="mb-3">News Feed</h5>
              {data.map((item, index) => {
                return <Card data={item} key={index} />;
              })}
            </div>
            <div className="col-md-4">
              <Request />
              <Explore />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
