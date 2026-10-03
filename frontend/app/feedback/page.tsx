"use client";

import { FormEvent, useState } from "react";
import { api, DEMO_MODE } from "@/lib/api";

const feedbackAreas = [
  "Kampala Boulevard",
  "Parliamentary Avenue",
  "Naalya / Namugongo",
  "Entebbe Road Corridor",
];

export default function FeedbackPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      await api("/feedback/", { method: "POST", body: JSON.stringify(data) });
      setMessage("Thank you. Your feedback has been received.");
      form.reset();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send feedback.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="section feedbackPage">
      <div className="container feedbackLayout">
        <div>
          <div className="eyebrow">Your voice matters</div>
          <h1 className="title">We appreciate your feedback.</h1>
          <p className="lead">Tell us about your meal, delivery, or catering experience. We read every note.</p>
        </div>

        <form className="panel form feedbackForm" onSubmit={submitFeedback}>
          <label>
            Full name
            <input name="full_name" autoComplete="name" required placeholder="Your name" />
          </label>
          <label>
            Phone number
            <input name="phone" type="tel" autoComplete="tel" required placeholder="+256 7XX XXX XXX" />
          </label>
          <label>
            Branch / delivery area
            <select name="area" required defaultValue="">
              <option value="" disabled>Select an area</option>
              {feedbackAreas.map((area) => <option key={area}>{area}</option>)}
            </select>
          </label>
          <label>
            What is this about?
            <select name="feedback_type" defaultValue="review">
              <option value="review">Meal or delivery review</option>
              <option value="compliment">Compliment</option>
              <option value="issue">Concern or complaint</option>
              <option value="catering">Catering order</option>
            </select>
          </label>
          <label>
            Your feedback
            <textarea name="message" required rows={5} maxLength={1200} placeholder="Tell us what went well or what we can improve." />
          </label>
          {DEMO_MODE && <p className="notice">Demo mode: this form shows a local confirmation and does not send your details to a server.</p>}
          {message && <p className="notice" role="status">{message}</p>}
          {error && <p className="notice error" role="alert">{error}</p>}
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send feedback"}
          </button>
        </form>
      </div>
    </main>
  );
}