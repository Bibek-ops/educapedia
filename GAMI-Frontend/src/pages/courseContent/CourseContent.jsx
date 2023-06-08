import React from "react";

import { get_single_couse, update_progress } from "../../apis/Api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CourseContent = () => {
  const { id } = useParams();

  const [course, setCourse] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);

    get_single_couse(id)
      .then((res) => {
        // console.log(res.data.content);
        setCourse(res.data.content.course);
        setProgress(res.data.progess);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);
  console.log(course);


  const handleMarkAsCompleted = (id) => {
    const formData = new FormData();
    formData.append("course_id", id);
    update_progress(id, formData).then((res) => {
      console.log(res.data);
      setProgress(res.data.progress);
      setCourse(res.data.complete);
      toast.success("Course completed successfully");
    });
  };

  return (
    <div className="mt-2 container">
      <div className="d-flex justify-content-between">
        <h3>Learn MERN Stack with deployment</h3>
        <h5 className="ms-3 mt-2">{progress} RP ✨</h5>
      </div>
      <div className="accordion" id="accordionExample">
        {course.map((content) => (
          <div className="accordion-item" key={content._id}>
            <h2 className="accordion-header" id={`heading${content._id}`}>
              <button
                className="accordion-button"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target={`#collapse${content._id}`}
                aria-expanded="true"
                aria-controls={`collapse${content._id}`}
              >
                {content.title}
              </button>
            </h2>
            <div
              id={`collapse${content._id}`}
              className={`accordion-collapse collapse ${
                content.complete ? "show" : ""
              }`}
              aria-labelledby={`heading${content._id}`}
              data-mdb-parent="#accordionExample"
            >
              <div className="accordion-body">{content.description}</div>
              
                <div className="d-flex justify-content-end">
                  {content.complete ? (
                    <button
                      onClick={() => handleMarkAsCompleted(content._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Mark as uncompleted
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkAsCompleted(content._id)}
                      className="btn btn-sm btn-success"
                    >
                      Mark as completed
                    </button>
                  )}
                </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
