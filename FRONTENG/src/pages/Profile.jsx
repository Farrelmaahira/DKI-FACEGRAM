import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Header from "../components/Profile/Header";
import Card from "../components/Card";
import axios from "axios";
import { useState, useEffect } from "react";
const Profile = () => {
  const { username } = useParams();
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  const fetchProfile = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  console.log(data);
  return (
    <>
      <Navbar />
      <main className="mt-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <Header data={data}></Header>
              {data.is_private == false ||
              data.following_status == "Following" ||
              data.is_your_account == true ? (
                data.posts.map((item) => {
                  return (
                    <div className="col-md-4">
                      <Card data={item} />
                    </div>
                  );
                })
              ) : (
                <div class="card py-4">
                  <div class="card-body text-center">
                    &#128274; This account is private
                  </div>
                </div>
              )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
