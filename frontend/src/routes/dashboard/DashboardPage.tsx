import {
  IconBell,
  IconChevronDown,
  IconHome2,
  IconLayoutGrid,
  IconSearch,
  IconShoppingCart,
  IconHeart,
  IconUserCircle,
  IconSettings,
  IconMessageCircle,
  IconShoppingBag,
  IconMenu2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Dashboard", icon: IconHome2 },
  { label: "Product", icon: IconShoppingCart, active: true },
  { label: "My Cart", icon: IconShoppingBag },
  { label: "Saved items", icon: IconHeart },
  { label: "Profile", icon: IconUserCircle },
  { label: "Settings", icon: IconSettings },
  { label: "Support", icon: IconMessageCircle },
];

const products = [
  { name: "Brown Hoodie", price: 80, oldPrice: 120, tone: "from-[#8d3b39] to-[#6b2221]", shoe: "bg-[#70312f]" },
  { name: "Light T-Shirt", price: 40, oldPrice: 80, tone: "from-[#ff7d2a] to-[#e95d10]", shoe: "bg-[#ff7d2a]" },
  { name: "Orange T-Shirt", price: 80, oldPrice: 130, tone: "from-[#d7a9b0] to-[#c28d99]", shoe: "bg-[#cfa0ad]" },
  { name: "Black T-Shirt", price: 90, oldPrice: 120, tone: "from-[#0f1f35] to-[#18283d]", shoe: "bg-[#0e1d33]" },
  { name: "Black T-Shirt", price: 50, oldPrice: 80, tone: "from-[#111e33] to-[#1f2e45]", shoe: "bg-[#101a2e]" },
  { name: "Light T-Shirt", price: 70, oldPrice: 120, tone: "from-[#80a7d8] to-[#6e96c7]", shoe: "bg-[#7aa0d1]" },
  { name: "Blue T-Shirt", price: 55, oldPrice: 80, tone: "from-[#3654c2] to-[#3048aa]", shoe: "bg-[#3151be]" },
  { name: "Black Hoodie", price: 90, oldPrice: 130, tone: "from-[#131313] to-[#0a0a0a]", shoe: "bg-[#101010]" },
];

const colorDots = ["bg-slate-400", "bg-violet-400", "bg-cyan-400", "bg-orange-400", "bg-slate-100"];

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f7] p-4 text-slate-900 sm:p-5">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1600px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_80px_-45px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
        <aside className="hidden w-[292px] shrink-0 border-r border-slate-200 bg-[#f7f8fb] px-5 py-4 lg:flex lg:flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3 text-[1.1rem] font-medium text-slate-900">
              <IconLayoutGrid size={30} stroke={1.7} />
              <span>MarketElectro</span>
            </div>
            <button type="button" className="rounded-lg p-1.5 text-slate-900 transition hover:bg-white">
              <IconMenu2 size={22} stroke={1.8} />
            </button>
          </div>

          <nav className="mt-7 space-y-1.5 text-[1.04rem]">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={`#${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={cn(
                    "flex items-center gap-4 rounded-xl px-3 py-3 transition",
                    item.active
                      ? "bg-white text-slate-900 shadow-[0_6px_22px_-16px_rgba(15,23,42,0.5)]"
                      : "text-slate-700 hover:bg-white/70",
                  )}
                >
                  <Icon size={26} stroke={1.6} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-auto flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <span>Light</span>
            <div className="flex h-9 w-20 items-center justify-between rounded-full bg-blue-600 px-2 text-white shadow-inner">
              <span className="h-7 w-7 rounded-full bg-white shadow-sm" />
              <span className="pr-1 text-lg leading-none">☀</span>
            </div>
            <span>Dark</span>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col bg-white">
          <header className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
            <label className="flex h-14 w-full max-w-[380px] items-center gap-3 rounded-xl bg-[#d9d9d9] px-4 text-[1rem] text-slate-500 sm:w-auto">
              <IconSearch size={26} stroke={1.7} />
              <input
                aria-label="Search products"
                placeholder="Search"
                className="w-full bg-transparent outline-none placeholder:text-slate-700"
              />
            </label>

            <div className="flex items-center gap-5 text-slate-900">
              <button type="button" className="rounded-full p-2 transition hover:bg-slate-100">
                <IconBell size={24} stroke={1.7} />
              </button>
              <button type="button" className="rounded-full p-2 transition hover:bg-slate-100">
                <IconUserCircle size={24} stroke={1.7} />
              </button>
              <button type="button" className="rounded-md border border-slate-900 p-1.5 transition hover:bg-slate-100">
                <IconChevronDown size={18} stroke={1.8} />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
            <div className="mb-6 flex items-center justify-end">
              <Button className="h-12 rounded-xl bg-blue-600 px-6 text-base text-white hover:bg-blue-700">
                <span className="text-2xl leading-none">+</span>
                Add New
              </Button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product, index) => (
                <article
                  key={`${product.name}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-white px-4 pb-4 pt-3 shadow-[0_6px_24px_-18px_rgba(15,23,42,0.4)]"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
                      <p className="mt-1 text-sm text-slate-400">Classic Nylon</p>
                    </div>
                    <span className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-400">New</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 py-3">
                    <div className={`relative flex h-56 flex-1 items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-b ${product.tone}`}>
                      <div className={`h-36 w-24 rounded-[34%_34%_18%_18%] ${product.shoe} shadow-[0_24px_40px_-26px_rgba(15,23,42,0.55)]`} />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      {colorDots.map((dot) => (
                        <span key={dot} className={cn("h-4 w-4 rounded-full border border-white shadow-sm", dot)} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Tshirt</p>
                      <p className="text-base font-semibold text-slate-900">Unknown</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400 line-through">${product.oldPrice}</p>
                      <p className="text-3xl font-semibold tracking-tight text-slate-900">${product.price}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}