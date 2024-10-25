'use client';

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header/>
      <div className="container mx-auto px-4 py-10">
        <h1
          className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Privacy Policy
        </h1>
        <p className="leading-7 mt-6">
          Welcome to MRRTracker. This Privacy Policy explains how we handle your
          personal
          information to provide a safe and secure experience.
        </p>

        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Information We Collect
        </h2>
        <p className="leading-7 mt-6">
          We collect various types of information, including:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Personal identification information (Name, email address, etc.)
          </li>
          <li>Payment information for transactions.</li>
          <li>Usage data to enhance your experience.</li>
        </ul>

        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          How We Use Your Information
        </h2>
        <p className="leading-7 mt-6">
          Your information helps us improve our services, process transactions,
          and optimize
          user experience. We do not share your information with third parties
          unless necessary.
        </p>

        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Your Rights
        </h2>
        <p className="leading-7 mt-6">
          Depending on your location, you may have rights to access, update, or
          delete your
          data. Contact us at <a href="mailto:contact@mrrtracker.app"
                                 className="font-medium text-primary underline underline-offset-4">contact@mrrtracker.app</a>.
        </p>

        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Changes to This Policy
        </h2>
        <p className="leading-7 mt-6">
          We may update this Privacy Policy. Any changes will be posted here, so
          please check
          back periodically.
        </p>
      </div>
      <Footer />
    </>
  );
}
