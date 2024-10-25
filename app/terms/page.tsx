'use client';

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermsOfService() {
  return (
    <>
      <Header/>
      <div className="container mx-auto px-4 py-10">
        <h1
          className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Terms of Service
        </h1>
        <p className="leading-7 mt-6">
          These Terms of Service govern your use of the MRRTracker website and
          services. By
          using our services, you agree to these terms.
        </p>

        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Accounts and Responsibilities
        </h2>
        <p className="leading-7 mt-6">
          You are responsible for keeping your account information secure.
          Please provide
          accurate information when creating an account.
        </p>

        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Prohibited Activities
        </h2>
        <p className="leading-7 mt-6">
          You agree not to engage in activities that are unlawful, infringe on
          intellectual
          property rights, or disrupt MRRTracker's operations.
        </p>

        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Termination of Service
        </h2>
        <p className="leading-7 mt-6">
          We reserve the right to suspend or terminate your access to our
          services if we find
          a violation of these terms.
        </p>

        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Limitation of Liability
        </h2>
        <p className="leading-7 mt-6">
          MRRTracker is not liable for any damages or losses resulting from your
          use of our
          platform. All services are provided "as-is."
        </p>

        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Changes to Terms
        </h2>
        <p className="leading-7 mt-6">
          We may modify these Terms of Service. Continued use of our platform
          indicates
          acceptance of the new terms.
        </p>
      </div>
      <Footer />
    </>
  );
}
