import React from 'react';
import { FaBuilding, FaHandshake, FaUsers } from 'react-icons/fa';

export default function About() {
  return (
    <div className="bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-6">
          About <span className="text-blue-600">HomeQuest</span>
        </h1>
        <p className="text-lg text-slate-600 mb-12 leading-relaxed">
          HomeQuest is a leading real estate agency dedicated to helping clients buy, sell, and rent properties in the most desirable neighborhoods. 
          With a team of seasoned professionals, we ensure a seamless experience from start to finish.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 text-center">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaHandshake className="text-blue-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Our Mission</h2>
          <p className="text-slate-600 text-sm">
            To guide clients in reaching their real estate goals with expert advice, tailored service, and local insights.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaUsers className="text-blue-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Our People</h2>
          <p className="text-slate-600 text-sm">
            Our agents bring a wealth of experience, providing the highest level of commitment and personalized attention.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaBuilding className="text-blue-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Our Promise</h2>
          <p className="text-slate-600 text-sm">
            We strive to make every transaction exciting and rewarding, turning your vision into a reality.
          </p>
        </div>
      </div>
    </div>
  );
}

