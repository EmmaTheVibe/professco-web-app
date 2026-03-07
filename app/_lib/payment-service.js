export async function initiatePayment(courseId, email = null) {
  try {
    const response = await fetch("/api/payment/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment initiation failed");
    }

    return data;
  } catch (error) {
    console.error("Payment initiation error:", error);
    throw error;
  }
}

export async function initiateMultiplePayment(courseIds, email = null) {
  try {
    const response = await fetch("/api/payment/multiple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseIds, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment initiation failed");
    }

    return data;
  } catch (error) {
    console.error("Multiple payment initiation error:", error);
    throw error;
  }
}
