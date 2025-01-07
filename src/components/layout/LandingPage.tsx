import { Button } from "../ui/button";

export default function LandingPage() {
  return (
    <section className="h-screen py-24">
      <div className="container mx-auto max-w-7xl ">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-center tracking-tighter py-2 font-medium md:text-7xl max-w-5xl">
            Manage Your Yearly Goals with Ease and Simple Tracking
          </h1>
          <p className="text-lg my-6 max-w-lg text-center">
            Track Tasks, Coordinate Teams, and Monitor Performance - All in One
            Place!
          </p>
          <Button>Get Started</Button>
        </div>
      </div>
    </section>
  );
}
