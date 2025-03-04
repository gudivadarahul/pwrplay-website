import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Privacy() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[location]);

    return (
        <div className="pt-32 px-6 min-h-screen bg-black text-white">
            {/* Logo in top-left */}
            <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 xl:-top-16 -left-2 sm:-left-3 z-[100]">
                <Link to="/">
                    <img
                        src="/pwrplay-logo.png"
                        alt="PWRPLAY Logo"
                        className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto cursor-pointer"
                    />
                </Link>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-headers mb-6">
                        Privacy <span className="text-red-600">Policy</span>
                    </h1>
                    <p className="text-2xl font-body font-medium mb-4">
                        Last Updated: February 19, 2025
                    </p>
                </div>

                {/* Privacy Content */}
                <div className="space-y-8">
                    <p className="opacity-80 text-lg text-justify">
                        This Privacy Notice for PWRPLAY Creations ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
                    </p>

                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>Visit our website at https://pwrplaycreations.com, or any website of ours that links to this Privacy Notice</li>
                        <li>Use CONTROLLED CHAOS. We produce card games.</li>
                        <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                    </ul>

                    <p className="opacity-80 text-lg text-justify">
                        Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at contact@pwrplaycreations.com.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">SUMMARY OF KEY POINTS</h2>
                    <p className="opacity-80 text-lg text-justify">
                        This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">1. WHAT INFORMATION DO WE COLLECT?</h2>
                    <h3 className="text-2xl font-semibold mt-4">Personal information you disclose to us</h3>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We collect personal information that you provide to us.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">Personal Information Provided by You</h3>
                    <p className="opacity-80 text-lg text-justify">
                        The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
                    </p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>names</li>
                        <li>email addresses</li>
                        <li>mailing addresses</li>
                        <li>phone numbers</li>
                        <li>contact preferences</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-4">Sensitive Information</h3>
                    <p className="opacity-80 text-lg text-justify">
                        When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">Information automatically collected</h3>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                    </p>

                    <p className="opacity-80 text-lg text-justify">
                        Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice: _
                    </p>

                    <p className="opacity-80 text-lg text-justify">The information we collect includes:</p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).</li>
                        <li>Device Data. We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.</li>
                        <li>Location Data. We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-4">Google API</h3>
                    <p className="opacity-80 text-lg text-justify">
                        Our use of information received from Google APls will adhere to Google API Services User Data Policy, including the Limited Use requirements.
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">Information collected from other sources</h3>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We may collect limited data from public databases, marketing partners, and other outside sources.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        In order to enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, and from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data (or user behavior data), Internet Protocol (IP) addresses, social media profiles, social media URLs, and custom profiles, for purposes of targeted advertising and event promotion.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">2. How We Use Your Information</h2>
                    <p className="opacity-80 text-lg text-justify">
                        Your email may be used to send promotions and updates. You can unsubscribe at any time.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">3. Third-Party Services</h2>
                    <p className="opacity-80 text-lg text-justify">
                        We may use third-party services like Google Analytics to track website traffic.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">4. Security Measures</h2>
                    <p className="opacity-80 text-lg text-justify">
                        We implement security measures to protect your data, but we cannot guarantee complete security.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
                    </p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>To request feedback. We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
                        <li>To send you marketing and promotional communications. We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see "WHAT ARE YOUR PRIVACY RIGHTS?" below.</li>
                        <li>To deliver targeted advertising to you. We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more. For more information see our Cookie Notice:</li>
                        <li>To protect our Services. We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
                        <li>To identify usage trends. We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
                        <li>To determine the effectiveness of our marketing and promotional campaigns. We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</li>
                        <li>To save or protect an individual's vital interest. We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li>
                    </ul>

                    <h2 className="text-3xl font-medium text-red-600">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">If you are located in the EU or UK, this section applies to you.</h3>
                    <p className="opacity-80 text-lg text-justify">
                        The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
                    </p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>Consent. We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
                        <li>Legitimate Interests. We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to:
                            <ul className="list-disc list-inside ml-8 text-justify">
                                <li>Send users information about special offers and discounts on our products and services</li>
                                <li>Develop and display personalized and relevant advertising content for our users</li>
                                <li>Analyze how our Services are used so we can improve them to engage and retain users</li>
                                <li>Support our marketing activities</li>
                                <li>Diagnose problems and/or prevent fraudulent activities</li>
                                <li>Understand how our users use our products and services so we can improve user experience</li>
                            </ul>
                        </li>
                        <li>Legal Obligations. We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
                        <li>Vital Interests. We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-4">If you are located in Canada, this section applies to you.</h3>
                    <p className="opacity-80 text-lg text-justify">
                        We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:
                    </p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                        <li>For investigations and fraud detection and prevention</li>
                        <li>For business transactions provided certain conditions are met</li>
                        <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                        <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                        <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
                        <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                        <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                        <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                        <li>If the information is publicly available and is specified by the regulations</li>
                    </ul>

                    <h2 className="text-3xl font-medium text-red-600">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We may share information in specific situations described in this section and/or with the following categories of third parties.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        Vendors, Consultants, and Other Third-Party Service Providers. We may share your data with third-party vendors, service providers, contractors, or agents ("third parties") who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your personal information. This means that they cannot do anything with your personal information unless we have instructed them to do it. They will also not share your personal information with any organization apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct.
                    </p>

                    <p className="opacity-80 text-lg text-justify">The categories of third parties we may share personal information with are as follows:</p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>Social Networks</li>
                        <li>Data Analytics Services</li>
                        <li>Sales & Marketing Tools</li>
                        <li>Ad Networks</li>
                        <li>Communication & Collaboration Tools</li>
                        <li>Website Hosting Service Providers</li>
                    </ul>

                    <p className="opacity-80 text-lg text-justify">We also may need to share your personal information in the following situations:</p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                    </ul>

                    <h2 className="text-3xl font-medium text-red-600">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We may use cookies and other tracking technologies to collect and store your information.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">Google Analytics</h3>
                    <p className="opacity-80 text-lg text-justify">
                        We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: Remarketing with Google Analytics, Google Display Network Impressions Reporting and Google Analytics Demographics and Interests Reporting. To opt out of being tracked by Google Analytics across the Services, visit https://tools.google.com/dlpage/gaoptout. You can opt out of Google Analytics Advertising Features through Ads Settings and Ad Settings for mobile apps. Other opt out means include http://optout.networkadvertising.org/ and http://www.networkadvertising.org/mobile-choice. For more information on the privacy practices of Google, please visit the Google Privacy & Terms page.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We may transfer, store, and process your information in countries other than your own.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        Our servers are located in the United States. If you are accessing our Services from outside the United States, please be aware that your information may be transferred to, stored by, and processed by us in our facilities and in the facilities of the third parties with whom we may share your personal information, in the United States, Canada, and other countries.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this Privacy Notice and applicable law.
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">European Commission's Standard Contractual Clauses</h3>
                    <p className="opacity-80 text-lg text-justify">
                        We have implemented measures to protect your personal information, including by using the European Commission's Standard Contractual Clauses for transfers of personal information between our group companies and between us and our third-party providers. These clauses require all recipients to protect all personal information that they process originating from the EEA or UK in accordance with European data protection laws and regulations. Our Standard Contractual Clauses can be provided upon request. We have implemented similar appropriate safeguards with our third-party service providers and partners and further details can be provided upon request.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">7. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We aim to protect your personal information through a system of organizational and technical security measures.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">9. DO WE COLLECT INFORMATION FROM MINORS?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: We do not knowingly collect data from or market to minors.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">10. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">11. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                    <p className="opacity-80 text-lg text-justify">
                        Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">12. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">Categories of Personal Information We Collect</h3>
                    <p className="opacity-80 text-lg text-justify">
                        We have collected the following categories of personal information in the past twelve (12) months:
                    </p>

                    <div className="space-y-4 opacity-80 text-lg text-justify">
                        <p><strong>Category A. Identifiers:</strong> Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</p>

                        <p><strong>Category B. Personal information as defined in the California Customer Records statute:</strong> Name, contact information, education, employment, employment history, and financial information</p>

                        <p><strong>Category C. Protected classification characteristics under state or federal law:</strong> Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</p>

                        <p><strong>Category D. Commercial information:</strong> Transaction information, purchase history, financial details, and payment information</p>

                        <p><strong>Category F. Internet or other similar network activity:</strong> Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</p>

                        <p><strong>Category G. Geolocation data:</strong> Device location</p>

                        <p><strong>Category I. Professional or employment-related information:</strong> Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</p>

                        <p><strong>Category K. Inferences drawn from collected personal information:</strong> Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics</p>
                    </div>

                    <h3 className="text-2xl font-semibold mt-4">Sources of Personal Information</h3>
                    <p className="opacity-80 text-lg text-justify">
                        Learn more about the sources of personal information we collect in "WHAT INFORMATION DO WE COLLECT?"
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">How We Use and Share Personal Information</h3>
                    <p className="opacity-80 text-lg text-justify">
                        Learn more about how we use your personal information in the section, "HOW DO WE PROCESS YOUR INFORMATION?"
                    </p>

                    <p className="opacity-80 text-lg text-justify">We collect and share your personal information through:</p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>Targeting cookies/Marketing cookies</li>
                        <li>Social media cookies</li>
                        <li>Beacons/Pixels/Tags</li>
                        <li>Click redirects: Amazon affiliate link US, Amazon affiliate link Canada, MailChimp.</li>
                        <li>Social media plugins: Instagram, Linkedin, TikTok, Facebook, Youtube, X, Spotify. We use social media features, such as a "Like" button, and widgets, such as a "Share" button, in our Services. Such features may process your Internet Protocol (IP) address and track which page you are visiting on our website. We may place a cookie to enable the feature to work correctly. If you are logged in on a certain social media platform and you interact with a widget or button belonging to that social media platform, this information may be recorded to your profile of such social media platform. To avoid this, you should log out from that social media platform before accessing or using the Services. Social media features and widgets may be hosted by a third party or hosted directly on our Services. Your interactions with these features are governed by the privacy notices of the companies that provide them. By clicking on one of these buttons, you agree to the use of this plugin and consequently the transfer of personal information to the corresponding social media service. We have no control over the essence and extent of these transmitted data or their additional processing.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-4">Will your information be shared with anyone else?</h3>
                    <p className="opacity-80 text-lg text-justify">
                        We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?"
                    </p>

                    <p className="opacity-80 text-lg text-justify">
                        We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.
                    </p>

                    <p className="opacity-80 text-lg text-justify">
                        We have not sold or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We have disclosed the following categories of personal information to third parties for a business or commercial purpose in the preceding twelve (12) months:
                    </p>

                    <p className="opacity-80 text-lg text-justify">
                        The categories of third parties to whom we disclosed personal information for a business or commercial purpose can be found under "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?"
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">Your Rights</h3>
                    <p className="opacity-80 text-lg text-justify">
                        You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:
                    </p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>Right to know whether or not we are processing your personal data</li>
                        <li>Right to access your personal data</li>
                        <li>Right to correct inaccuracies in your personal data</li>
                        <li>Right to request the deletion of your personal data</li>
                        <li>Right to obtain a copy of the personal data you previously shared with us</li>
                        <li>Right to non-discrimination for exercising your rights</li>
                        <li>Right to opt out of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California's privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-4">State-Specific Rights</h3>
                    <p className="opacity-80 text-lg text-justify">
                        Depending upon the state where you live, you may also have the following rights:
                    </p>
                    <ul className="list-disc list-inside opacity-80 text-lg ml-4 text-justify">
                        <li>Right to access the categories of personal data being processed (as permitted by applicable law, including Minnesota's privacy law).</li>
                        <li>Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including California's and Delaware's privacy law)</li>
                        <li>Right to obtain a list of specific third parties to which we have disclosed personal data (as permitted by applicable law, including Minnesota's and Oregon's privacy law)</li>
                        <li>Right to review, understand, question, and correct how personal data has been profiled (as permitted by applicable law, including Minnesota's privacy law)</li>
                        <li>Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including California's privacy law)</li>
                        <li>Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature (as permitted by applicable law, including Florida's privacy law)</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-4">How to Exercise Your Rights</h3>
                    <p className="opacity-80 text-lg text-justify">
                        To exercise these rights, you can contact us by submitting a data subject access request, by emailing us at contact@pwrplaycreations.com, by visiting http://www.pwrplaycreations.com/contact, or by referring to the contact details at the bottom of this document.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        We will honor your opt-out preferences if you enact the Global Privacy Control (GPC) opt-out signal on your browser.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        Under certain US state data protection laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with applicable laws.
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">Request Verification</h3>
                    <p className="opacity-80 text-lg text-justify">
                        Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">Appeals</h3>
                    <p className="opacity-80 text-lg text-justify">
                        Under certain US state data protection laws, if we decline to take action regarding your request, you may appeal our decision by emailing us at contact@pwrplaycreations.com. We will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal is denied, you may submit a complaint to your state attorney general.
                    </p>

                    <h3 className="text-2xl font-semibold mt-4">California "Shine The Light" Law</h3>
                    <p className="opacity-80 text-lg text-justify">
                        California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">13. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        If you have questions or comments about this notice, you may contact us by post at:
                    </p>
                    <p className="opacity-80 text-lg text-justify">
                        PWRPLAY Creations<br />
                        Toronto, Canada
                    </p>

                    <h2 className="text-3xl font-medium text-red-600">15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
                    <p className="opacity-80 text-lg text-justify">
                        Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Privacy;
