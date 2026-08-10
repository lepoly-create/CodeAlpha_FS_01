import { IconBrandGoogleFilled, IconBrandAppleFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import heroImage from "../../assets/Page-login up.png";

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex h-16 w-full items-center justify-center gap-5 rounded-xl bg-black px-5 text-lg font-semibold text-white transition-transform hover:scale-[1.01]"
    >
      <span className="flex items-center justify-center text-white">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export function SignupPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat text-slate-900"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="min-h-screen bg-white/15 px-4 py-6 md:px-8 md:py-8">
        <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl items-center justify-center">
          <div className="grid w-full overflow-hidden rounded-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02)] lg:grid-cols-2">
            <aside className="hidden min-h-[760px] bg-transparent px-10 py-14 text-white lg:flex lg:flex-col lg:justify-between">
              <div />
              <div className="space-y-10 pb-10">
                <div className="space-y-6 text-[clamp(3rem,7vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
                  <p>WELCOME</p>
                  <p>TO THE</p>
                  <p>MARKETELECTRO</p>
                </div>
              </div>
            </aside>

            <div className="flex min-h-[760px] flex-col justify-center bg-white px-6 py-10 sm:px-10 lg:px-12">
              <div className="mx-auto w-full max-w-[620px]">
                <h1 className="text-center text-5xl font-semibold tracking-[-0.05em] text-black">Sign Up</h1>

                <form className="mt-10 space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="h-14 rounded-xl bg-[#d9d9d9] px-4 text-[1.05rem] outline-none placeholder:text-slate-800"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="h-14 rounded-xl bg-[#d9d9d9] px-4 text-[1.05rem] outline-none placeholder:text-slate-800"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email address"
                    className="h-14 w-full rounded-xl bg-[#d9d9d9] px-4 text-[1.05rem] outline-none placeholder:text-slate-800"
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <input
                      type="password"
                      placeholder="Password"
                      className="h-14 rounded-xl bg-[#d9d9d9] px-4 text-[1.05rem] outline-none placeholder:text-slate-800"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="h-14 rounded-xl bg-[#d9d9d9] px-4 text-[1.05rem] outline-none placeholder:text-slate-800"
                    />
                  </div>

                  <label className="flex items-center gap-3 px-1 text-[1.02rem] font-semibold text-slate-900">
                    <input type="checkbox" className="h-5 w-5 rounded border-slate-900 text-slate-900 focus:ring-0" />
                    Accept Terms &amp; Conditions
                  </label>

                  <button
                    type="submit"
                    className="flex h-16 w-full items-center justify-center rounded-xl bg-black text-lg font-semibold text-white transition-transform hover:scale-[1.01]"
                  >
                    JOIN US
                  </button>

                  <div className="relative py-4 text-center text-[1.05rem] font-semibold text-black">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-slate-400" />
                    <span className="relative bg-white px-4">or</span>
                  </div>

                  <div className="space-y-4">
                    <SocialButton icon={<IconBrandGoogleFilled size={26} />} label="Sign with Google" />
                    <SocialButton icon={<IconBrandAppleFilled size={26} />} label="Sign with Apple" />
                  </div>

                  <div className="pt-2 text-center text-[1.02rem] font-medium text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-slate-900 underline-offset-4 hover:underline">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}