import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import rightimg from "../img/right.png";
import pendingimg from "../img/pending.jpg";
import Button from "react-bootstrap/Button";
import { message } from "antd";
import WEB_URL from "../config";

const UserTaskReport = () => {
    const [mydata, setMydata] = useState([]);

    const loadData = async () => {
        const api = `${WEB_URL}/admin/usertaskdisplay`;
        try {
            const response = await axios.get(api);
            setMydata(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const reassignTask = async (taskid) => {
        try {
            const api = `${WEB_URL}/admin/reasigntask`;
            const response = await axios.post(api, { taskid });
            message.success(response.data.msg);
            loadData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            style={{
                padding: "20px",
                backgroundColor: "#f5f7fa",
                minHeight: "100vh",
                boxSizing: "border-box"
            }}
        >
            <h3
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    fontWeight: "600",
                    color: "#333"
                }}
            >
                User Task Report
            </h3>

            <div
                style={{
                    overflowX: "auto",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    width: "100%",
                    boxSizing: "border-box"
                }}
            >
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    size="sm"
                    style={{
                        fontSize: "14px",
                        minWidth: "900px",
                        borderCollapse: "collapse"
                    }}
                >
                    <thead style={{ backgroundColor: "#cfe2ff" }}>
                        <tr>
                            <th style={{ padding: "8px" }}></th>
                            <th style={{ padding: "8px" }}>#</th>
                            <th style={{ padding: "8px" }}>Emp Name</th>
                            <th style={{ padding: "8px" }}>Email</th>
                            <th style={{ padding: "8px" }}>Designation</th>
                            <th style={{ padding: "8px" }}>Title</th>
                            <th style={{ padding: "8px" }}>Description</th>
                            <th style={{ padding: "8px" }}>Duration</th>
                            <th style={{ padding: "8px" }}>Status</th>
                            <th style={{ padding: "8px" }}>Report</th>
                            <th style={{ padding: "8px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mydata.map((item, index) => (
                            <tr key={item._id}>
                                <td style={{ textAlign: "center" }}>
                                    <img
                                        src={item.empreport === "submited" ? rightimg : pendingimg}
                                        alt="status"
                                        style={{ height: "14px" }}
                                    />
                                </td>
                                <td style={{ padding: "8px" }}>{index + 1}</td>
                                <td style={{ padding: "8px" }}>{item.empid?.name}</td>
                                <td style={{ padding: "8px" }}>{item.empid?.email}</td>
                                <td style={{ padding: "8px" }}>{item.empid?.designation}</td>
                                <td style={{ padding: "8px" }}>{item.title}</td>
                                <td style={{ padding: "8px" }}>{item.description}</td>
                                <td style={{ padding: "8px" }}>{item.duration}</td>
                                <td style={{ padding: "8px" }}>{item.taskstatus}</td>
                                <td style={{ padding: "8px" }}>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            color:
                                                item.empreport === "submited"
                                                    ? "green"
                                                    : "red"
                                        }}
                                    >
                                        {item.empreport}
                                    </span>
                                </td>
                                <td style={{ padding: "8px" }}>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => reassignTask(item._id)}
                                        style={{
                                            fontSize: "12px",
                                            padding: "4px 8px",
                                            borderRadius: "6px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        Reassign
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default UserTaskReport;
