import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const token = sessionStorage.getItem('token')
        const response = await axios.post('http://localhost:8000/api/v1/auth/logout', {}, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        if(response.data.message == 'logout success') {
            sessionStorage.removeItem('token')
            return navigate('/')
        }
    }
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <Link to={'/home'}>
            Facegram 
          </Link>
          <div className="navbar-nav">
            <Link to={'/user/sukabapak'} className="nav-link">
              @tomsgat
            </Link>
            <a className="nav-link" onClick={handleLogout}> 
              Logout
            </a>
          </div>
        </div>
      </nav>
    )
}

export default Navbar