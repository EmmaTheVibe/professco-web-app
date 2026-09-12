const logoBySlug: Record<string, string> = {
  ICAN: "/images/ican-logo.svg",
  ACCA: "/images/acca-logo.svg",
  CFA: "/images/cfa-logo.svg",
  CIMA: "/images/cima-logo.svg",
  CITN: "/images/citn-logo.svg",
  CIS: "/images/cis-logo.svg",
  CIPM: "/images/cipm-logo.svg",
};

interface ExamBodyCategory {
  short_name?: string;
}

interface ExamBody {
  id: number;
  slug?: string;
  name?: string;
  description?: string;
  categories?: ExamBodyCategory[];
}

export interface ExamCardData {
  id: number;
  name: string;
  logo: string;
  description: string;
  segments: string[];
}

function normalizeExamBody(examBody: ExamBody): ExamCardData {
  const slug = examBody.slug || "";

  return {
    id: examBody.id,
    name: slug || examBody.name || "Exam body",
    logo: logoBySlug[slug.toUpperCase()] || "/images/logo.svg",
    description: examBody.name || examBody.description || "",
    segments:
      examBody.categories
        ?.map((category) => category.short_name)
        .filter((name): name is string => Boolean(name)) || [],
  };
}

export async function getExamBodies(): Promise<ExamCardData[]> {
  try {
    const response = await fetch("/api/exam-bodies", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch exam bodies");
    }

    const examBodies = Array.isArray(data.data) ? data.data : [];

    return examBodies.map(normalizeExamBody);
  } catch (error) {
    console.error("Fetch exam bodies error:", error);
    throw error;
  }
}

export async function saveExamBodies(
  examBodyIds: number[]
): Promise<unknown> {
  try {
    const response = await fetch("/api/account-setup/exam-bodies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exam_body_ids: examBodyIds }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save exam bodies");
    }

    return data;
  } catch (error) {
    console.error("Account setup error:", error);
    throw error;
  }
}
