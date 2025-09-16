import AboutSection from "@/sections/aboutSection/AboutSection";
import Banner from "@/sections/banner/Banner";
import BlogSection from "@/sections/blogsSection/BlogsSection";
import ContactForm from "@/sections/contact/ContactForm";
import FAQs from "@/sections/fags/FAQs";
import Footer from "@/sections/footer/Footer";
import HeroSection from "@/sections/heroSection/HeroSection";
import LogoBar from "@/sections/logobar/LogoBar";
import FeatureSection from "@/sections/projectSection/featuredProject";
import ProjectsSection from "@/sections/projectSection/ProjectSection";
import ServiceSection from "@/sections/serviseSection/ServiseSection";
import TeamMembers from "@/sections/teamMember/TeamMembers";
import ToolTechnologies from "@/sections/technologyies/ToolTechnologies";
import TestimonialsSection from "@/sections/testimonials/Testimonials";
import WhyCureLogics from "@/sections/whycurelogics/WhyCurelogics";
import React from "react";

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServiceSection />
      </div>
      <div>
        <Banner />
      </div>
      <div id="projects">
        <FeatureSection />
        <ProjectsSection />
      </div>
      <div id="team">
        <TeamMembers />
      </div>
      <div>
        <ToolTechnologies />
      </div>
      <div>
        <LogoBar />
      </div>
      <div>
        <WhyCureLogics />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="blogs">
        <BlogSection />
      </div>
      <div>
        <FAQs />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
