import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateFetchgetInfo } from "../../fetch/user";

export const UserInfo = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAuthorization = async () => {
      try {
        await privateFetchgetInfo();
        setError(null);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };
    fetchAuthorization();
  }, []);

  useEffect(() => {
    if (error && error.message === "Token not found") {
      navigate("/");
    }
  }, [error, navigate]);
};