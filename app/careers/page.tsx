"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { Briefcase, MapPin, ChevronDown, Award } from "lucide-react";

const JOBS = [
  {
    title: "Head of Never Arriving",
    dept: "Operations",
    location: "Remote (obviously)",
    body: "Own the end-to-end strategy for making sure orders reach 100% cooked, 0% delivered. Requires deep empathy for the customer and zero urgency.",
  },
  {
    title: "Turtle Pace Consultant",
    dept: "Logistics",
    location: "Dhaka",
    body: "Advise our riders on maintaining an industry-leading slow, steady, allegedly-in-motion delivery cadence. Prior experience with actual turtles a plus, not required.",
  },
  {
    title: "Professional Excuse Writer",
    dept: "Creative",
    location: "Remote",
    body: "Write the next generation of status messages explaining exactly why the food is 'almost there.' Comedy writing background preferred.",
  },
  {
    title: "ETA Optimist",
    dept: "Engineering",
    location: "Dhaka",
    body: "Maintain the countdown timers that always say arrival is close. Strong belief in eternal optimism required.",
  },
];

const BENEFITS = [
  "Unlimited (never delivered) snacks",
  "Flexible hours, since nothing has a real deadline",
  "A team that gets the joke",
  "Zero commute, everyone works from wherever",
];

export default function CareersPage() {
  const [openJob, setOpenJob] = useState<number | null>(null);

  return (
    <>
      <PageTitle title="Careers · Food Turtle" />
      <Navbar />
      <main className="w-full pb-20 sm:pb-6">
        <div className="bg-gradient-to-br from-turtle-pink to-turtle-pink-light px-4 py-14">
          <div className="max-w-2xl mx-auto text-center">
            <Briefcase size={36} className="text-white mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Careers at Food Turtle</h1>
            <p className="text-white/85 text-sm">
              Help us build the only delivery company proud of a 0% delivery rate.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-2.5 bg-white rounded-xl border border-gray-100 p-3">
                <Award size={16} className="text-turtle-pink shrink-0" />
                <span className="text-sm text-turtle-dark">{b}</span>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-turtle-dark mb-4">Open roles</h2>
          <div className="space-y-2 mb-10">
            {JOBS.map((job, i) => (
              <div key={job.title} className="border border-gray-100 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setOpenJob(openJob === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div>
                    <p className="font-bold text-turtle-dark text-sm">{job.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-turtle-gray-2">
                      <span>{job.dept}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {job.location}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-turtle-gray-2 shrink-0 transition-transform ${openJob === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openJob === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-turtle-gray-2 mb-3">{job.body}</p>
                    <a
                      href={`mailto:careers@foodturtle.example?subject=Application: ${encodeURIComponent(job.title)}`}
                      className="inline-block bg-turtle-pink text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-turtle-pink-light transition-colors"
                    >
                      Apply
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-turtle-gray-2 text-center">
            Don&apos;t see a fit? Email us anyway at careers@foodturtle.example, we read everything, eventually.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
