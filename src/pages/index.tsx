import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export interface Detailprofile {
  full_name: string;
  email: string;
  phone: number;
}

export default function Profile() {
  const [profile, setProfile] = useState<any>([]);
  const [full_name, setFullName] = useState("");

  const onSubmit = async (full_name: string, email: string, phone: number) => {
    const { data: insertData, error: insertError } = await supabase
      .from("user")
      .insert({
        full_name: full_name,
        email: email,
        phone: phone,
      })
      .select();
  };

  useEffect(() => {
    const initlfit = async () => {
      const liff = (await import("@line/liff")).default;
      await liff.ready;
      const profileliff = await liff.getProfile();
      setProfile(profileliff);
    };
    initlfit();
  }, []);

  return (
    <section>
      {/* <h1>Profile</h1> */}
      <div>
        <form>
          {/* {profile.pictureUrl && (
          <Image
            src={profile.pictureUrl}
            alt={profile.displayName}
            width={500}
            height={500}
          />
        )} */}
          <div>Name: {profile?.displayName}</div>
          <div className="flex justify-center p-[0px_20px_25px_20px] mt-[40px]">
            <label>Name:</label>
            <input
              className="rounded-md m-[0px_10px]"
              type="text"
              name="name"
              value={full_name ?? ""}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
