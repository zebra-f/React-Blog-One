import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

import axiosInstance from "../api/axios";
import { UserContext } from "../UserContext";

function PostCreate() {
  const navigate = useNavigate();
  //   const { user, setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/");
    }
  }, [user.loggedIn, navigate]);

  const initialFormData = Object.freeze({
    title: "",
    excerpt: "",
    content: "",
    status: "public",
  });

  const [formData, setFormData] = useState(initialFormData);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`posts/`, {
        title: formData.title,
        ...(formData.excerpt ? { excerpt: formData.excerpt } : {}),
        content: formData.content,
        status: formData.status,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        setSubmitError(true);
      });
  };

  return (
    <div className="CreatePost">
      {/* Post Form */}
      <br />
      {submitError && (
        <h2>Something went wrong, make sure to provide a correct form data.</h2>
      )}
      <form className="post-create-form" action="">
        <div className="title">
          <label className="form__label">
            Title*:
            <textarea
              className="form__input"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title for the Post"
            />
          </label>
        </div>
        <div className="excerpt">
          <label className="form__label">
            Excerpt:
            <textarea
              className="form__input"
              name="excerpt"
              type="text"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Excerpt"
            />
          </label>
        </div>
        <div className="content">
          <label className="form__label">
            Content*:
            <textarea
              required
              className="form__input"
              name="content"
              type="text"
              value={formData.content}
              onChange={handleChange}
              placeholder="Content"
            />
          </label>
        </div>
        <div className="status">
          <label className="form__label">
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="published">Publish</option>
              <option value="draft">Draft</option>
            </select>
          </label>
        </div>
        <div className="post-create-submit-button">
          <button onClick={handleSubmit} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCreate;
