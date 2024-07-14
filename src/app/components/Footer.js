import logoWaldo from "../assets/logo_waldo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="bg-black py-4" translate="no">
        <div className="mx-auto w-10/12 max-w-52 text-center font-bold text-white">
          <div translate="no" id="footer_tag">
            Developed by:
          </div>

          <div className="w-full">
            <a
              href="https://waldohidalgo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={logoWaldo}
                alt="logo waldo"
                width={820}
                height={218}
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
