import MaxWidthContainer from "./components/MaxWidthContainer";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProperCountdown from "./components/proper-countdown/page";

function App() {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col justify-between">
        <Navbar />

        <div className="w-full grow py-10">
          <MaxWidthContainer>
            <ProperCountdown />
          </MaxWidthContainer>
        </div>

        <MaxWidthContainer>
          <Footer />
        </MaxWidthContainer>
      </main>
    </>
  );
}

export default App;
