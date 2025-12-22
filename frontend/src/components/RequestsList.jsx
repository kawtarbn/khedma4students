import React, { useEffect, useState } from "react";
import { getRequests, deleteRequest, updateRequest } from "../api";
import EditRequestForm from "./EditRequestForm";

export default function RequestList() {
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getRequests();
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err.response || err);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Delete 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      await deleteRequest(id);
      setRequests(requests.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Delete failed:", err.response || err);
    }
  };

  // Save edits
  const handleEditSave = async (updatedRequest) => {
    try {
      const res = await updateRequest(updatedRequest.id, updatedRequest);
      const data = res.data;
      setRequests(requests.map((r) => (r.id === data.id ? data : r)));
      setEditingRequest(null);
    } catch (err) {
      console.error("Update failed:", err.response || err);
      alert("Failed to update request.");
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (requests.length === 0) return <p>No requests found.</p>;

  return (
    <div style={{ marginLeft: "20px" }}>
      <h2 style={{marginLeft: "70px"}}>Request Listings</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {requests.map((r) => (
          <li
            key={r.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "12px",
              paddingBottom: "12px",
            }}
          >
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <p><strong>Category:</strong> {r.category}</p>
            <p><strong>City:</strong> {r.city}</p>
            <p><strong>Pay:</strong> {r.pay || "-"}</p>
            <p><strong>Availability:</strong> {r.availability || "-"}</p>
            <p><strong>Email:</strong> {r.contactEmail || "-"}</p>
            <p><strong>Phone:</strong> {r.contactPhone || "-"}</p>
            <p><strong>Status:</strong> {r.status}</p>

            <button
              onClick={() => setEditingRequest(r)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                marginRight: "6px",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(r.id)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#dc2626",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Modal-style Edit Form */}
      {editingRequest && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "400px",
              maxWidth: "90%",
            }}
          >
            <EditRequestForm
              request={editingRequest}
              onSave={handleEditSave} // Save function here
              onCancel={() => setEditingRequest(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
