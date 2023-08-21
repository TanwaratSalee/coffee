import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [full_name, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userid, setUserid] = useState<any[]>(user);
  const onSubmit = async () => {
    // รีเฟรซ
    // e.preventDefault();
    router.push("/user");

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

  useEffect(() => {
    const findUid = userid?.filter((it: any) => it.uid == profile.userId);
    if (profile != null && findUid.length) {
      router.push("/user");
    }
  }, [profile]);

  useEffect(() => {
    const initlfit = async () => {
      const liff = (await import("@line/liff")).default;
      await liff.ready;
      if (liff.isLoggedIn()) {
        const profileliff = await liff.getProfile();
        setProfile(profileliff);
        localStorage.setItem("userId", profileliff.userId);
      }
    };
    initlfit();
  }, []);

  return (
    <section className=" bg-gradient-to-t from-[#bec975] to-white">
      <div className="max-w-[860px] m-auto h-[100vh]">
        <h1 className="pt-[100px] text-[100px] text-center font-medium">
          Hello {profile?.displayName}
        </h1>
        <h2 className="text-[40px] text-center font-light pt-[20px] pb-[40px]">
          Welcome to CJWORX cafe
        </h2>
        <div className="bg-white rounded-2xl mx-[40px] py-[30px] ">
          {profile.pictureUrl && (
            <Image
              src={profile.pictureUrl}
              alt={profile.displayName}
              width={400}
              height={400}
              priority={true}
              className="rounded-full m-auto w-auto h-[200px]"
            />
          )}
          <div className="grid grid-cols-9 grid-row-7 items-center justify-center pt-[40px] text-namedrink">
            <h1 className="text-topic pb-[30px] text-center col-start-3	col-end-8 my-[10px]	row-start-1	">
              Information
            </h1>
            <div className="col-start-3	col-end-8 mt-[20px]	row-start-2	">
              Full Name
            </div>
            <input
              className="bg-[#f3f1f1] rounded-lg text-black  p-[5px_10px] col-start-3	col-end-8 my-[10px]	row-start-3"
              type="text"
              name="name"
              value={full_name ?? ""}
              placeholder="Enter Your Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <div className="col-start-3	col-end-8 mt-[20px]	row-start-4">
              Email
            </div>
            <input
              className="bg-[#f3f1f1] rounded-lg  text-black  p-[5px_10px] col-start-3	col-end-8 my-[10px]	row-start-5"
              type="email"
              name="email"
              value={email ?? ""}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="col-start-3	col-end-8 mt-[20px]	row-start-6">
              Phone Number
            </div>
            <input
              className="bg-[#f3f1f1] rounded-lg  text-black p-[5px_10px] col-start-3	col-end-8 my-[10px]	row-start-7"
              type="text"
              name="name"
              value={phone ?? ""}
              placeholder="Enter Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex justify-center pt-[100px] text-black text-maintopic max-w-[860px] ">
            <button
              className="bg-[#def25e] h-[60px] text-center mr-[10px] w-2/5"
              type="submit"
              onClick={onSubmit}
            >
              Save
            </button>
            <button className="bg-slate-300 h-[60px] text-center ml-[10px] w-2/5">
              <Link href="../../admin">Cancel</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
