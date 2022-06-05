import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/userRoute";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import { Button, Card, Col, Row } from "antd";

const Hire = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [hire, setHire] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [uID, setUID] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:8000/api/hire");

        setHire(data);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchData();
    const user = JSON.parse(localStorage.getItem("auth"));
    setUser(user);
    setUID(user.user._id);
  }, []);
  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row p-5 bg-default-image">
          <div className="col text-center">
            <h3>Hire</h3>
          </div>
        </div>
        {loading ? (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="site-card-wrapper">
            <Row gutter={16}>
              {hire
                .filter((hire) => hire._id !== uID)
                .map((hire) => (
                  <Col span={8}>
                    <Card
                      title={hire.fname + " " + hire.lname}
                      bordered={false}
                    >
                      {hire.about}
                      <p>{hire.email}</p>
                      <Button type="primary" ghost>
                        Hire
                      </Button>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        )}
      </div>
    </UserRoute>
  );
};

export default Hire;
