import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b mb-4 pb-2">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">
    {children}
  </h2>
);

export const CardContent = ({ children }) => (
  <div className="mt-4">
    {children}
  </div>
);
