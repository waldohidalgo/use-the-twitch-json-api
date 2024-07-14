import ListProfiles from "./components/ListProfiles";

export default function Home() {
  return (
    <>
      <header className="py-6 bg-gray-300">
        <h1 className="text-3xl font-bold text-center underline">
          Use the Twitch JSON API
        </h1>
        <p className="text-center max-w-[800px] mx-auto mt-6">
          The following users:{" "}
          <span className="font-bold">
            ESL_SC2, OgamingSC2, cretetion, freecodecamp, storbeck, habathcx,
            RobotCaleb, noobs2ninjas
          </span>{" "}
          are requested from the{" "}
          <a
            href="https://twitch-proxy.freecodecamp.rocks/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-bold"
          >
            Free Code Camp Twitch API Pass-through
          </a>
        </p>
      </header>
      <main className="p-6 bg-amber-100">
        <h2 className="text-2xl text-center font-bold">
          {" "}
          List of Profiles using the Twitch JSON API{" "}
        </h2>
        <ListProfiles />
      </main>
    </>
  );
}
