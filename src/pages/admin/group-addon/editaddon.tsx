import { GetServerSideProps } from "next";
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
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: addon } = await supabase.from("add_on").select(`
    id,
    name
  `);
  return { props: { addon } };
};

const Update = ({ addon }: any) => {
  console.log(addon);
  const router = useRouter();
  const [addons, setAddon] = useState<MeuName[]>([]);
  const { id } = router.query;
  useEffect(() => {
    setAddon(addon);
  }, [addon]);

  return (
    <main className="text-topic">
      <form>
        <h1 className="text-heading text-center font-medium">Add On</h1>
        <ul>
          {addons &&
            addons.map((addon) => (
              <li>
                {addon.name}
                {addon.id}
              </li>
            ))}
        </ul>
      </form>
    </main>
  );
};
export default Update;
