import React, { useState } from "react";
import axios from "axios";

function App() {
  const [policies, setPolicies] = useState([]); // Yanıtı saklamak için state
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Backend'e GET isteği gönder
      const response = await axios.get("http://localhost:3000/policies");
      setPolicies(response.data); // Yanıtı state'e kaydet
      setError(""); // Hataları temizle
    } catch (err) {
      console.error("Bir hata oluştu:", err);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setPolicies([]); // Yanıtı temizle
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Poliçe Bilgisi Sorgula</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit" style={{ padding: "5px 10px" }}>
          Poliçeleri Getir
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {policies.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {policies.map((policy) => (
            <div
              key={policy._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h2>Poliçe Numarası: {policy.policyNumber}</h2>
              <p><strong>Başlangıç Tarihi:</strong> {new Date(policy.startDate).toLocaleDateString()}</p>
              <p><strong>Bitiş Tarihi:</strong> {new Date(policy.endDate).toLocaleDateString()}</p>
              <p><strong>Durum:</strong> {policy.status}</p>
              <hr />
              <h3>Sigorta Sahibi</h3>
              <p><strong>Adı:</strong> {policy.holder.name}</p>
              <p><strong>TCKN:</strong> {policy.holder.nationalID}</p>
              <p><strong>Telefon:</strong> {policy.holder.phone}</p>
              <hr />
              <h3>Kapsam</h3>
              <p><strong>Deprem:</strong> {policy.coverage.earthquake ? "Evet" : "Hayır"}</p>
              <p><strong>Yangın:</strong> {policy.coverage.fire ? "Evet" : "Hayır"}</p>
              <p><strong>Sel:</strong> {policy.coverage.flood ? "Evet" : "Hayır"}</p>
              <hr />
              <h3>Prim Bilgileri</h3>
              <p><strong>Toplam Tutar:</strong> {policy.premium.totalAmount} TL</p>
              <h4>Ödeme Planı:</h4>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginBottom: "10px",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                      Ödeme No
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                      Tutar
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                      Son Tarih
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                      Durum
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {policy.premium.paymentSchedule.map((payment) => (
                    <tr key={payment._id}>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {payment.paymentNumber}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {payment.amount} TL
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {payment.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;