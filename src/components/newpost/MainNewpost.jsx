import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FirebaseContext } from "../../context/FirebaseContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../context/PostsContext";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
const MainNewpost = ({ username }) => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { db } = useContext(FirebaseContext);
  const { reFetch } = useContext(PostsContext);
  const { user } = useContext(AuthContext);
  console.log(user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const excert = e.target.excert.value;
    const image = e.target.image.value;
    const slug = title.split(" ").join("-") + "-" + new Date().getTime();
    console.log({ title, excert, slug, image, body });
    if (!title || !excert || !image || !body) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required",
        position: "top",
        toast: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      return;
    }
    setLoading(true);
    try {
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        title,
        excert,
        slug,
        image,
        body,
        user: user.displayName,
        createdAt: serverTimestamp(),
        language: selectedLanguage,
      });
      e.target.reset();
      setBody("");
      setLoading(false);
      reFetch();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Article has been added.",
        position: "top",
        toast: true,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      navigate(`/blog/${slug}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <section className="my-5">
      <Container>
        <Row>
          <Col md="5" lg="6" className="mx-auto">
            <h2 className="mb-4">Add new article</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Article Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter article title"
                  name="title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formExcert">
                <Form.Label>Article Excert</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter article excert"
                  name="excert"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Article Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="image"
                />
              </Form.Group>
              <Form.Label>Article body</Form.Label>
              <ReactQuill
                placeholder="Enter article body"
                theme="snow"
                value={body}
                onChange={setBody}
              ></ReactQuill>
              <Form.Group className="mb-3" controlId="formLanguage">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  as="select"
                  name="language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                </Form.Control>
              </Form.Group>
              <Button type="submit" className="mt-4 w-100" disabled={loading}>
                Submit {loading ? "..." : ""}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MainNewpost;
