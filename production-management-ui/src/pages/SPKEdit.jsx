import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import SPKForm from "../components/spk/SPKForm";

export default function SPKEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchSPK = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/spk/${id}`);
        setInitialData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSPK();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await axios.put(`http://localhost:5000/api/spk/${id}`, formData);
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
