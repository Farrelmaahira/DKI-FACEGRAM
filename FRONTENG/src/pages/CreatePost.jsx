import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [attachments, setAttachments] = useState([]);
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate() 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
        caption : caption,
        attachments : attachments
    }

    const response = await axios.post('http://localhost:8000/api/v1/posts', body, {
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type" : 'multipart/form-data'
        }
    })

    if(response.status == 200) {
        navigate('/home')
    }
    
  }
  return (
    <>
    <Navbar/>
      <main className="mt-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                  <h5 className="mb-0">create new post</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label for="caption">caption</label>
                      <textarea
                        className="form-control"
                        name="caption"
                        id="caption"
                        cols="30"
                        rows="3"
                        onChange={(e) => { setCaption(e.target.value)}}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label for="attachments">image(s)</label>
                      <input
                        type="file"
                        className="form-control"
                        id="attachments"
                        name="attachments"
                        multiple
                        onChange={(e) => {setAttachments(e.target.files)}}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      share
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreatePost;
