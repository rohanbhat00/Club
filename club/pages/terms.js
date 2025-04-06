import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Terms() {
  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>Terms of Service | TONight - Toronto Nightlife</title>
        <meta name="description" content="Terms of Service for TONight - Toronto's premier nightlife discovery platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-display mb-8">Terms of Service</h1>
            
            <div className="bg-night-navy rounded-xl p-6 md:p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed">
                  Welcome to TONight ("we," "our," or "us"). By accessing or using our website, mobile application, and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully before using our Services.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  If you do not agree to these Terms, you may not access or use our Services. By using our Services, you represent that you are at least 19 years old, the legal drinking age in Ontario.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
                <p className="text-gray-300 leading-relaxed">
                  TONight provides a platform for discovering nightlife venues, events, and exclusive access opportunities in Toronto. Our Services include but are not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                  <li>Browsing and searching for nightlife venues and events</li>
                  <li>Viewing venue details, including location, hours, and amenities</li>
                  <li>Requesting access to guestlists and special promotions</li>
                  <li>Creating user accounts to save preferences and track bookings</li>
                  <li>Receiving notifications about upcoming events and promotions</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <p className="text-gray-300 leading-relaxed">
                  Some features of our Services require you to create an account. When you create an account, you agree to provide accurate, current, and complete information and to update this information to keep it accurate, current, and complete.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">4. User Conduct</h2>
                <p className="text-gray-300 leading-relaxed">
                  When using our Services, you agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others, including privacy and intellectual property rights</li>
                  <li>Use our Services for any illegal or unauthorized purpose</li>
                  <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                  <li>Attempt to gain unauthorized access to any part of the Services</li>
                  <li>Use automated means to access or use the Services without our permission</li>
                  <li>Create multiple accounts or false identities</li>
                  <li>Submit false or misleading information</li>
                  <li>Harass, threaten, or intimidate other users</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Venue and Event Information</h2>
                <p className="text-gray-300 leading-relaxed">
                  We strive to provide accurate and up-to-date information about venues and events. However, we do not guarantee the accuracy, completeness, or reliability of any information on our platform. Venue information, including hours, admission policies, and event details, may change without notice.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  We recommend confirming details directly with the venue before planning your visit. TONight is not responsible for any inconvenience, loss, or disappointment resulting from inaccurate or outdated information.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Guestlist and Reservations</h2>
                <p className="text-gray-300 leading-relaxed">
                  TONight offers the ability to request access to guestlists and make reservations at participating venues. Submission of a request does not guarantee entry or service. All requests are subject to venue approval, capacity limitations, and other factors outside our control.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Venues maintain the right to enforce their own admission policies, including dress codes and age restrictions. We are not responsible for denied entry or any fees charged by venues in relation to admission or services.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed">
                  All content, features, and functionality on our Services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by TONight, our licensors, or other providers and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  You may not copy, modify, create derivative works, publicly display, republish, or distribute any material from our Services without our prior written consent.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our Privacy Policy, available at <Link href="/privacy"><a className="text-neon-blue hover:underline">https://tonight.to/privacy</a></Link>, describes how we collect, use, and share information about you when you use our Services. By using our Services, you agree to the collection, use, and sharing of your information as described in our Privacy Policy.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Disclaimer of Warranties</h2>
                <p className="text-gray-300 leading-relaxed">
                  THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  We do not warrant that the Services will be uninterrupted or error-free, that defects will be corrected, or that the Services or servers that make them available are free of viruses or other harmful components.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL TONight, ITS AFFILIATES, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THE USE OF OUR SERVICES.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Our total liability to you for all claims arising out of or relating to the use of the Services shall not exceed the amount paid by you, if any, for accessing our Services during the twelve (12) months preceding the claim.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">11. Indemnification</h2>
                <p className="text-gray-300 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless TONight, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from or relating to:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                  <li>Your use of the Services</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another</li>
                  <li>Your conduct in connection with the Services</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">12. Modifications to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will provide notice through our Services or by other means. Your continued use of the Services after the changes take effect constitutes your acceptance of the revised Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">13. Termination</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">14. Governing Law</h2>
                <p className="text-gray-300 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to its conflict of law provisions.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">15. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <address className="mt-4 text-gray-300 not-italic">
                  TONight Inc.<br />
                  123 King Street West<br />
                  Toronto, ON M5V 1J2<br />
                  <a href="mailto:legal@tonight.to" className="text-neon-blue hover:underline">legal@tonight.to</a>
                </address>
              </section>
              
              <section>
                <p className="text-gray-400 text-sm">
                  Last updated: May 1, 2023
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-night-black py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TONight. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <Link href="/privacy">
              <a className="hover:text-white transition-colors">Privacy Policy</a>
            </Link>
            <Link href="/terms">
              <a className="hover:text-white transition-colors">Terms of Service</a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 