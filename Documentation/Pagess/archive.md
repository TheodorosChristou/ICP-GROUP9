# Archive Page

This component is responsible for displaying archived observations. It provides functionalities to search, delete, update, open, and close observations. 

## Import Statements

```tsx
import React, { useEffect, useState } from 'react';
import ObservationForm, { ObservationValues } from "../components/ObservationForm"
import Observation from '../../models/Observation';
import axios from "axios";
import { useMutation } from "react-query";
import FadeInDiv from '../components/FadeInDiv';
import useSession from "../pages/api/auth/useNextAuth"
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';
import Fuse from 'fuse.js';
```

## Components Used

- ObservationForm: Component for adding new observations.

- FadeInDiv: Component for adding fade-in animation.

- useSession: Custom hook for managing user session.

## Implementation

- Retrieves observations from the server and displays them in a table.

- Provides search functionality to filter observations by ticket number, observation text, latitude, and longitude.

- Allows authorized users to perform actions like update, delete, open, and close observations.

## Functionality

- Displays a table of archived observations.

- Provides search functionality to filter observations.

- Allows authorized users to perform actions like delete, update, open, and close observatio