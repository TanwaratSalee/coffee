import Link from "next/link";

export default function navmenu() {
  return (
    <main className="max-w-[1080px] m-auto py-[30px] flex justify-center gap-[80px] text-namedrink bg-[#C8E31C] ">
      <Link href="/admin/order" className="cursor-pointer	">
        Order
      </Link>
      <Link href="/admin" className="cursor-pointer	">
        Create and Edit Menu
      </Link>
      <Link href="/admin/history" className="cursor-pointer	">
        History
      </Link>
      <div className=""></div>
    </main>
  );
}
