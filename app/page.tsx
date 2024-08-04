import Display from "@/components/Segment";

import Image from "next/image";

export default function Home() {
  const statement = "wxyz";
  const displayMap = statement.split("").map((char) => char.toUpperCase());
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      {displayMap.map((char) => {
        return <Display input={char} key={char} />;
      })}
    </main>
  );
}
