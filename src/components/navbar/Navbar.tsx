import { Icons } from "@/icons/Icons";

export const Navbar = () => {
  return (
    <header className="box-border flex h-14 w-screen items-center justify-between bg-slate-900 px-4 py-3 text-sm sm:px-6 md:hidden md:px-8">
      <Icons.LOGO />
      <div className="flex w-fit justify-end gap-2 md:gap-4">Hi</div>
    </header>
  );
};
