import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./loading.json";
import CardItems from "../components/CardItems";
export default function Search() {
  const [sidebardata, setsidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setsidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setsidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "furnished" ||
      e.target.id === "parking"
    ) {
      setsidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];
      setsidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (sidebardata.searchTerm.trim()) {
      urlParams.set("searchTerm", sidebardata.searchTerm);
    }

    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    const typeFormUrl = urlParams.get("type");
    const parkingFormUrl = urlParams.get("parking");
    const furnishedFormUrl = urlParams.get("furnished");
    const offerFormUrl = urlParams.get("offer");
    const sortFormUrl = urlParams.get("sort");
    const orderFormUrl = urlParams.get("order");

    if (
      searchTermFormUrl ||
      typeFormUrl ||
      parkingFormUrl ||
      furnishedFormUrl ||
      offerFormUrl ||
      sortFormUrl ||
      orderFormUrl
    ) {
      setsidebardata({
        searchTerm:
          searchTermFormUrl === "null" || !searchTermFormUrl
            ? ""
            : searchTermFormUrl,
        type: typeFormUrl || "all",
        parking: parkingFormUrl === "true" ? true : false,
        furnished: furnishedFormUrl === "true" ? true : false,
        offer: offerFormUrl === "true" ? true : false,
        sort: sortFormUrl || "created_at",
        order: orderFormUrl || "desc",
      });

      const fetchListings = async () => {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      };
      fetchListings();
    }
  }, [location.search]);

  const onShowMoreClick = async () => {
    const numberOfListing = listings.length;
    const startIndex = numberOfListing;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-8 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                checked={sidebardata.type === "all"}
                onChange={handleChange}
                type="checkbox"
                id="all"
                className="w-5"
              />
              <span>Rent&sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={sidebardata.type === "rent"}
                onChange={handleChange}
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={sidebardata.type === "sale"}
                onChange={handleChange}
                id="sale"
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={sidebardata.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2  flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort :</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3 "
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            search
          </button>
        </form>
      </div>

      <div className="flex-1 p-7">
        <h1 className="text-2xl font-semibold text-slate-500  mt-5">
          Search results:
        </h1>
        <div className="p-7  flex flex-wrap gap-4 ">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <div className="w-full h-[500px] flex justify-center items-center flex-col gap-2">
              <Lottie animationData={animationData} loop={true} />
              <p className="text-xl text-slate-700 text-center w-full">
                Loading......
              </p>
            </div>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <CardItems key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              className="text-green-700 hover:underline p-7 text-center w-full"
              onClick={onShowMoreClick}
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
