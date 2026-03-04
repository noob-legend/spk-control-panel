import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import SPKForm from "../components/spk/SPKForm";

export default function SPKEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSPK = async () => {
      try {
        const res = await axios.get(`${API}/api/spk/${id}`);
        setInitialData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSPK();
  }, [id]);

  const handleUpdate = async (formData) => {
     try {
    const token = localStorage.getItem("token");
console.log("Sending update:", formData, "Token:", token);
    await axios.put(
      `${API}/api/spk/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/spk");
  } catch (error) {
    console.error("Gagal update SPK", error);
  }
};
  if (!initialData) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Edit SPK</h1>

      <SPKForm onSubmit={handleUpdate} initialData={initialData} />
    </div>
  );
}
