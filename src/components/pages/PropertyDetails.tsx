import { Link, useParams } from "react-router-dom";
import type { IBookingFormValues } from "@/interfaces";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { BookingForm } from "@/components/shared/BookingForm";
import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { PropertyImage } from "@/components/shared/PropertyImage";
import { usePublicProperties } from "@/hooks/usePublicProperties";
import { formatPrice } from "@/lib/formatters";
import { requestViewing } from "@/api/viewings";
// صفحة تفاصيل عقار + كارت حجز معاينة
export function PropertyDetails() {
  const { id } = useParams();
  const { properties, loading, error } = usePublicProperties();

  // القائمة فيها العقارات المتاحة بس، فأي عقار reserved أو sold مش هيتلاقى
  const property = properties.find((item) => item.id === Number(id));

  async function handleBooking(values: IBookingFormValues) {
    if (!property) return;
    await requestViewing(values, property.id);
  }

  if (loading) {
    return (
      <Container>
        <div className="my-10">
          <EmptyState text="Loading property..." />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="my-10">
          <EmptyState text={error} />
        </div>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container>
        <div className="my-10">
          <EmptyState
            title="This property is not available"
            text="It may have been reserved or sold."
          >
            <Button to="/properties" variant="teal">
              Browse properties
            </Button>
          </EmptyState>
        </div>
      </Container>
    );
  }

  const typeName = property.type ? property.type.name : "";

  return (
    <Container>
      <Link
        to="/properties"
        className="inline-block mt-[22px] mb-[14px] text-teal font-semibold"
      >
        Back to properties
      </Link>

      <div className="grid gap-[26px] pb-14 min-[960px]:grid-cols-[1.5fr_1fr] min-[960px]:items-start">
        <div>
          <PropertyImage
            imageUrl={property.image_url}
            title={property.title}
            typeName={typeName}
            size="detail"
          />
          <h1 className="text-[length:clamp(30px,5vw,44px)] mt-[18px] mb-1.5">
            {property.title}
          </h1>
          <p className="text-mut flex items-center gap-1.5 text-[14px]">
            <Icon name="pin" />
            {property.address}
          </p>
          <div className="text-[26px] font-bold text-copper-dark mt-[10px] mb-[18px]">
            {formatPrice(property.price)}
          </div>

          <div className="grid grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden mb-[22px] min-[640px]:grid-cols-4">
            <div className="bg-white px-4 py-[14px]">
              <small className="block text-mut text-[12.5px]">Type</small>
              <b className="font-semibold">{typeName}</b>
            </div>
            <div className="bg-white px-4 py-[14px]">
              <small className="block text-mut text-[12.5px]">Area</small>
              <b className="font-semibold">{property.area_sqm + " m\u00B2"}</b>
            </div>
            <div className="bg-white px-4 py-[14px]">
              <small className="block text-mut text-[12.5px]">Bedrooms</small>
              <b className="font-semibold">
                {property.bedrooms > 0 ? property.bedrooms : "None"}
              </b>
            </div>
            <div className="bg-white px-4 py-[14px]">
              <small className="block text-mut text-[12.5px]">Status</small>
              <Badge variant="success">Available</Badge>
            </div>
          </div>

          {property.description && (
            <>
              <h2 className="text-[24px] mb-2">About this property</h2>
              <p className="text-[#3a4a4b] max-w-[68ch]">
                {property.description}
              </p>
            </>
          )}
        </div>

        <BookingForm propertyTitle={property.title} onSubmit={handleBooking} />
      </div>
    </Container>
  );
}
