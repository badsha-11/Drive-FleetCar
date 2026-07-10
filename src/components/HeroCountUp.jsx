"use client";

import CountUp from "react-countup";

const HeroCountUp = () => {
  return (
    <div className="mt-12 flex flex-wrap gap-8">
      <div>
        <h2 className="text-4xl font-bold text-cyan-400">
          <CountUp
            start={0}
            end={500}
            duration={3}
            suffix="+"
          />
        </h2>

        <p className="text-gray-300">Premium Cars</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-cyan-400">
          <CountUp
            start={0}
            end={10000}
            duration={3}
            separator=","
            suffix="+"
          />
        </h2>

        <p className="text-gray-300">Happy Customers</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-cyan-400">
          <CountUp
            start={0}
            end={4.9}
            duration={3}
            decimals={1}
            suffix="★"
          />
        </h2>

        <p className="text-gray-300">Customer Rating</p>
      </div>
    </div>
  );
};

export default HeroCountUp;