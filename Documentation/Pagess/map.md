# Map page

## Description

The map page displays a dynamic map component. It receives data from the server and passes it to the DynamicMap component for visualization.

## Import Statements

```tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';
import ObservationModel, { ObservationInterface } from '../../models/Observation';
import dynamic from 'next/dynamic';
```

## Dynamic Map
The map page dynamically loads the DynamicMap component using Next.js dynamic for lazy loading to improve performance.

## Server-Side Data Fetching
The getServerSideProps function ensures the connection to the MongoDB database and fetches observation data from the database. It returns the data as props for the Dmap component.

```tsx
export const getServerSideProps: GetServerSideProps<MapPageProps> = async () => {
  await dbConnect(); // Connect to the MongoDB database

  // Fetch data from MongoDB and convert them to JavaScript objects
  const results = await ObservationModel.find({}).lean();
  // Adds a stringified _id
  const map = results.map((doc) => ({ ...doc, _id: doc._id.toString() }));

  // Returns props containing data to be transferred to the DynamicMap
  return { props: { mapData: map } };
};

```