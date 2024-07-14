import Image from "next/image";

const listUsers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
];

async function listStreamingProfiles() {
  let urlAPIStream = "https://twitch-proxy.freecodecamp.rocks/helix/streams?";

  for (let i = 0; i < listUsers.length; i++) {
    if (i == listUsers.length - 1) {
      urlAPIStream += `user_login=${listUsers[i]}`;
    } else {
      urlAPIStream += `user_login=${listUsers[i]}&`;
    }
  }
  const response = await fetch(urlAPIStream);
  const data = await response.json();
  const streamingProfiles = data.data;

  return streamingProfiles?.map((profile) => {
    return {
      user_id: profile.user_id,
      user_login: profile.user_login,
      title: profile.title,
    };
  });
}

async function ListProfilesData() {
  let urlAPIProfile = "https://twitch-proxy.freecodecamp.rocks/helix/users?";
  for (let i = 0; i < listUsers.length; i++) {
    if (i == listUsers.length - 1) {
      urlAPIProfile += `login=${listUsers[i]}`;
    } else {
      urlAPIProfile += `login=${listUsers[i]}&`;
    }
  }

  const response = await fetch(urlAPIProfile);
  const data = await response.json();
  const profiles = data.data;
  return profiles
    ?.map((profile) => {
      return {
        user_id: profile.id,
        user_login: profile.login,
        profile_image_url: profile.profile_image_url,
      };
    })
    .sort(function (a, b) {
      let x = a.user_login.toLowerCase();
      let y = b.user_login.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
}

async function createListProfiles() {
  const [profiles, streamingProfiles] = await Promise.all([
    ListProfilesData(),
    listStreamingProfiles(),
  ]);

  return profiles.map((profile) => {
    const streamingProfile = streamingProfiles.find(
      (streamingProfile) => streamingProfile.user_id === profile.user_id
    );
    const objProfile = {
      user_id: profile.user_id,
      user_login: profile.user_login,
      profile_image_url: profile.profile_image_url,
      title: streamingProfile ? streamingProfile.title : "-",
      isOnline: streamingProfile ? true : false,
    };

    return objProfile;
  });
}

export default async function ListProfiles() {
  try {
    const listProfiles = await createListProfiles();
    return (
      <div className="mt-5">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1200px] mx-auto">
          {listProfiles.map((profile) => (
            <li
              key={profile.user_id}
              className="flex flex-col items-center justify-center border border-black p-[10px] rounded-lg shadow-2xl bg-white hover:bg-black/70 hover:text-white group"
            >
              <div className="rounded-full overflow-hidden">
                <Image
                  src={profile.profile_image_url}
                  alt={profile.user_login}
                  width={50}
                  height={50}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPg/EwACoQGa1Uf3vwAAAABJRU5ErkJggg=="
                />
              </div>
              <div>
                User:{" "}
                <span className="font-bold">
                  <a
                    href={`https://twitch.tv/${profile.user_login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 group-hover:text-[#ffff00]"
                  >
                    {profile.user_login}
                  </a>
                </span>
              </div>
              <div>
                Status:{" "}
                <span className="font-bold">
                  {profile.isOnline ? "Online ✅" : "Offline ❌"}
                </span>
              </div>
              {profile.isOnline && (
                <div className="text-center flex flex-col">
                  <h3>Current Streaming Title:</h3>
                  <p className="font-bold">
                    {profile.title.length > 50
                      ? profile.title.slice(0, 50) + "..."
                      : profile.title}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return (
      <div className="mt-5 text-red-600 text-center text-xl">
        Error: {error.message}
      </div>
    );
  }
}
