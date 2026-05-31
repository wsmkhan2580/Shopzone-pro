import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

const Field = ({ label, textarea, ...props }) => (
  <div>
    <label className="block text-[10px] text-[#7a7870] uppercase tracking-[2px] mb-1.5">
      {label}
    </label>
    {textarea ? (
      <textarea
        rows={6}
        className="w-full bg-[#141410] border border-[#1e1e1a] rounded-[4px] px-3 py-2.5 text-[13px] text-[#e0ddd6] placeholder-[#2a2a28] outline-none focus:border-[#3a3a2e] transition-colors duration-200 resize-y font-['DM_Sans']"
        {...props}
      />
    ) : (
      <input
        className="w-full bg-[#141410] border border-[#1e1e1a] rounded-[4px] px-3 py-2.5 text-[13px] text-[#e0ddd6] placeholder-[#2a2a28] outline-none focus:border-[#3a3a2e] transition-colors duration-200"
        {...props}
      />
    )}
  </div>
);

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[5px] text-[#c9b96c] font-medium mb-3">
          Get In Touch
        </p>
        <h1
          className="text-[40px] md:text-[52px] text-[#f0ede6] leading-[1.05] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Contact{" "}
          <em className="text-[#c9b96c] italic">Us</em>
        </h1>
        <p className="text-[13px] text-[#9a9690] leading-[1.8] font-light max-w-[480px]">
          Have a question, feedback, or just want to say hello?
          Fill out the form and our team will get back to you within 24 hours.
        </p>
      </div>

      {/* Success State */}
      {sent ? (
        <div className="text-center py-16 bg-[#0e0e0d] border border-[#1e1e1a] rounded-[10px]">
          <div className="w-14 h-14 flex items-center justify-center bg-[#0f1a0f] border border-[#2a4a2a] rounded-xl mx-auto mb-5 text-[#6a9e6a]">
            <FiCheck size={22} />
          </div>
          <h2
            className="text-[24px] text-[#e0ddd6] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Message Received!
          </h2>
          <p className="text-[13px] text-[#9a9690] font-light">
            Thanks for reaching out. We'll be in touch soon.
          </p>
        </div>
      ) : (
        /* Form */
        <form
          onSubmit={handleSubmit}
          className="bg-[#0e0e0d] border border-[#1e1e1a] rounded-[10px] p-7 flex flex-col gap-4"
        >
          <Field
            label="Your Name"
            type="text"
            placeholder="Jane Doe"
            required
          />
          <Field
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            required
          />
          <Field
            label="Subject"
            type="text"
            placeholder="Order inquiry, partnership, etc."
          />
          <Field
            label="Message"
            textarea
            placeholder="How can we help you?"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#c9b96c] hover:bg-[#d9cb88] text-[#0a0a0a] text-[12px] font-medium uppercase tracking-[1.5px] py-3.5 rounded-[4px] transition-colors duration-200 mt-1"
          >
            Send Message →
          </button>
        </form>
      )}
    </div>
  );
}