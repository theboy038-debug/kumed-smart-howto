import Link from "next/link";

import { ROOM_NOT_FOUND_MESSAGE } from "@/lib/config/ui";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-lg font-medium">{ROOM_NOT_FOUND_MESSAGE}</p>
      <Link href="/" className="text-accent underline">
        กลับสู่หน้าหลัก
      </Link>
    </main>
  );
}
