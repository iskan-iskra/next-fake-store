import fs from "fs";
import Image from "next/image";
import path from "path";

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
}

export async function getAllData() {
  const filePath = path.join(process.cwd(), "public", "mockDB.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const products: Product[] = JSON.parse(fileData);

  return {
    title: "Product List",
    description: "A list of products fetched from the mock database",
    products,
  };
}
export default async function Home() {
  const { products }: { products: Product[] } = await getAllData();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div>
        <h1>Product List</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>Category: {product.category}</p>
              <p>{product.description}</p>
              <p>
                Price: {product.currency} {product.price}
              </p>
              <p>Rating: {product.rating}</p>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
