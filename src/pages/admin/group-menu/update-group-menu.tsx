import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../../../../lib/supabase";

interface GroupMenu {
  id: number;
  name: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { groupnameId } = ctx.query;

  const { data: groupname } = await supabase
    .from("group_menu")
    .select(
      `
    id,
    name
  `
    )
    .eq("id", groupnameId);
  return { props: { groupname } };
};

const Update = ({ groupname }: any) => {
  const router = useRouter();
  const idgroupname = router.query.groupnameId;
  const [groupnames, setGroupname] = useState<GroupMenu[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    setGroupname(groupname);
  }, [groupname]);

  const submitform = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("group_menu")
      .update({
        name: name,
      })
      .eq("id", idgroupname);
    router.push("../../admin");
  };

  const handlename = (value: any) => {
    setName(value);
  };

  return (
    <main className="text-maintopic m-[10px]">
      <form onSubmit={submitform}>
        <h1 className="text-heading text-center p-[50px_20px]">
          Update Group Menu
        </h1>
        <Link
          className="absolute right-[70px] top-[70px] text-[50px]"
          href="../../admin"
        >
          <i className="fa fa-times " aria-hidden="true"></i>
        </Link>
        <div className="bg-slate-200 rounded-3xl m-[0px_60px]">
          <ul>
            {groupnames &&
              groupnames.map((groupname) => (
                <div
                  className="flex flex-col items-center justify-center p-[25px_20px]"
                  key={groupname.name}
                >
                  <div>
                    <label>Name:</label>
                    <input
                      className="rounded-md m-[15px_10px] pl-[20px]"
                      type="text"
                      defaultValue={groupname.name}
                      onChange={(e) => handlename(e.target.value)}
                    />
                  </div>
                </div>
              ))}
            <div className="flex justify-center p-[20px_10px]">
              <button
                className="bg-red-200 w-[140px] h-[50px] text-center mr-[10px]"
                type="submit"
              >
                Save{" "}
              </button>

              <button className="bg-slate-500 w-[140px] h-[50px] text-center ml-[10px]">
                <Link href="../../admin">Cancel</Link>
              </button>
            </div>
          </ul>
        </div>
      </form>
    </main>
  );
};

export default Update;
