import { Link } from "react-router-dom";
import ProfileList from "./ProfileList";
const Header = (props) => {
  const { data } = props;
  return (
    <>
      <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h5 className="mb-0">{data.full_name}</h5>
            <span>{data.username}</span>
          </div>
          <small className="mb-0 text-muted">{data.bio}</small>
        </div>
        <div>
          {data.is_your_account == true ? (
            <Link className="btn btn-primary w-100 mb-2" to={'/create-post'}>
              + Create new post 
            </Link>
          ) : data.following_status == "Following" ? (
            <a
              href="user-profile-following.html"
              className="btn btn-secondary w-100 mb-2"
            >
              Following
            </a>
          ) : data.following_status == "Requested" ? (
            <a
              href="user-profile-private.html"
              className="btn btn-secondary w-100 mb-2"
            >
              Requested
            </a>
          ) : data.is_private == true || data.following_status == 'Not Following' ? (
            <a
              href="user-profile-requested.html"
              class="btn btn-primary w-100 mb-2"
            >
              Follow
            </a>
          ) : null}
          <div className="d-flex gap-3">
            <div>
              <div className="profile-label">
                <b>{data.posts_count}</b> posts
              </div>
            </div>
            <div className="profile-dropdown">
              <div className="profile-label">
                <b>{data.followers_count}</b> followers
              </div>
              <ProfileList />
            </div>
            <div className="profile-dropdown">
              <div className="profile-label">
                <b>{data.following_count}</b> following
              </div>
              <ProfileList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
