import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    where: { parent: { exists: false } },
    limit: 100,
  });

  const payloadById = await payload.findByID({
    collection: "categories",
    id: "6a2c3bcb25445f14ce1fccac",
    select: {
      parent: false,
      subcategories: false,
    },
  });

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <br />
      <h1>BY ID</h1>
      <pre>{JSON.stringify(payloadById, null, 2)}</pre>
    </div>
  );
}
