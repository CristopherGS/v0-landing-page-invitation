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
import { Toaster } from "sonner";

export default function WeddingInvitation() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      
      <section id="historia">
        <OurStory />
      </section>
      
      <Countdown />
      
      <section id="evento">
        <EventDetails />
      </section>
      
      <section id="itinerario">
        <Itinerary />
      </section>
      
      <DressCode />
      
      <section id="galeria">
        <PhotoGallery />
      </section>
      
      <section id="regalos">
        <GiftRegistry />
      </section>
      
      <section id="faq">
        <FAQ />
      </section>
      
      <RSVPForm />
      <Footer />
      <MusicPlayer />
      <Toaster position="top-center" richColors />
    </main>
  );
}
