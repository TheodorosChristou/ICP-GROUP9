# Index Page

## Description
The index page of the Maritime Emergency Response application displays archived observations and provides functionalities for users to search, delete, update, open, and close observations.

## Import Statements

```tsx
import React, { useEffect, useState } from 'react';
import ObservationForm, { ObservationValues } from "../components/ObservationForm"
import Observation from '../../models/Observation';
import axios from "axios";
import { useMutation } from "react-query";
import FadeInDiv from '../components/FadeInDiv';
import useSession from "../pages/api/auth/useNextAuth";
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';
import WeatherComponent, { WeatherResponse } from '../components/WeatherComponent';
import { Card, Typography } from "@material-tailwind/react";
import Fuse from 'fuse.js';
```

## Functionality

- Displays archived observations in a table.

- Provides search functionality to filter observations by ticket number, observation text, latitude, and longitude.

- Allows authorized users to perform actions like update, delete, open, and close observations.

- The index page relies on the ObservationForm component for adding new observations.

- It also utilizes the useSession hook for managing user sessions.
