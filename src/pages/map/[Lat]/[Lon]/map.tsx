import React from 'react';
import { GetServerSideProps } from 'next';
import dbConnect from '../../../../../lib/dbConnect';
import ObservationModel, { ObservationInterface } from '../../../../../models/Observation'; // Import ObservationModel and ObservationInterface
import dynamic from 'next/dynamic';

// Dynamic map, using Next.js dynamic for lazy loading for performance
const DynamicMap = dynamic(() => import("../../../../components/DynamicMap"), {
  ssr: false,
});
// This helps with shaping the data that the DynamicMap will receive  from the mapData prop
interface MapPageProps {
  mapData: ObservationInterface[];
}

//Accepts mapData prop as an array of datapoints
export default function Dmap({ mapData }: MapPageProps) {
  return <DynamicMap mapData={mapData}/>;
}

//Next.js function, ensures that the connection is there before fetching data
export const getServerSideProps: GetServerSideProps<MapPageProps> = async () => {
  await dbConnect(); // Connect to the MongoDB database

  // Fetch data from MongoDB and convert them to javascript objects
  const results = await ObservationModel.find({}).lean();
  //adds a stringified _id
  const map = results.map((doc) => ({ ...doc, _id: doc._id.toString() }));
//returns a prop that contains data to be transfered to the DynamicMap
  return { props: { mapData: map } };
};