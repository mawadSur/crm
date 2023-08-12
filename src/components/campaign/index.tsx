// src/components/BlastCampaignCard.js
import React, { useState } from 'react';
import campaignStyle from './style.js';

const BlastCampaignCard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalCustomers, setTotalCustomers] = useState(1000); // Example initial value

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e) => {
    // Example logic: subtract 10 for each character entered.
    setTotalCustomers(1000 - e.target.value.length * 10);
  };

  return (
    <div>
      <campaignStyle.Card onClick={handleClick} open={isMenuOpen}>
        {/* <icon> */}
        <campaignStyle.Title>Blast Campaign</campaignStyle.Title>
      </campaignStyle.Card>
      <campaignStyle.Dropdown open={isMenuOpen}>
        <p>Total Customers: {totalCustomers}</p>
        <campaignStyle.Input placeholder="Filter by occupation" onChange={handleInputChange} />
        <campaignStyle.Input placeholder="Filter by source of lead" onChange={handleInputChange} />
        <campaignStyle.Input
          placeholder="Filter by preferred contact method"
          onChange={handleInputChange}
        />
        <campaignStyle.Input placeholder="Filter by age" onChange={handleInputChange} />
        <campaignStyle.Input placeholder="Filter by location" onChange={handleInputChange} />
        <campaignStyle.Input
          placeholder="Filter by purchase history"
          onChange={handleInputChange}
        />
        <campaignStyle.Input placeholder="Filter by car make" onChange={handleInputChange} />
        <campaignStyle.Input placeholder="Filter by car model" onChange={handleInputChange} />
        <campaignStyle.Input placeholder="Filter by car year" onChange={handleInputChange} />
        <campaignStyle.Input placeholder="Filter by car color" onChange={handleInputChange} />
        <campaignStyle.Input placeholder="Filter by car price range" onChange={handleInputChange} />
        <campaignStyle.Input
          placeholder="Filter by lease or purchase"
          onChange={handleInputChange}
        />
        <campaignStyle.Input
          placeholder="Filter by last service date"
          onChange={handleInputChange}
        />
        <campaignStyle.Input placeholder="Filter by warranty status" onChange={handleInputChange} />
        <campaignStyle.Input
          placeholder="Filter by financing status"
          onChange={handleInputChange}
        />
        <campaignStyle.Input
          placeholder="Filter by customer type (new/returning)"
          onChange={handleInputChange}
        />
        <campaignStyle.Input
          placeholder="Filter by test drive history"
          onChange={handleInputChange}
        />
        <campaignStyle.Input
          placeholder="Filter by trade-in history"
          onChange={handleInputChange}
        />
        {/* Add more input boxes as needed */}
        <campaignStyle.LaunchButton>
          {/* <FaRocket /> */}
          Launch
        </campaignStyle.LaunchButton>
      </campaignStyle.Dropdown>
    </div>
  );
};

export default BlastCampaignCard;
