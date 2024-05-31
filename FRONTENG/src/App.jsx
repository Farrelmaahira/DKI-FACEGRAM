import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if(token) {
      return navigate('/home')
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      username : username,
      password : password
    }

    const response = await axios.post('http://localhost:8000/api/v1/auth/login', body)
    if(response.data.message == 'Login success') {
      const token = response.data.token
      sessionStorage.setItem('token', token)
      navigate('/home')
    }

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <a className="navbar-brand m-auto" href="index.html">
            Facegram
          </a>
        </div>
      </nav>

      <main className="mt-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                  <h5 className="mb-0">Login</h5>
                </div>
                <div className="card-body">
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label for="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        onChange={(e) => { setUsername(e.target.value) }}
                      />
                    </div>

                    <div className="mb-3">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={(e) => {setPassword(e.target.value)}}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </form>
                </div>
              </div>

              <div className="text-center mt-4">
                Don't have account? <Link to={'/register'}>Register</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
