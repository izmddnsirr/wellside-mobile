import { createClient } from "@supabase/supabase-js";
import { sendBookingConfirmationEmailTo } from "@/utils/email/booking-confirmation";
import { sendBookingCancellationEmailTo } from "@/utils/email/booking-cancellation";

type BookingEmailEvent = "confirmation" | "cancellation";
type BookingEmailAudience = "customer" | "admin";

type BookingEmailRequest = {
  event: BookingEmailEvent;
  audience: BookingEmailAudience;
  email?: string | null;
  customerName?: string | null;
  customerPhone?: string | null;
  bookingId?: string | null;
  bookingRef?: string | null;
  services?: string | null;
  barberName?: string | null;
  bookingDate?: string | null;
  bookingTime?: string | null;
  totalPrice?: string | null;
};

const json = (status: number, payload: Record<string, unknown>) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const asTrimmed = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const isAudience = (value: unknown): value is BookingEmailAudience =>
  value === "customer" || value === "admin";

const isEvent = (value: unknown): value is BookingEmailEvent =>
  value === "confirmation" || value === "cancellation";

const requireField = (value: string, label: string) => {
  if (!value) {
    return `${label} is required.`;
  }
  return null;
};

const getSupabaseServerClient = () => {
  const url =
    asTrimmed(process.env.EXPO_PUBLIC_SUPABASE_URL) ||
    asTrimmed(process.env.SUPABASE_URL);
  const key =
    asTrimmed(process.env.SUPABASE_SERVICE_ROLE_KEY) ||
    asTrimmed(process.env.SUPABASE_SERVICE_KEY) ||
    asTrimmed(process.env.EXPO_PUBLIC_SUPABASE_KEY);

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

const fetchAdminEmails = async () => {
  const client = getSupabaseServerClient();
  if (!client) {
    return [] as string[];
  }

  const { data, error } = await client
    .from("profiles")
    .select("email")
    .eq("role", "admin");

  if (error || !data) {
    console.warn("Admin email fetch failed:", error);
    return [] as string[];
  }

  return data
    .map((row) => asTrimmed(row.email))
    .filter((email) => email);
};

export async function POST(request: Request) {
  let body: BookingEmailRequest;
  try {
    body = (await request.json()) as BookingEmailRequest;
  } catch (_error) {
    return json(400, { error: "Invalid JSON body." });
  }

  if (!isEvent(body.event)) {
    return json(400, { error: "Invalid event type." });
  }
  if (!isAudience(body.audience)) {
    return json(400, { error: "Invalid audience type." });
  }

  const customerName = asTrimmed(body.customerName) || "Customer";
  const bookingRef = asTrimmed(body.bookingRef);
  const bookingId = bookingRef || asTrimmed(body.bookingId);
  const services = asTrimmed(body.services);
  const barberName = asTrimmed(body.barberName);
  const bookingDate = asTrimmed(body.bookingDate);
  const bookingTime = asTrimmed(body.bookingTime);
  const totalPrice = asTrimmed(body.totalPrice);
  const customerPhone = asTrimmed(body.customerPhone) || null;

  const customerEmail = asTrimmed(body.email);
  const adminEmails =
    body.audience === "admin" ? await fetchAdminEmails() : [];
  const adminEmailFallback =
    asTrimmed(process.env.BOOKING_ADMIN_EMAIL) ||
    asTrimmed(process.env.RESEND_ADMIN_EMAIL);
  const to =
    body.audience === "admin"
      ? adminEmails.length > 0
        ? adminEmails
        : adminEmailFallback
      : customerEmail;

  const missing =
    requireField(to, body.audience === "admin" ? "Admin email" : "Customer email") ||
    requireField(bookingId, "Booking reference") ||
    requireField(services, "Service") ||
    requireField(barberName, "Barber name") ||
    requireField(bookingDate, "Booking date") ||
    requireField(bookingTime, "Booking time") ||
    requireField(totalPrice, "Total price");

  if (missing) {
    return json(400, { error: missing });
  }

  try {
    if (body.event === "confirmation") {
      await sendBookingConfirmationEmailTo(
        {
          customerName,
          customerPhone,
          bookingId,
          services,
          barberName,
          bookingDate,
          bookingTime,
          totalPrice,
        },
        to,
        body.audience
      );
    } else {
      await sendBookingCancellationEmailTo(
        {
          customerEmail: to,
          customerName,
          customerPhone,
          bookingId,
          services,
          barberName,
          bookingDate,
          bookingTime,
          totalPrice,
        },
        to,
        body.audience
      );
    }
  } catch (error) {
    console.error("Booking email send failed:", error);
    return json(500, { error: "Unable to send booking email." });
  }

  return json(200, { ok: true });
}
