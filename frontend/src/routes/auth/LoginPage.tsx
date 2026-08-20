import { IconMail, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import heroImage from "../../assets/Page-login In.png";

export function LoginPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="min-h-screen bg-black/20 px-4 py-6 md:px-8 md:py-8">
        <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center">
          <div className="w-full max-w-195 overflow-hidden rounded-[32px] border border-white/20 bg-white/15 shadow-[0_24px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <div className="grid min-h-180 lg:grid-cols-[1.05fr_1fr]">
              <div className="hidden flex-col justify-between bg-transparent px-10 py-10 text-white lg:flex">
                <div />
                <div className="space-y-8 pb-10">
                  <div className="space-y-4 text-[clamp(3rem,7vw,5.4rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                    <p>WELCOME</p>
                    <p>TO THE</p>
                    <p>MARKETELECTRO</p>
                  </div>
                </div>
              </div>

              <div className="flex h-full flex-col justify-center bg-[#f9f9f9] px-6 py-10 text-slate-900 sm:px-10">
                <div className="mx-auto w-full max-w-130">
                  <h1 className="text-center text-4xl font-semibold tracking-[-0.04em] text-black">LOGIN</h1>

                  <form className="mt-12 space-y-8">
                    <label className="group block">
                      <span className="mb-2 block text-[1.05rem] font-semibold tracking-wide text-white/0">Email</span>
                      <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-800 pb-2 text-slate-900">
                        <input
                          type="email"
                          placeholder="Email"
                          className="bg-transparent text-2xl font-semibold outline-none placeholder:text-slate-900"
                        />
                        <IconMail size={28} stroke={1.8} className="text-black" />
                      </div>
                    </label>

                    <label className="group block">
                      <span className="mb-2 block text-[1.05rem] font-semibold tracking-wide text-white/0">Password</span>
                      <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-800 pb-2 text-slate-900">
                        <input
                          type="password"
                          placeholder="Password"
                          className="bg-transparent text-2xl font-semibold outline-none placeholder:text-slate-900"
                        />
                        <IconLock size={28} stroke={1.8} className="text-black" />
                      </div>
                    </label>

                    <div className="flex items-center justify-between gap-4">
                      <label className="flex items-center gap-3 text-[1.05rem] font-semibold text-slate-900">
                        <input type="checkbox" className="h-5 w-5 rounded border-slate-900 text-slate-900 focus:ring-0" />
                        Remember Me
                      </label>

                      <a href="#forgot-password" className="text-[1.05rem] text-slate-900">
                        Forgot <span className="font-semibold">Password</span>
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="mt-2 flex h-16 w-full items-center justify-center rounded-xl bg-black text-lg font-semibold text-white transition-transform hover:scale-[1.01]"
                    >
                      Login
                    </button>

                    <div className="flex items-center justify-between pt-8 text-[1.05rem] font-semibold text-slate-900">
                      <span>Don’t have an Account?</span>
                      <Link to="/signup" className="text-slate-900 underline-offset-4 hover:underline">
                        Register
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}