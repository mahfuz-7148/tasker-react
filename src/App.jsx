import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TaskBoard from "./task/TaskBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <div className="flex flex-col justify-center items-center px-4 py-8">
        <HeroSection />
        <TaskBoard />
      </div>
      <Footer />
    </div>
  );
}