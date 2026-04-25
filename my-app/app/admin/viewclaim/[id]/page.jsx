"use client";

import React, { useState } from "react";
import {
  MapPin,
  Tag,
  Info,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  Image,
  ArrowLeft,
  Clock,
  Send
} from "lucide-react";

// --- Static Dummy Data for a Single Claim ---
const MOCK_CLAIM_DETAIL = {
  claimId: "C-0125",
  status: "Pending Review",
  claimant: "user_115 (John Doe)",
  claimantEmail: "john.doe@example.com",
  dateSubmitted: "2025-12-05 10:30 AM",
  item: {
    itemId: "I-195",
    name: "Sports Watch (Digital)",
    category: "Accessories",
    image: "https://placehold.co/800x600/1e293b/ffffff?text=Lost+Watch+Photo",
    location: "Basketball Court Bench (Near East Exit)",
    description: "Black rubber strap, large square digital face. Time may be incorrect as battery was low when found.",
    date: "2025-05-15",
    reportedBy: "finder_500",
  },
  evidence: {
    text: "The watch has a tiny but noticeable scratch on the upper left corner of the screen, only visible in direct light. I also set the watch's secondary countdown timer to exactly 13 minutes and 0 seconds before it was lost. The main watch face background is set to a dark blue color.",
    proofImages: [
      "https://placehold.co/150x150/065f46/ffffff?text=Claimant+Proof+1",
      "https://placehold.co/150x150/10b981/ffffff?text=Claimant+Proof+2",
      "https://placehold.co/150x150/6ee7b7/ffffff?text=Claimant+Proof+3",
    ],
  },
};

const ViewClaimPage = () => {
  const [claim, setClaim] = useState(MOCK_CLAIM_DETAIL);
  const [adminNotes, setAdminNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  // Placeholder for submission logic
  const handleDecision = (decision) => {
    if (!adminNotes.trim()) {
      alert("Please provide Admin Notes before making a decision.");
      return;
    }
    if (decision === "reject" && !rejectionReason.trim()) {
      alert("Please provide a Rejection Reason.");
      return;
    }

    // --- Mock Update ---
    console.log(`Decision: ${decision}, Notes: ${adminNotes}, Reason: ${rejectionReason}`);
    alert(`Claim ${claim.claimId} ${decision}ed successfully!`);
    
    // Update the local state to reflect the change
    setClaim({ ...claim, status: decision === "approve" ? "Approved" : "Rejected" });
    
    // Reset decision mode
    setIsApproving(false);
    setIsRejecting(false);
  };

  const StatusPill = ({ status }) => {
    let classes = "";
    let icon = null;
    switch (status) {
      case "Pending Review":
        classes = "bg-blue-100 text-blue-800 border-blue-300";
        icon = <Clock className="w-4 h-4 mr-2" />;
        break;
      case "Approved":
        classes = "bg-green-100 text-green-800 border-green-300";
        icon = <CheckCircle className="w-4 h-4 mr-2" />;
        break;
      case "Rejected":
        classes = "bg-red-100 text-red-800 border-red-300";
        icon = <XCircle className="w-4 h-4 mr-2" />;
        break;
      default:
        classes = "bg-gray-100 text-gray-800 border-gray-300";
    }
    return (
      <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full border ${classes}`}>
        {icon} {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Back Button */}
        <button 
          onClick={() => alert("Returning to Admin Dashboard...")}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Claims Dashboard
        </button>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 border-b pb-4 mb-8">
          Review Claim: {claim.item.name} <span className="text-gray-500 font-medium ml-2 sm:ml-4 text-xl sm:text-2xl">({claim.claimId})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT/CENTER COLUMN - ITEM REFERENCE & CLAIMANT EVIDENCE */}
          <div className="lg:col-span-2 space-y-8">

            {/* Claim Metadata */}
            <div className="flex flex-wrap gap-4 justify-between items-center p-4 bg-white rounded-xl shadow-md border border-gray-200">
                <p className="text-sm sm:text-lg">
                    <strong className="text-gray-700">Claimant:</strong> <span className="font-semibold text-indigo-600">{claim.claimant}</span>
                </p>
                 <p className="text-sm sm:text-lg">
                    <strong className="text-gray-700">Submitted:</strong> {claim.dateSubmitted}
                </p>
                <StatusPill status={claim.status} />
            </div>

            {/* 1. ORIGINAL ITEM LISTING DETAILS (Reference) */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-600">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
                <Info className="w-6 h-6 mr-3 text-red-600" />
                Original Item Listing Details
              </h2>

              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={claim.item.image}
                  alt={claim.item.name}
                  className="w-full sm:w-1/3 h-48 object-cover rounded-lg shadow-inner"
                />
                <div className="w-full sm:w-2/3 space-y-3">
                  <p className="text-gray-700 italic">
                    <strong className="font-semibold text-gray-900">Description:</strong> {claim.item.description}
                  </p>
                  <p className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    <strong className="font-medium">Location:</strong> {claim.item.location}
                  </p>
                  <p className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-red-500" />
                    <strong className="font-medium">Date Found:</strong> {claim.item.date}
                  </p>
                  <p className="flex items-center text-sm">
                    <Tag className="w-4 h-4 mr-2 text-red-500" />
                    <strong className="font-medium">Category:</strong> {claim.item.category}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. CLAIMANT EVIDENCE (Proof) */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
                <FileText className="w-6 h-6 mr-3 text-green-600" />
                Claimant's Proof and Evidence
              </h2>

              {/* Text Proof */}
              <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-green-50">
                <h3 className="font-bold text-lg mb-2 text-green-800 flex items-center">
                    <Info className="w-5 h-5 mr-2" /> Detailed Statement
                </h3>
                <p className="text-gray-800 whitespace-pre-line">{claim.evidence.text}</p>
              </div>

              {/* Image Proof */}
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-900 flex items-center">
                    <Image className="w-5 h-5 mr-2" /> Proof Photos ({claim.evidence.proofImages.length}/3)
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {claim.evidence.proofImages.map((src, index) => (
                    <div key={index} className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 border-2 border-green-500 rounded-md overflow-hidden shadow-md cursor-pointer hover:opacity-80 transition">
                      <img
                        src={src}
                        alt={`Claim proof ${index + 1}`}
                        className="w-full h-full object-cover"
                        onClick={() => alert(`Viewing image ${index + 1} in full size.`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            
          </div>

          {/* RIGHT COLUMN - DECISION PANEL */}
          <div className="lg:col-span-1 h-full lg:sticky lg:top-8">
            <div className="bg-indigo-50 p-6 rounded-xl shadow-xl border-t-4 border-indigo-600">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
                Admin Resolution
              </h2>

              {/* Admin Notes */}
              <div className="mb-4">
                <label htmlFor="adminNotes" className="font-semibold block mb-2 text-gray-800">
                  Admin Notes (Internal Log)
                </label>
                <textarea
                  id="adminNotes"
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Document the comparison results and your rationale."
                  required
                />
              </div>

              {/* Rejection Reason (Conditional) */}
              {isRejecting && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                  <label htmlFor="rejectionReason" className="font-semibold block mb-2 text-red-800">
                    Rejection Reason (Sent to Claimant)
                  </label>
                  <textarea
                    id="rejectionReason"
                    rows={2}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full border border-red-500 rounded-lg p-3 focus:ring-red-500 focus:border-red-500"
                    placeholder="E.g., 'Proof images did not match unique markings described.'"
                    required
                  />
                </div>
              )}

              {/* Action Buttons */}
              {claim.status === 'Pending Review' && (
                <div className="space-y-3 mt-6">
                    
                    {/* Approve Button */}
                    {!isRejecting && (
                        <button
                            onClick={() => {
                                if (isApproving) {
                                    handleDecision("approve");
                                } else {
                                    setIsApproving(true);
                                    setIsRejecting(false);
                                }
                            }}
                            className={`w-full py-3 font-bold rounded-lg transition ${
                                isApproving
                                    ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                                    : "bg-green-500 hover:bg-green-600 text-white"
                            } flex items-center justify-center`}
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            {isApproving ? "CONFIRM APPROVAL" : "Approve Claim"}
                        </button>
                    )}
                    
                    {/* Reject Button */}
                    <button
                        onClick={() => {
                            if (isRejecting) {
                                handleDecision("reject");
                            } else {
                                setIsRejecting(true);
                                setIsApproving(false);
                            }
                        }}
                        className={`w-full py-3 font-bold rounded-lg transition ${
                            isRejecting
                                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                                : "bg-white border-2 border-red-500 text-red-600 hover:bg-red-50"
                        } flex items-center justify-center`}
                    >
                        <XCircle className="w-5 h-5 mr-2" />
                        {isRejecting ? "CONFIRM REJECTION" : "Reject Claim"}
                    </button>

                    {/* Reset Button */}
                    {(isApproving || isRejecting) && (
                        <button
                            onClick={() => {
                                setIsApproving(false);
                                setIsRejecting(false);
                            }}
                            className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 transition"
                        >
                            Cancel Decision
                        </button>
                    )}
                </div>
              )}
              {claim.status !== 'Pending Review' && (
                  <p className="text-lg font-bold text-center mt-4 p-4 bg-gray-100 rounded-lg">
                      This claim has already been resolved.
                  </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClaimPage;