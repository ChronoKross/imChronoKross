import PropTypes from "prop-types";

// Reusable Section Component
const Section = ({ id, title, effectiveDate, children }) => (
  <section id={id} className="mb-6">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    {effectiveDate && (
      <p>
        Effective Date: <span className="text-red-400">{effectiveDate}</span>
      </p>
    )}
    {children}
  </section>
);

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  effectiveDate: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default function LegalPolicies() {
  const effectiveDate = "11/28/2024";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Legal Policies</h1>

      {/* Privacy Policy Section */}
      <Section
        id="privacy-policy"
        title="Privacy Policy"
        effectiveDate={effectiveDate}
      >
        <p>
          At <strong>ImChronoKross</strong>, your privacy is important to us.
          This Privacy Policy explains how we collect, use, and protect your
          information when you use our services.
        </p>
        <h3 className="text-lg font-bold mt-4">Information We Collect</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Email Address:</strong> For account creation and
            communication.
          </li>
          <li>
            <strong>Username:</strong> To identify your account.
          </li>
        </ul>
        <h3 className="text-lg font-bold mt-4">How We Use Your Information</h3>
        <ul className="list-disc list-inside">
          <li>To create and manage your account.</li>
          <li>To communicate with you about updates or issues.</li>
        </ul>
      </Section>

      {/* Terms of Service Section */}
      <Section
        id="terms-of-service"
        title="Terms of Service"
        effectiveDate={effectiveDate}
      >
        <p>
          Welcome to <strong>ImChronoKross</strong>. By using our services, you
          agree to the following terms:
        </p>
        <h3 className="text-lg font-bold mt-4">1. Use of Our Services</h3>
        <ul className="list-disc list-inside">
          <li>
            You must provide accurate information when creating an account.
          </li>
          <li>Do not use our services for illegal or harmful activities.</li>
        </ul>
        <h3 className="text-lg font-bold mt-4">2. Data and Privacy</h3>
        <p>
          We collect your email and username to manage your account. For more
          information, see our Privacy Policy above.
        </p>
      </Section>

      {/* Cookie Policy Section */}
      <Section
        id="cookie-policy"
        title="Cookie Policy"
        effectiveDate={effectiveDate}
      >
        <p>
          At <strong>ImChronoKross</strong>, we use cookies to improve your
          experience. This policy explains how we use cookies and how you can
          manage them.
        </p>
        <h3 className="text-lg font-bold mt-4">Cookies We Use</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Essential Cookies:</strong> Required for basic
            functionality, such as authentication.
          </li>
        </ul>
        <h3 className="text-lg font-bold mt-4">Managing Cookies</h3>
        <p>
          You can disable cookies via your browser settings, but this may limit
          your ability to use certain features of our site.
        </p>
      </Section>
    </div>
  );
}
