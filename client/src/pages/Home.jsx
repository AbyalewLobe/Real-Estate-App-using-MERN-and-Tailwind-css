import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardItems from "../components/CardItems";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSealListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSealListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top  */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-gray-400 text-xl sm:text-sm">
          Abyalew Estate is your dedicated companion in the journey to finding
          the perfect place to call home. Whether you're searching for a cozy
          apartment, a spacious family house, or a modern rental, we make the
          process simple, smooth, and stress-free. With a wide range of
          listings, personalized support, and a commitment to your satisfaction.
          <br />
          Abyalew Estate helps you move forward with confidence—because finding
          the right home should feel just as good as living in it.
        </div>
        <Link
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline "
          to={"/search"}
        >
          Let's get started now...
        </Link>
      </div>

      {/* swiper */}
      <Swiper
        navigation
        spaceBetween={20} // Space between slides
        centeredSlides={true} // Center the active slide
        loop={true} // Enable looping (optional)
        // Center Swiper container
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px] rounded-lg shadow-lg transform transition-all hover:scale-105"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results */}

      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"search?offer=true"}
              >
                Show more offer
              </Link>
            </div>
            <div className="flex flex-wrap  gap-4 ">
              {offerListings.map((listing) => (
                <CardItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent place for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"search?type=rent"}
              >
                Show more place for rent
              </Link>
            </div>
            <div className="flex flex-wrap  gap-4 ">
              {rentListings.map((listing) => (
                <CardItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent place for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"search?type=sale"}
              >
                Show more place for sale
              </Link>
            </div>
            <div className="flex flex-wrap  gap-4 ">
              {saleListings.map((listing) => (
                <CardItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
