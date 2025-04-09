import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import homeImage from '../assets/home.png';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [allListings, setAllListings] = useState({ offers: [], sales: [], rents: [] });

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setAllListings(prev => ({ ...prev, offers: data }));
        setOfferListings(filterListingsByLocation(data, searchLocation));
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setAllListings(prev => ({ ...prev, rents: data }));
        setRentListings(filterListingsByLocation(data, searchLocation));
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setAllListings(prev => ({ ...prev, sales: data }));
        setSaleListings(filterListingsByLocation(data, searchLocation));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const searchQuery = searchLocation ? `&searchTerm=${encodeURIComponent(searchLocation)}` : '';
        const [offerRes, rentRes, saleRes] = await Promise.all([
          fetch(`/api/listing/get?offer=true&limit=4${searchQuery}`),
          fetch(`/api/listing/get?type=rent&limit=4${searchQuery}`),
          fetch(`/api/listing/get?type=sale&limit=4${searchQuery}`)
        ]);

        const [offerData, rentData, saleData] = await Promise.all([
          offerRes.json(),
          rentRes.json(),
          saleRes.json()
        ]);

        setOfferListings(offerData);
        setRentListings(rentData);
        setSaleListings(saleData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllListings();
  }, [searchLocation]);

  const filterListingsByLocation = (listings, location) => {
    if (!location) return listings;
    const searchTerm = location.toLowerCase().trim();
    
    return listings.filter(listing => {
      if (!listing.address) return false;
      return listing.address.toLowerCase().includes(searchTerm);
    });
  };

  useEffect(() => {
    setOfferListings(filterListingsByLocation(allListings.offers, searchLocation));
    setRentListings(filterListingsByLocation(allListings.rents, searchLocation));
    setSaleListings(filterListingsByLocation(allListings.sales, searchLocation));
  }, [searchLocation, allListings]);
  SwiperCore.use([Navigation]);

  // Add this before the hero section
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Remove the search input section and start directly with hero section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find your next <span className="text-green-500">perfect</span> <br /> place with ease
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            HomeQuest is the best place to find your next perfect place to live.
            We have a wide range of properties for you to choose from.
          </p>
          <Link
            to="/search"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Let's get started
          </Link>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={homeImage}
            alt="Modern Home"
           className=""
          />
        </div>
      </div>

      {/* Swiper Section */}
      <div className="px-6 md:px-10 lg:px-20 mt-24">
        <Swiper navigation className="rounded-xl overflow-hidden">
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center`,
                    backgroundSize: 'cover',
                  }}
                  className="h-[500px] rounded-xl shadow-lg relative"
                >
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 p-4 text-white">
                    <h3 className="text-lg font-semibold">{listing.name}</h3>
                    <p className="text-sm">{listing.address}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Listings Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {offerListings && offerListings.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold">Recent Offers</h2>
              <Link to="/search?offer=true" className="text-green-500 hover:underline text-sm">
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {rentListings && rentListings.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold">Places for Rent</h2>
              <Link to="/search?type=rent" className="text-green-500 hover:underline text-sm">
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {saleListings && saleListings.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold">Places for Sale</h2>
              <Link to="/search?type=sale" className="text-green-500 hover:underline text-sm">
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

