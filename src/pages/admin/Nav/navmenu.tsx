import Link from "next/link";

export default function navmenu() {
  return (
    <main className="bg-[#212325] py-[30px]  text-white flex justify-center gap-[40px] text-maintopic">
      <Link href="/admin/order">Order</Link>
      <Link href="/admin">Create and Edit Menu</Link>
      <Link href="/admin/history">History</Link>
    </main>
  );
}
