import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import styled from "styled-components";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


type FloatingFieldProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  icon: React.ReactNode;
};

function FloatingField({
  id,
  label,
  type,
  value,
  onChange,
  
  icon,
}: FloatingFieldProps) {
  return (
    <FloatingFieldRoot>
      <div className="form-control">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          
          placeholder=" "
          required
        />
        <label htmlFor={id}>
          {label.split("").map((character, index) => (
            <span
              key={`${id}-${character}-${index}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {character}
            </span>
          ))}
        </label>

        <div className="field-icon">{icon}</div>
      </div>
    </FloatingFieldRoot>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
  event: React.SyntheticEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  setError("");
  setLoading(true);

  try {
    await login(email, password);

    navigate("/dashboard");
  } catch (error) {
    console.error(error);

    setError("Email ou mot de passe incorrect.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage:
          "url('/images/image.png')",
      }}
    >
      <Card className="w-full max-w-xl rounded-xl border border-black/50 bg-black/40 p-5 text-white shadow-2xl backdrop-blur-xl">
        <div className="mx-auto max-w-xs">
          <h1 className="mb-16 text-center text-4xl font-bold">
            LOGIN
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {/* Email */}
            <div className="space-y-1">
              <FloatingField
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                
                label="Email"
                icon={
                  <Mail className="h-6 w-6" />
                }
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <FloatingField
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                
                label="Password"
                icon={
                  <LockKeyhole className="h-6 w-6" />
                }
              />

              <div className="absolute text-right top-65 right-35">
                <button
                  type="button"
                  className="text-sm hover:underline"
                >
                  Forgot Password
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <Checkbox id="remember" />

              <Label
                htmlFor="remember"
                className="text-lg font-semibold"
              >
                Remember Me
              </Label>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-md bg-red-500/20 p-3 text-center text-sm text-red-200">
                {error}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="h-15 w-full rounded-xl bg-black text-lg font-semibold text-white hover:bg-black/80"
            >
              {loading ? "Connexion..." : "Login"}
            </Button>
          </form>

          {/* Register */}
          <div className="mt-4 mb-10 flex items-center justify-between text-mist-50 font-semibold">
            <span>Don't have an Account?</span>

            <Link
              to="/register"
              className="hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </Card>
    </main>
  );
}

const FloatingFieldRoot = styled.div`
  position: relative;

  .form-control {
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px rgba(255, 255, 255, 0.6) solid;
    display: block;
    width: 100%;
    padding: 10px 0;
    padding-right: 5rem;
    font-size: 18px;
    color: #fff;
    outline: 0;
  }

  .form-control input:focus,
  .form-control input:not(:placeholder-shown) {
    border-bottom-color: lightblue;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #fff;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span,
  .form-control input:not(:placeholder-shown) + label span {
    color: lightblue;
    transform: translateY(-30px);
  }

  .field-icon {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    pointer-events: none;
  }
`;