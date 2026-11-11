import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRANCHES } from '../data/branches';

const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
  const [selectedBranchId, setSelectedBranchId] = useState(() => {
    return localStorage.getItem('tfc_preferred_branch') || 'nairobi';
  });

  useEffect(() => {
    localStorage.setItem('tfc_preferred_branch', selectedBranchId);
  }, [selectedBranchId]);

  const currentBranch = BRANCHES[selectedBranchId] || BRANCHES.nairobi;

  const setBranch = (branchId) => {
    if (BRANCHES[branchId]) {
      setSelectedBranchId(branchId);
    }
  };

  return (
    <BranchContext.Provider value={{
      selectedBranchId,
      currentBranch,
      setBranch,
      allBranches: BRANCHES,
    }}>
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};
