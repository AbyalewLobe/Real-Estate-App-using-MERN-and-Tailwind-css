import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import Contact from "../components/Contact";
export default function Listing() {
  SwiperCore.use([Navigation, Pagination]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);
  useEffect(() => {
    const fechListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };
    fechListing();
  }, [params.listingId]);
  return (
    <main className="bg-gray-100 min-h-screen">
      {loading && <p className="text-center my-7 text=2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text=2xl">Something went wrong!!</p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper
            navigation
            pagination
            className="rounded-lg overflow-hidden shadow-lg"
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[450px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      <div className="bg-[#f9f8f8]  mx-auto p-6 mt-8 max-w-6xl text-start">
        <h1 className="text-3xl font-semibold text-gray-800 ">
          {listing?.name} {" - "}${" "}
          {listing?.offer
            ? +listing?.regularPrice - listing?.discountPrice
            : listing?.regularPrice}
          /month
        </h1>
        <p className="mt-3 text-md text-gray-600 ">
          <FaMapMarkerAlt className="text-green-600 mr-2" />
          {listing?.address}
        </p>

        <div className="mt-4 flex  gap-4">
          {listing?.type === "rent" ? (
            <p className="bg-red-600 text-white text-center px-4 py-2 rounded-md font-semibold">
              For Rent
            </p>
          ) : (
            <div className="flex justify-center gap-2">
              <p className="bg-red-600 text-white text-center px-4 py-2 rounded-md font-semibold">
                For Sale
              </p>
              {listing?.offer && (
                <p className="bg-green-600 text-white text-center px-4 py-2 rounded-md font-semibold">
                  ${listing?.discountPrice} Discount
                </p>
              )}
            </div>
          )}
        </div>

        <p className="mt-6 text-gray-700   mx-auto">
          <span className="text-black font-semibold">Description - </span>
          {listing?.description}
        </p>

        <ul className="mt-6 flex  text-green-700 font-semibold text-sm flex-wrap gap-6">
          <li className="flex items-center gap-2">
            <FaBed className="text-lg" />
            <span className="bg-[#cce5e0] px-2 py-1 rounded">
              {listing?.bedrooms > 1
                ? `${listing?.bedrooms} Beds`
                : `${listing?.bedrooms} Bed`}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FaBath className="text-lg" />
            <span className="bg-[#cce5e0] px-2 py-1 rounded">
              {listing?.bathrooms > 1
                ? `${listing?.bathrooms} Bathrooms`
                : `${listing?.bathrooms} Bathroom`}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FaParking className="text-lg" />
            <span className="bg-[#cce5e0] px-2 py-1 rounded">
              {listing?.parking ? "Parking" : "No Parking"}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FaChair className="text-lg" />
            <span className="bg-[#cce5e0] px-2 py-1 rounded">
              {listing?.furnished ? "Furnished" : "Not Furnished"}
            </span>
          </li>
        </ul>
        {currentUser && listing?.userRef !== currentUser._id && !contact && (
          <button
            onClick={() => setContact(true)}
            className="bg-[#2d3e50] text-white mt-8 w-full rounded-md py-3 text-lg font-semibold hover:bg-[#1c2c3a] transition"
          >
            CONTACT LANDLORD
          </button>
        )}
        {contact && <Contact listing={listing} />}
      </div>
    </main>
  );
}
