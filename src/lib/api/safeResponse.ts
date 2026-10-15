/**
 * Safe API Client & Response Parser
 * ISF Startup Jathara 2026
 * 
 * Guarantees resilient parsing of HTTP responses in client-side code.
 * Defends against empty bodies, truncated streams, HTML error pages (e.g. Vercel 500/502),
 * and network aborts without throwing uncaught SyntaxErrors.
 */

export interface SafeApiResponse<T = Record<string, unknown>> {
  ok: boolean;
  status: number;
  data: T | null;
  errorMessage: string | null;
  rawText?: string;
}

/**
 * Safely parses any fetch Response into structured data.
 * Will NEVER throw "Unexpected end of JSON input" on empty bodies or HTML error pages.
 */
export async function parseSafeResponse<T = Record<string, unknown>>(
  res: Response,
  fallbackErrorMessage = "Request could not be completed. Please try again."
): Promise<SafeApiResponse<T>> {
  let rawText = "";
  let data: T | null = null;

  try {
    rawText = await res.text();
    if (rawText && rawText.trim().length > 0) {
      data = JSON.parse(rawText) as T;
    }
  } catch {
    // Body is empty, malformed JSON, or HTML (e.g. platform error page)
    data = null;
  }

  // 1. Success path
  if (res.ok) {
    if (!data) {
      return {
        ok: false,
        status: res.status,
        data: null,
        errorMessage: "Server returned an empty or unparseable response.",
        rawText,
      };
    }
    return {
      ok: true,
      status: res.status,
      data,
      errorMessage: null,
      rawText,
    };
  }

  // 2. Error path — extract backend error message or provide status-specific guidance
  let errorMessage: string;
  const parsedMsg =
    (data as { error?: unknown; message?: unknown })?.error ||
    (data as { error?: unknown; message?: unknown })?.message;

  if (typeof parsedMsg === "string" && parsedMsg.trim().length > 0) {
    errorMessage = parsedMsg.trim();
  } else if (res.status === 400) {
    errorMessage = "Invalid request payload. Please check your input and try again.";
  } else if (res.status === 401) {
    errorMessage = "Authentication failed. Please verify your credentials and sign in again.";
  } else if (res.status === 403) {
    errorMessage = "Access denied: Your account is not authorized for this resource.";
  } else if (res.status === 404) {
    errorMessage = "The requested server endpoint was not found.";
  } else if (res.status === 429) {
    errorMessage = "Too many requests. For security, please wait a moment and try again.";
  } else if (res.status === 503) {
    errorMessage = "Authentication service is temporarily unavailable. Please verify server environment configuration.";
  } else if (res.status >= 500 && res.status < 600) {
    errorMessage = "A server error occurred (HTTP " + res.status + "). Please verify backend environment configuration.";
  } else {
    errorMessage = fallbackErrorMessage;
  }

  return {
    ok: false,
    status: res.status,
    data,
    errorMessage,
    rawText,
  };
}

/**
 * Executes a network fetch with built-in network error and response safety handling.
 */
export async function safeFetch<T = Record<string, unknown>>(
  input: RequestInfo | URL,
  init?: RequestInit,
  fallbackErrorMessage?: string
): Promise<SafeApiResponse<T>> {
  try {
    const res = await fetch(input, init);
    return await parseSafeResponse<T>(res, fallbackErrorMessage);
  } catch (err: unknown) {
    let networkMsg = "Network error. Unable to contact the server. Please check your internet connection.";
    if (err instanceof Error) {
      const lower = err.message.toLowerCase();
      if (lower.includes("abort")) {
        networkMsg = "Request was cancelled or timed out.";
      }
    }
    return {
      ok: false,
      status: 0,
      data: null,
      errorMessage: networkMsg,
    };
  }
}
