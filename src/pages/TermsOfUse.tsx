// src/pages/TermsOfUse.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const TermsOfUse: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Terms of Use</h1>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p className="text-sm text-gray-500">Last Updated: July 3, 2025</p>
            
            <p>
              Welcome to our Virginia political news service. These Terms of Use ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
            </p>

            <h2 className="mt-8">1. Description of Service</h2>
            <p>
              The Service provides users with access to Virginia political news, analysis, community discussion forums, and tiered membership plans such as "Political Observer", "Capitol Insider", and "Political Elite". Features vary by membership level and are subject to change.
            </p>

            <h2 className="mt-8">2. User Accounts and Memberships</h2>
            <p>
              To access certain features, you must register for an account and select a membership plan. You agree to provide accurate, current, and complete information during the registration process. You are responsible for safeguarding your password and for all activities that occur under your account. All membership plans are subscriptions that will auto-renew on a monthly or yearly basis, depending on your selection. You may cancel your free trial or subscription at any time, as described on our Memberships page.
            </p>

            <h2 className="mt-8">3. User Conduct and Responsibilities</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
              <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
              <li>Violate any applicable local, state, national, or international law.</li>
              <li>Infringe upon the intellectual property rights of others.</li>
            </ul>
            <p>
              We reserve the right to terminate accounts that violate these rules.
            </p>
            
            <h2 className="mt-8">4. Use of Character Credits</h2>
            <p>
              Certain membership tiers grant "character credits" for use in political discussion forums. These credits allow for posting as fictional, anonymous personas. This feature is intended to foster diverse discussion and must not be used for harassment, spreading misinformation, or any other activity that violates our User Conduct policy. Unused credits may expire according to the terms of your specific plan.
            </p>

            <h2 className="mt-8">5. Intellectual Property</h2>
            <p>
              All content provided on the Service, including text, graphics, logos, and articles, is the property of the Service or its content suppliers and protected by international copyright laws. You may not reproduce, distribute, or create derivative works from this content without our express written permission.
            </p>

            <h2 className="mt-8">6. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h2 className="mt-8">7. Disclaimer of Warranties and Limitation of Liability</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or implied, regarding the operation or availability of the Service or the information, content, or materials included therein. In no event shall we be liable for any damages arising from the use of this Service.
            </p>
            
            <h2 className="mt-8">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h2 className="mt-8">9. Contact Information</h2>
            <p>
              For any questions about these Terms, please contact us through the information provided on our <a href="/contact">Contact Us</a> page.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default TermsOfUse;
