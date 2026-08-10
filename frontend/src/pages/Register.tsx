import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { register } from "@/services/auth.service";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!acceptTerms) {
      setError("Vous devez accepter les conditions.");
      return;
    }

    setLoading(true);

    try {
      await register({
        fullName,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);

      setError(
        "Impossible de créer le compte. Vérifiez vos informations.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Partie gauche */}
      <section
        className="relative hidden bg-cover bg-center lg:flex"
        style={{
          backgroundImage:
            "url('/images/image.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 flex flex-col justify-center px-10 text-white">
          <h1 className="text-6xl font-bold tracking-wide">
            WELCOME<br /> <br /> 
            TO THE <br /> <br /> 
            MARKETELECTRO
          </h1>
        </div>
      </section>

      {/* Partie droite */}
      <section className="flex min-h-screen items-center justify-center px-2 py-2">
        <Card className="w-full max-w-xl">
          <div className="space-y-1">
            <h2 className="mt-0 mb-1 text-center text-4xl font-bold">
              Sign Up
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                className="h-13 rounded border-0 bg-neutral-200 px-2 text-lg"
                required
              />

              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="h-13 rounded border-0 bg-neutral-200 px-2 text-lg"
                required
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                className="h-13 rounded border-0 bg-neutral-200 px-2 text-lg"
                required
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                className="h-13 rounded border-0 bg-neutral-200 px-2 text-lg"
                required
              />

              <div className="flex items-center gap-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) =>
                    setAcceptTerms(checked === true)
                  }
                />

                <label
                  htmlFor="terms"
                  className="text-sm font-semibold"
                >
                  Accept Terms & Conditions
                </label>
              </div>

              {error && (
                <p className="rounded-lg bg-red-100 p-3 text-center text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="h-16 w-full rounded-xl bg-black text-lg font-semibold hover:bg-black/80"
              >
                {loading ? "Creating account..." : "JOIN US"}
              </Button>
            </form>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-black" />
              <span className="font-semibold">or</span>
              <div className="h-px flex-1 bg-black" />
            </div>

            <Button
              type="button"
              className="h-16 w-full rounded-xl bg-black text-lg hover:bg-black/80"
            >
              Sign with Google
            </Button>

            

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-black hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </Card>
      </section>
    </main>
  );
}