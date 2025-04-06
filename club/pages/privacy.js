import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-night-dark">
      <Head>
        <title>Privacy Policy | TONight - Toronto Nightlife</title>
        <meta name="description" content="Privacy Policy for TONight - Toronto's premier nightlife discovery platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-display mb-8">Privacy Policy</h1>
            
            <div className="bg-night-navy rounded-xl p-6 md:p-8 space-y-8">
              <section>
                <p className="text-gray-300 leading-relaxed">
                  TONight ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application and services (collectively, the "Services").
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree, please do not access or use our Services.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may collect several types of information from and about users of our Services, including:
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Personal Information</h3>
                <p className="text-gray-300 leading-relaxed">
                  When you create an account, submit a guestlist request, or contact us, we may collect personally identifiable information, such as:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Date of birth</li>
                  <li>Profile picture</li>
                  <li>Social media handles</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Usage Information</h3>
                <p className="text-gray-300 leading-relaxed">
                  We may automatically collect certain information about your device and how you interact with our Services, including:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>IP address</li>
                  <li>Device type and operating system</li>
                  <li>Browser type and version</li>
                  <li>Pages you visit within our Services</li>
                  <li>Time and date of your visit</li>
                  <li>Time spent on certain pages</li>
                  <li>Referring website addresses</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">1.3 Location Information</h3>
                <p className="text-gray-300 leading-relaxed">
                  With your consent, we may collect and process information about your actual location to provide location-based services. This information may be collected through GPS, IP address, or other technologies.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                  <li>Create and manage your account</li>
                  <li>Process guestlist requests and reservations</li>
                  <li>Provide, maintain, and improve our Services</li>
                  <li>Personalize your experience and deliver content relevant to your interests</li>
                  <li>Communicate with you, including sending notifications about events, promotions, and updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Protect the security and integrity of our Services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Sharing Your Information</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">3.1 With Venues and Partners</h3>
                <p className="text-gray-300 leading-relaxed">
                  When you submit a guestlist request or make a reservation, we share necessary information with the venue or partner to fulfill your request. This may include your name, contact information, and the details of your request.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Service Providers</h3>
                <p className="text-gray-300 leading-relaxed">
                  We may share information with third-party vendors, service providers, and contractors who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting, and customer service.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Business Transfers</h3>
                <p className="text-gray-300 leading-relaxed">
                  If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our Services of any change in ownership or uses of your information.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Legal Requirements</h3>
                <p className="text-gray-300 leading-relaxed">
                  We may disclose your information when required by law, such as to comply with a subpoena, legal proceedings, or similar legal process, or when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking Technologies</h2>
                <p className="text-gray-300 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our Services and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>To keep you logged in</li>
                  <li>To remember your preferences</li>
                  <li>To understand how you use our Services</li>
                  <li>To improve our Services based on your behavior</li>
                  <li>To provide personalized content and advertisements</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Third-Party Links and Services</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our Services may contain links to third-party websites, services, or advertisements that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  We recommend reviewing the privacy policies of these third parties before providing any information to them.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security. You are responsible for maintaining the confidentiality of any passwords or account credentials.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Your Rights and Choices</h2>
                <p className="text-gray-300 leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal information. These may include:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                  <li><span className="font-medium">Access and Update:</span> You can access and update your account information by logging into your account settings.</li>
                  <li><span className="font-medium">Data Portability:</span> You have the right to request a copy of the personal information we hold about you.</li>
                  <li><span className="font-medium">Deletion:</span> You can request that we delete your personal information, subject to certain exceptions.</li>
                  <li><span className="font-medium">Opt-Out:</span> You can opt out of marketing communications by following the unsubscribe instructions included in our emails or by contacting us.</li>
                  <li><span className="font-medium">Location Data:</span> You can control location permissions through your device settings.</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our Services are not intended for use by individuals under the age of 19, which is the legal drinking age in Ontario. We do not knowingly collect personal information from children under 19. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will delete such information from our systems.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Your continued use of our Services after any changes to this Privacy Policy constitutes your acceptance of such changes.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <address className="mt-4 text-gray-300 not-italic">
                  TONight Inc.<br />
                  123 King Street West<br />
                  Toronto, ON M5V 1J2<br />
                  <a href="mailto:privacy@tonight.to" className="text-neon-blue hover:underline">privacy@tonight.to</a>
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