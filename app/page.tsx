import Display, { SixteenSegmentText } from "@/components/Segment";

export default function Home() {
  const statement = "Hello Elisabeth";

  return (
    <main className="flex min-h-screen items-center justify-center p-24 flex-wrap text-xs">
      <SixteenSegmentText text={statement} />
    </main>
  );
}
