import Logo from "@/assets/images/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex py-[7px] px-10 border-b border-[#66]">
      <Image src={Logo} height={50} width={110} alt="logo" />
    </header>
  );
}
