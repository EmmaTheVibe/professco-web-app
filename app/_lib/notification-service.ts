export interface NotificationPreferences {
  news_and_updates: boolean;
  course_recommendations: boolean;
  purchase_confirmation: boolean;
}

export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  try {
    const response = await fetch("/api/auth/notification-preferences", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch notification preferences");
    }

    return data;
  } catch (error) {
    console.error("Fetch notification preferences error:", error);
    throw error;
  }
}

export async function updateNotificationPreferences(
  prefs: NotificationPreferences,
): Promise<{ message?: string }> {
  try {
    const response = await fetch("/api/auth/notification-preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prefs),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update notification preferences");
    }

    return data;
  } catch (error) {
    console.error("Update notification preferences error:", error);
    throw error;
  }
}
