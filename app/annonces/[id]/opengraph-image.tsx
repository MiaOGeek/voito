import { ImageResponse } from "next/og";
import prisma from "@/lib/db";
import { resolveImageUrl } from "@/lib/s3";

export const runtime = "nodejs";
export const alt = "Annonce Voito";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: { brand: true },
  });

  if (!listing) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
            color: "white",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          <span>voi</span>
          <span style={{ color: "#f59e0b" }}>to</span>
        </div>
      ),
      { ...size }
    );
  }

  let photoUrl: string | null = null;
  if (Array.isArray(listing.images) && listing.images[0]) {
    photoUrl = resolveImageUrl(listing.images[0] as string);
  }

  const formattedPrice = Number(listing.price).toLocaleString("fr-TN");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#111",
        }}
      >
        {photoUrl && (
          <img
            src={photoUrl}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "65%",
            background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))",
            display: "flex",
          }}
        />
        {/* Voito branding */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 40,
            display: "flex",
            alignItems: "center",
            background: "rgba(0,0,0,0.6)",
            padding: "8px 20px",
            borderRadius: 8,
            fontSize: 28,
            fontWeight: 700,
            color: "white",
          }}
        >
          voi<span style={{ color: "#f59e0b" }}>to</span>
        </div>
        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 40,
            display: "flex",
            background: "#f59e0b",
            color: "#111",
            padding: "8px 20px",
            borderRadius: 8,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {listing.category === "VOITURES"
            ? "Voiture"
            : listing.category === "MOTOS"
            ? "Moto"
            : "Piece"}
        </div>
        {/* Content */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "white",
              lineClamp: 2,
              overflow: "hidden",
            }}
          >
            {listing.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: "#f59e0b",
              }}
            >
              {formattedPrice} TND
            </div>
            {listing.year && (
              <div style={{ fontSize: 24, color: "#d1d5db" }}>
                {listing.year}
              </div>
            )}
            {listing.mileage && (
              <div style={{ fontSize: 24, color: "#d1d5db" }}>
                {listing.mileage.toLocaleString()} km
              </div>
            )}
            {listing.city && (
              <div style={{ fontSize: 24, color: "#d1d5db" }}>
                {listing.city}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
