import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* div1 */}
      <div className="flex w-full lg:w-1/2 min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            href={"/"}
            className="flex items-center gap-2 self-center font-medium"
          >
            <Image src={"/logos/logo.svg"} alt="logo" height={30} width={30} />
            NexusFlow
          </Link>
          {children}
        </div>
      </div>
      {/* div2 */}
      <div className="hidden lg:flex lg:w-1/2 min-h-svh relative">
        <Image
          src={"/backimg2.png"}
          alt="image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
