import ProductHero from "../components/ProductHero";
import WelcomeSection from "@/components/Welcome";
import QuickLinks from "@/components/QuickLinks";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pt-4 px-8 pb-20 gap-8 sm:px-20 sm:pt-4 sm:pb-20">
      <main className="flex flex-col gap-[32px] row-start-2 w-full">
        <ProductHero /> {}
        <WelcomeSection /> {}
        <QuickLinks /> {}
       

       
      </main>
      
       
     
    </div>
  );
}
