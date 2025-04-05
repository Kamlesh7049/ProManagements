import { useState } from "react";
import { Form, Button, Card, InputGroup, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import WEB_URL from "../config";

const CreateUser = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        designation: ""
    });
    const [uploadImage, setUploadImage] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadImage(file);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            let imageUrl = "";

            if (uploadImage) {
                const formData = new FormData();
                formData.append("file", uploadImage);
                formData.append("upload_preset", "myimage");
                formData.append("cloud_name", "dtwwlicj1");

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dtwwlicj1/image/upload",
                    formData
                );
                imageUrl = response.data.secure_url;
            }

            const api = `${WEB_URL}/admin/usercreate`;
            const userResponse = await axios.post(api, {
                userProfile: imageUrl,
                ...input
            });

            if (userResponse.status === 201 || userResponse.status === 200) {
                message.success("User Successfully Created!");
                setInput({ name: "", email: "", designation: "" });
                setUploadImage(null);
            } else {
                message.error("Failed to create user.");
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong. Please try again.");
        }
    };

    return (
        <Container 
            fluid 
            className="d-flex justify-content-center align-items-center" 
            style={{ minHeight: "100vh", backgroundColor: "#f5f8fa", padding: "40px 0" }}
        >
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <Card 
                        className="p-4 shadow"
                        style={{
                            borderRadius: "16px",
                            backgroundColor: "#ffffff",
                            border: "none",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h3 className="text-center mb-4" style={{ fontWeight: "600", color: "#333" }}>
                            Create New Employee
                        </h3>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontWeight: "500" }}>Employee Name</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Employee Name"
                                        name="name"
                                        value={input.name}
                                        onChange={handleInput}
                                        style={{ borderRadius: "8px" }}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontWeight: "500" }}>Employee Email</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Employee Email"
                                        name="email"
                                        value={input.email}
                                        onChange={handleInput}
                                        style={{ borderRadius: "8px" }}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontWeight: "500" }}>Designation</Form.Label>
                                <Form.Select
                                    name="designation"
                                    value={input.designation}
                                    onChange={handleInput}
                                    style={{ borderRadius: "8px" }}
                                >
                                    <option value="">Choose Designation</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Python">Python</option>
                                    <option value="Java">Java</option>
                                    <option value="Graphic Designer">Graphic Designer</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label style={{ fontWeight: "500" }}>Upload Profile Picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleImage}
                                    style={{ borderRadius: "8px" }}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="w-100"
                                style={{
                                    padding: "10px",
                                    fontWeight: "500",
                                    borderRadius: "10px",
                                    background: "linear-gradient(to right, #4ca1af, #c4e0e5)",
                                    border: "none",
                                    color: "#fff"
                                }}
                                onClick={handleSubmit}
                            >
                                Create Employee
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateUser;
