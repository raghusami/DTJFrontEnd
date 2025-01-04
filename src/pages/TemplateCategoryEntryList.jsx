// src/components/TemplateCategoryEntryList.js
import React, { useState } from 'react';
import {
  Box, Button, FormControlLabel,Container, Switch, Typography, Grid, Paper, Divider,
} from '@mui/material';
import Navbar from '../components/Navbar';  // Import Navbar component
import Breadcrumbs from '../components/Breadcrumbs';

const categories = [
  { category: 'Housing', subcategory: 'Rent' },
  { category: 'Housing', subcategory: 'Mortgage' },
  { category: 'Housing', subcategory: 'Property Taxes' },
  { category: 'Housing', subcategory: 'Home Insurance' },
  { category: 'Housing', subcategory: 'Maintenance/Repairs' },
  { category: 'Utilities', subcategory: 'Electricity' },
  { category: 'Utilities', subcategory: 'Water' },
  { category: 'Utilities', subcategory: 'Gas' },
  { category: 'Utilities', subcategory: 'Internet' },
  { category: 'Utilities', subcategory: 'Cable/Satellite (DTH)' },
  { category: 'Utilities', subcategory: 'Trash Collection' },
  { category: 'Utilities', subcategory: 'Mobile Recharge' },
  { category: 'Utilities', subcategory: 'TV Recharge' },
  { category: 'Transportation', subcategory: 'Car Payments' },
  { category: 'Transportation', subcategory: 'Fuel' },
  { category: 'Transportation', subcategory: 'Public Transport' },
  { category: 'Transportation', subcategory: 'Insurance' },
  { category: 'Transportation', subcategory: 'Maintenance/Repairs' },
  { category: 'Transportation', subcategory: 'Parking/Tolls' },
  { category: 'Transportation', subcategory: 'Taxi/Ridesharing (Ola/Uber)' },
  { category: 'Food', subcategory: 'Groceries' },
  { category: 'Food', subcategory: 'Dining Out' },
  { category: 'Food', subcategory: 'Takeout' },
  { category: 'Healthcare', subcategory: 'Insurance Premiums' },
  { category: 'Healthcare', subcategory: 'Doctor Visits' },
  { category: 'Healthcare', subcategory: 'Dental Care' },
  { category: 'Healthcare', subcategory: 'Medications' },
  { category: 'Healthcare', subcategory: 'Vision Care' },
  { category: 'Personal Care', subcategory: 'Haircuts/Salons' },
  { category: 'Personal Care', subcategory: 'Skincare' },
  { category: 'Personal Care', subcategory: 'Fitness/Gym' },
  { category: 'Personal Care', subcategory: 'Spa/Massage' },
  { category: 'Entertainment', subcategory: 'Movies' },
  { category: 'Entertainment', subcategory: 'Concerts' },
  { category: 'Entertainment', subcategory: 'Subscriptions (Netflix, Amazon Prime, Spotify, etc.)' },
  { category: 'Entertainment', subcategory: 'Events' },
  { category: 'Entertainment', subcategory: 'Online Streaming Services' },
  { category: 'Gifts & Donations', subcategory: 'Charitable Donations' },
  { category: 'Gifts & Donations', subcategory: 'Gifts for Family/Friends' },
  { category: 'Children', subcategory: 'Childcare' },
  { category: 'Children', subcategory: 'School Fees' },
  { category: 'Children', subcategory: 'Activities' },
  { category: 'Children', subcategory: 'Toys/Books' },
  { category: 'Children', subcategory: 'Extracurricular Classes' },
  { category: 'Pets', subcategory: 'Food' },
  { category: 'Pets', subcategory: 'Veterinary Care' },
  { category: 'Pets', subcategory: 'Supplies' },
  { category: 'Pets', subcategory: 'Grooming' },
  { category: 'Clothing', subcategory: 'New Clothing' },
  { category: 'Clothing', subcategory: 'Repairs/Alterations' },
  { category: 'Miscellaneous', subcategory: 'Bank Fees' },
  { category: 'Miscellaneous', subcategory: 'Postage' },
  { category: 'Miscellaneous', subcategory: 'Office Supplies' },
  { category: 'Miscellaneous', subcategory: 'Other Unclassified Expenses' },
  { category: 'Miscellaneous', subcategory: 'Online Purchases (Amazon, Flipkart, etc.)' },
  { category: 'Miscellaneous', subcategory: 'Home Decor' },
  { category: 'Miscellaneous', subcategory: 'Housekeeping Services' },
  { category: 'Miscellaneous', subcategory: 'Laundry' },
  { category: 'Travel', subcategory: 'Domestic Travel' },
  { category: 'Travel', subcategory: 'International Travel' },
  { category: 'Travel', subcategory: 'Hotels/Accommodation' },
  { category: 'Travel', subcategory: 'Travel Insurance' },
  { category: 'Travel', subcategory: 'Tour Packages' },
];

const TemplateCategoryEntryList = () => {
  const [selectedCategories, setSelectedCategories] = useState({});

  const handleToggleChange = (category, subcategory) => {
    setSelectedCategories(prevState => ({
      ...prevState,
      [subcategory]: !prevState[subcategory],
    }));
  };

  const handleSaveTemplate = () => {
    // Save the selected categories to the template (e.g., send to backend or save to state)
    const selectedTemplate = categories.filter(item => selectedCategories[item.subcategory]);
    console.log('Saved template:', selectedTemplate);
    // Add your save logic here
  };
  const handleToggleSidebar = () => {
    // Define how to toggle the sidebar
  };
  
  const groupedCategories = categories.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <>
    <Navbar onToggleSidebar={handleToggleSidebar} title="Expense Template" />
    <Container maxWidth={false} className="dashboard-container" sx={{ padding: '16px 24px' }}>
        <Breadcrumbs/>
    <Paper style={{ padding: 16 }}>
      {Object.keys(groupedCategories).map(category => (
        <Box key={category} mb={3}>
          <Typography variant="h6" gutterBottom>
            {category}
          </Typography>
          <Divider />
          <Grid container spacing={1}>
            {groupedCategories[category].map(item => (
              <Grid item xs={12} sm={4} key={`${item.category}-${item.subcategory}`}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body1">{item.subcategory}</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!selectedCategories[item.subcategory]}
                        onChange={() => handleToggleChange(item.category, item.subcategory)}
                        name={item.subcategory}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSaveTemplate}>
          Save Template
        </Button>
      </Box>
    </Paper>
    </Container>
    </>
  );
};

export default TemplateCategoryEntryList;
