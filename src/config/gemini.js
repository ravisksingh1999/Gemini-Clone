const MODEL   = "gemini-2.5-flash";
const API_KEY="AIzaSyCGgdJSyO_ORbcF5q4GaUz3FbRYkJlS5Sk";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent`;

export const run = async (userInput) => {
  try {
    console.log("🟡 Sending prompt:", userInput);

    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userInput }] }]
      })
    });

    console.log("🟢 Status:", res.status);

    if (!res.ok) {
      const err = await res.text();
      console.error("❌ API error body:", err);
      return "API error: " + res.status;
    }

    const data = await res.json();
    console.log("✅ Parsed data:", data);

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  } catch (e) {
    console.error("❌ Gemini error:", e);
    return "Something went wrong!";
  }
};
export default run;
