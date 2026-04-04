import { DestinationCard } from "@/components/ui/card-21";

export default function DestinationCardDemo() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background p-8 md:flex-row md:gap-12">
      <div className="h-[450px] w-full max-w-[320px]">
        <DestinationCard
          imageUrl="https://images.unsplash.com/photo-1524675053444-52c3ca294ad2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGluZG9uZXNpYXxlbnwwfHwwfHx8MA%3D%3D"
          location="Indonesia"
          stats="1,345 Hotels • 24 Packages"
          href="#"
          themeColor="150 50% 25%"
        />
      </div>
      <div className="h-[450px] w-full max-w-[320px]">
        <DestinationCard
          imageUrl="https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1887"
          location="Dubai"
          stats="2,345 Hotels • 54 Packages"
          href="#"
          themeColor="250 50% 30%"
        />
      </div>
    </div>
  );
}
