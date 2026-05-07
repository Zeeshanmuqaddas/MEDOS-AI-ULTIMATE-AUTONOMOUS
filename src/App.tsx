/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { CommandCenter } from './components/dashboard/CommandCenter';

export default function App() {
  return (
    <AppLayout>
      <CommandCenter />
    </AppLayout>
  );
}
