const API_BASE_URL = "http://localhost:8080/api";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return true;
}

export async function getWeeks() {
  const response = await fetch(`${API_BASE_URL}/weeks`);
  return handleResponse(response);
}

export async function createWeek(weekData) {
  const response = await fetch(`${API_BASE_URL}/weeks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(weekData),
  });
  return handleResponse(response);
}

export async function deleteWeek(weekId) {
  const response = await fetch(`${API_BASE_URL}/weeks/${weekId}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

export async function createLesson(lessonData) {
  const response = await fetch(`${API_BASE_URL}/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lessonData),
  });
  return handleResponse(response);
}

export async function updateLesson(lessonId, lessonData) {
  const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lessonData),
  });
  return handleResponse(response);
}

export async function deleteLesson(lessonId) {
  const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}
