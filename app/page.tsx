import { Navigation } from "@/components/wedding/navigation";
import { HeroSection } from "@/components/wedding/hero-section";
import { OurStory } from "@/components/wedding/our-story";
import { Countdown } from "@/components/wedding/countdown";
import { EventDetails } from "@/components/wedding/event-details";
import { Itinerary } from "@/components/wedding/itinerary";
import { PhotoGallery } from "@/components/wedding/photo-gallery";
import { GiftRegistry } from "@/components/wedding/gift-registry";
import { RSVPForm } from "@/components/wedding/rsvp-form";
import { Footer } from "@/components/wedding/footer";
import { MusicPlayer } from "@/components/wedding/music-player";
import { Accommodation } from "@/components/wedding/accommodation";
import { SmoothScrollProvider } from "@/components/wedding/smooth-scroll-provider";
import { Preloader } from "@/components/wedding/preloader";
import { Toaster } from "sonner";

export default function WeddingInvitation() {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <main className="min-h-screen overflow-x-hidden">
        <Navigation />
        <HeroSection />

        <OurStory id="historia" />

        <Countdown />

        <EventDetails id="evento" />

        {/*<Itinerary id="itinerario" />*/}

        <Accommodation id="hospedaje" />

        <PhotoGallery id="galeria" />

        <GiftRegistry id="regalos" />

        <RSVPForm id="rsvp" />
        <Footer />
        <MusicPlayer />
      </main>
    </SmoothScrollProvider>
  );
}
