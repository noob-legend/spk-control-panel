import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      const { token } = response.data;

      // Decode token untuk ambil role
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      // Simpan token
      localStorage.setItem("token", token);

      // Kirim ke state global (kalau ada)
      onLogin(email, role);

      navigate("/dashboard");
    } catch (error) {
      alert("Login gagal");
    }
  };
  const handleGuestLogin = () => {
    onLogin("guest@manufacturing.com", "pengunjung");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary-400 mb-2">MMS</h1>
          <p className="text-gray-400">Manufacturing Management System</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-dark-surface border border-dark-border rounded-lg p-8 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Masuk</h2>
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Masuk
          </Button>

          {/* Guest Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-surface text-gray-400">atau</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full text-primary-400 hover:text-primary-300 font-medium py-2 transition-colors"
          >
            Masuk sebagai Pengunjung
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-dark-surface border border-dark-border rounded-lg">
          <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Produksi: produksi@example.com</li>
            <li>• Packing: packing@example.com</li>
            <li>• Pengunjung: guest@example.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
