import Link from "next/link";

export default function navmenu() {
  return (
    <main className="text-base bg-[#212325] text-white flex">
      <Link href="/admin/order" className=" p-[10px_10px]">
        Order
      </Link>
      <Link href="/admin/menu" className=" p-[10px_10px]">
        Create and Edit Menu
      </Link>
    </main>
  );
}
