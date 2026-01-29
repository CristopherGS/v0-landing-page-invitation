import { Navigation } from "@/components/wedding/navigation";
import { HeroSection } from "@/components/wedding/hero-section";
import { OurStory } from "@/components/wedding/our-story";
import { Countdown } from "@/components/wedding/countdown";
import { EventDetails } from "@/components/wedding/event-details";
import { Itinerary } from "@/components/wedding/itinerary";
import { DressCode } from "@/components/wedding/dress-code";
import { PhotoGallery } from "@/components/wedding/photo-gallery";
import { GiftRegistry } from "@/components/wedding/gift-registry";
import { FAQ } from "@/components/wedding/faq";
import { RSVPForm } from "@/components/wedding/rsvp-form";
import { Footer } from "@/components/wedding/footer";
import { MusicPlayer } from "@/components/wedding/music-player";
import { Accommodation } from "@/components/wedding/accommodation";
import { SmoothScrollProvider } from "@/components/wedding/smooth-scroll-provider";
import { Toaster } from "sonner";

import { Preloader } from "@/components/wedding/preloader";

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

        <Itinerary id="itinerario" />

        <Accommodation id="hospedaje" />

        <DressCode />

        <PhotoGallery id="galeria" />

        <GiftRegistry id="regalos" />

        <FAQ id="faq" />

        <RSVPForm id="rsvp" />
        <Footer />
        <MusicPlayer />
      </main>
    </SmoothScrollProvider>
  );
}
