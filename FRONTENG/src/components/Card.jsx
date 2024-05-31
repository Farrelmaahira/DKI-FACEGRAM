import { Link } from "react-router-dom";
const Card = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <div className="card mb-4">
      <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
        <h6 className="mb-0">{data.user.full_name}</h6>
        <small className="text-muted">5 days ago</small>
      </div>
      <div className="card-body">
        <div className="card-images mb-2">
          {
            data.attachments.map((item) => {
              return <img src={item.storage_path} alt="image" className="w-100" />
            })
          }
        </div>
        <p className="mb-0 text-muted">
          <b>
            <Link to={`/user/${data.user.username}`}>
                {data.user.username} 
            </Link>
          </b>{" "}
          {data.caption}
        </p>
      </div>
    </div>
  );
};

export default Card;
