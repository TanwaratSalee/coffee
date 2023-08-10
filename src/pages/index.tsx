import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
export interface Detailprofile {
  full_name: string;
  email: string;
  phone: number;
  uid: number;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: user } = await supabase.from("users").select();

  return { props: { user } };
};
export default function Profile({ user }: any) {
  const [profile, setProfile] = useState<any>([]);

  const [full_name, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userid, setUserid] = useState<any[]>(user);
  const onSubmit = async () => {
    // รีเฟรซ
    // e.preventDefault();

    const { data: insertData, error: insertError } = await supabase
      .from("users")
      .insert({
        full_name,
        email,
        phone,
        uid: profile.userId,
      })
      .select();
  };

  // useEffect(() => {

  //   userid.forEach((name: any) => {});
  //   // userid.foreach((useri: any) => {
  //   //   const findUid = useri.find((it: any) => it.uid == profile.userId);
  //   //   console.log(findUid);
  //   //
  // }, [userid]);

  useEffect(() => {
    const initlfit = async () => {
      const liff = (await import("@line/liff")).default;
      await liff.ready;
      if (liff.isLoggedIn()) {
        const profileliff = await liff.getProfile();
        setProfile(profileliff);
      }
    };
    initlfit();
  }, []);
  // if (profile != null) {
  //   const findUid = userid.filter((it: any) => it.uid == profile.userId);
  //   console.log(findUid);
  // }

  return (
    <section className="max-w-[1110px] m-auto">
      <div className="flex justify-center p-[0px_20px_25px_20px] mt-[40px] text-maintopic">
        Welcome {profile?.displayName}
      </div>
      <div>
        {profile.pictureUrl && (
          <Image
            src={profile.pictureUrl}
            alt={profile.displayName}
            width={500}
            height={500}
            priority={true}
            className="rounded-full flex justify-center m-auะน"
          />
        )}

        <div className="flex justify-center p-[0px_20px_25px_20px] mt-[40px]">
          <label>Full Name:</label>
          <input
            className="rounded-md m-[0px_10px]"
            type="text"
            name="name"
            value={full_name ?? ""}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex justify-center p-[0px_20px_25px_20px] mt-[40px]">
          <label>Email:</label>
          <input
            className="rounded-md m-[0px_10px]"
            type="email"
            name="name"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center p-[0px_20px_25px_20px] mt-[40px]">
          <label>Phone number:</label>
          <input
            className="rounded-md m-[0px_10px]"
            type="text"
            name="name"
            value={phone ?? ""}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex justify-center p-[20px_10px]">
          <button
            className="bg-blue-200 w-[140px] h-[50px] text-center mr-[10px]"
            type="submit"
            onClick={onSubmit}
          >
            Save
          </button>
          <button className="bg-slate-500 w-[140px] h-[50px] text-center ml-[10px]">
            <Link href="../../admin">Cancel</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
