import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import homeImage from '../assets/home.png';
import Navbar from '../components/Navbar';


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

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Hero Section with Search */}
      <div className="relative h-[600px]">
        <div className="absolute inset-0">
          {offerListings && offerListings.length > 0 && (
            <div
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${offerListings[0].imageUrls[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="w-full h-full"
            />
          )}
          
          {/* Price Overlay */}
          {offerListings && offerListings.length > 0 && (
            <div className="absolute left-12 bottom-32 bg-black bg-opacity-75 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{offerListings[0].address}</h2>
              <div className="bg-green-500 text-white px-4 py-1 rounded-md inline-block">
                ₹{offerListings[0].regularPrice.toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {/* Rest of the hero section content */}
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-white">
          <h1 className="text-5xl font-bold mb-4">Find your next perfect place with ease</h1>
          <p className="text-xl mb-8">HomeQuest is the best place to find your next perfect place to live.</p>
          
          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select className="p-3 border rounded-lg text-gray-700">
                <option>Property type</option>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
              <input
                type="number"
                placeholder="No. rooms"
                className="p-3 border rounded-lg text-gray-700"
              />
              <input
                type="text"
                placeholder="Location"
                className="p-3 border rounded-lg text-gray-700"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <button className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
                Search Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerListings && offerListings.length > 0 &&
            offerListings.slice(0, 3).map((listing) => (
              <div key={listing._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={listing.imageUrls[0]}
                  alt={listing.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{listing.name}</h3>
                  <p className="text-gray-600 mb-2">{listing.address}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-500 font-bold">₹{listing.regularPrice.toLocaleString()}</span>
                    <Link
                      to={`/listing/${listing._id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Properties by Category */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Rent Section */}
          {rentListings && rentListings.length > 0 && (
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold">Places for Rent</h2>
                <Link to="/search?type=rent" className="text-green-500 hover:underline">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

          {/* Sale Section */}
          {saleListings && saleListings.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold">Places for Sale</h2>
                <Link to="/search?type=sale" className="text-green-500 hover:underline">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

