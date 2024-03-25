import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 font-vazir ">
      <div className="space-y-6 text-center">
        <h1 className="drop-shadow-md text-5xl text-white font-bold">احراز هویت</h1>
        <p className="text-white ">سیستم احراز هویت  پیشرفته</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">ورود </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
