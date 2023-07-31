import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import { get_user_enroll_courses } from "../../apis/Api";

const MyCourse = () => {
  const [enrollCourses, setEnrollCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);

    get_user_enroll_courses()
      .then((res) => {
        console.log(res.data);
        setEnrollCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const now = 100;
  if(loading){
    return <h1>Loading...</h1>
    }
  return (
    <div className="container mt-2">
      <h3>My Learnings</h3>
      {enrollCourses.map((course) => (
        <div class="card" key={course._id}>
          <div class="card-body">
            <div className="d-flex justify-content-between">
              <h5 class="card-title">{course.title}</h5>
              <h5>{course.progress} RP ✨</h5>
            </div>
            <ProgressBar now={course.progress} label={`${now}%`} />
            <Link
              to={`/course/${course._id}`}
              class="btn btn-outline-black mt-2"
            >
              Go to learning section
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourse;
