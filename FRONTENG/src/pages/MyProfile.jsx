import Navbar from "../components/Navbar";
const MyProfile = () => {
  return (
    <>
    <Navbar/>
      <main className="mt-5">
        <div className="container py-5">
          <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <h5 className="mb-0">Thomas Galih Satria</h5>
                <span>@tomsgat</span>
              </div>
              <small className="mb-0 text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem,
                error!
              </small>
            </div>
            <div>
              <a href="create-new-post.html" className="btn btn-primary w-100 mb-2">
                + Create new post
              </a>
              <div className="d-flex gap-3">
                <div>
                  <div className="profile-label">
                    <b>5</b> posts
                  </div>
                </div>
                <div className="profile-dropdown">
                  <div className="profile-label">
                    <b>100</b> followers
                  </div>
                  <div className="profile-list">
                    <div className="card">
                      <div className="card-body">
                        <div className="profile-user">
                          <a href="user-profile-private.html">@davidnaista</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@superipey</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@lukicenturi</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@_erik3010</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@asawgi</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@irfnmaulaa</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-dropdown">
                  <div className="profile-label">
                    <b>100</b> following
                  </div>
                  <div className="profile-list">
                    <div className="card">
                      <div className="card-body">
                        <div className="profile-user">
                          <a href="user-profile-private.html">@davidnaista</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@superipey</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@lukicenturi</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@_erik3010</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@asawgi</a>
                        </div>
                        <div className="profile-user">
                          <a href="user-profile-private.html">@irfnmaulaa</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="card-images mb-2">
                    <img
                      src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp"
                      alt="image"
                      className="w-100"
                    />
                    <img
                      src="posts/5898d0f58275e829008b4842.webp"
                      alt="image"
                      className="w-100"
                    />
                    <img
                      src="posts/shutterstock_1464930743-scaled.webp"
                      alt="image"
                      className="w-100"
                    />
                  </div>
                  <p className="mb-0 text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Magnam, minima?
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="card-images mb-2">
                    <img
                      src="posts/5898d0f58275e829008b4842.webp"
                      alt="image"
                      className="w-100"
                    />
                    <img
                      src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp"
                      alt="image"
                      className="w-100"
                    />
                    <img
                      src="posts/shutterstock_1464930743-scaled.webp"
                      alt="image"
                      className="w-100"
                    />
                  </div>
                  <p className="mb-0 text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Magnam, minima?
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="card-images mb-2">
                    <img
                      src="posts/shutterstock_1464930743-scaled.webp"
                      alt="image"
                      className="w-100"
                    />
                    <img
                      src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp"
                      alt="image"
                      className="w-100"
                    />
                    <img
                      src="posts/5898d0f58275e829008b4842.webp"
                      alt="image"
                      className="w-100"
                    />
                  </div>
                  <p className="mb-0 text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Magnam, minima?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyProfile