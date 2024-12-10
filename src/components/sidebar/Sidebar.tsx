import { useEventListeners } from "@/hooks/use-event-listeners";
import { useToggle } from "@/hooks/use-toggle";
import { Icons } from "@/icons/Icons";
import { createPortal } from "react-dom";

export const Sidebar = () => {
  const { isToggled, onToggle, onUntoggle } = useToggle();
  useEventListeners({
    eventListeners: [
      {
        eventName: "resize",
        handler: onUntoggle,
      },
    ],
  });

  return (
    <>
      <aside className="mx-auto flex shrink-0 flex-col items-center justify-start bg-slate-900 px-4 py-3 text-slate-400">
        <div className="flex h-auto max-w-16 flex-1 flex-col items-center justify-start gap-2 divide-y-[1px] divide-slate-700 self-stretch rounded-lg border-[1px] border-slate-600 bg-slate-900 p-2">
          <div className="">
            <button className="relative flex size-12 items-center justify-center rounded-full border-[1px] border-slate-600">
              <Icons.SEARCH className="size-8" />
            </button>
          </div>
          <div className="flex h-auto flex-1 flex-col gap-2 self-stretch py-2">
            <a
              href="https://adventofcode.com/2024/"
              className="relative size-12"
            >
              <img
                alt="advent-logo"
                width={48}
                height={48}
                src="/public/favicon.png"
                className="rounded-full border-[1px] border-slate-600"
                content="fill"
              ></img>
            </a>
            <Icons.GITHUB className="size-12" />
          </div>
          <div className="">
            <Icons.LOGO className="size-12" />
          </div>
          {/* <SidebarHeader onClose={onClose} />
          <SidebarNavigation />
          <SidebarFooter /> */}
        </div>
      </aside>
      {isToggled &&
        createPortal(
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-screen w-screen backdrop-blur-sm lg:hidden"
            onClick={onUntoggle}
          >
            Hey now
          </div>,
          document.getElementById("root")!,
        )}
    </>
  );
};
