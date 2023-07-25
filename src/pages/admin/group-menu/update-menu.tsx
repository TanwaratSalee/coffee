import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../../../../lib/supabase";

interface MeuName {
  id: number;
  name: string;
}
// interface Addon {
//   id: number;
//   name: string;
//   add_on: MeuName[];
// }
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { nameId } = ctx.query;

  const { data: group } = await supabase
    .from("menu")
    .select(
      `
    id,
    name
  `
    )
    .eq("id", nameId);
  return { props: { group } };
};

const Update = ({ group }: any) => {
  const [groups, setAddon] = useState<MeuName[]>([]);
  const router = useRouter();
  const idname = router.query.nameId;
  const [name, setName] = useState("");

  useEffect(() => {
    setAddon(group);
  }, [group]);

  const submitform = async (e: any) => {
    e.preventDefault();
    const { data: insertData, error: insertError } = await supabase
      .from("menu")
      .update({
        name: name,
      })
      .eq("id", idname);
  };

  const handlename = (value: string) => {
    setName(value);
  };

  return (
    <main className="text-maintopic m-[10px]">
      <form onSubmit={submitform}>
        <h1 className="text-heading text-center p-[50px_20px]">Update Menu</h1>
        <Link
          className="absolute right-[70px] top-[70px] text-[50px]"
          href="../../admin"
        >
          <i className="fa fa-times " aria-hidden="true"></i>
        </Link>
        <div className="bg-slate-200 rounded-3xl m-[0px_60px]">
          <ul>
            {groups &&
              groups.map((group) => (
                <div className="flex justify-center p-[25px_20px]">
                  <label>Name:</label>
                  <input
                    className="rounded-md m-[0px_10px] pl-[20px]"
                    type="text"
                    defaultValue={group.name}
                    onChange={(e) => handlename(e.target.value)}
                  />
                  {/* <li key={group.name}>{group.name}</li> */}
                </div>
              ))}
            <div className="flex justify-center p-[20px_10px]">
              <button
                className="bg-blue-200 w-[140px] h-[50px] text-center mr-[10px]"
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
function eq(arg0: string, id: any) {
  throw new Error("Function not implemented.");
}
