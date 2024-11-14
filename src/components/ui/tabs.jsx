import React from 'react';

export const Tabs = ({ children, defaultValue, className }) => (
  <div className={`tabs ${className}`} data-tabs={defaultValue}>
    {children}
  </div>
);

export const TabsList = ({ children, className }) => (
  <div className={`flex gap-4 ${className}`}>
    {children}
  </div>
);

export const TabsTrigger = ({ value, children, className }) => (
  <button className={`px-4 py-2 text-sm font-medium ${className}`} data-tabs-target={value}>
    {children}
  </button>
);

export const TabsContent = ({ value, children }) => (
  <div className={`tabs-content ${value === 'exercises' ? 'block' : 'hidden'}`}>
    {children}
  </div>
);
