// Heritage Passport Stamp Database Utility

export const getEarnedStamps = () => {
  const data = localStorage.getItem('heritage_passport_stamps');
  return data ? JSON.parse(data) : [];
};

export const addEarnedStamp = (site) => {
  const stamps = getEarnedStamps();
  if (!stamps.some(s => s.siteId === site.id)) {
    const motif = getStampMotif(site.civilizationEra, site.siteType);
    const stamp = {
      siteId: site.id,
      siteName: site.name,
      civilization: site.civilizationEra,
      siteType: site.siteType,
      province: site.province,
      unescoListed: site.unescoListed,
      emoji: motif.emoji,
      dateEarned: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    stamps.push(stamp);
    localStorage.setItem('heritage_passport_stamps', JSON.stringify(stamps));
    return true; // Newly unlocked
  }
  return false; // Already unlocked
};

// Map civilization eras / site types to specific passport motifs
export const getStampMotif = (civilizationEra, siteType) => {
  const era = civilizationEra?.toLowerCase() || '';
  const type = siteType?.toLowerCase() || '';
  
  if (era.includes('mughal')) return { emoji: '🕌', label: 'Mughal' };
  if (era.includes('indus')) return { emoji: '🏺', label: 'Indus Valley' };
  if (era.includes('gandhara') || era.includes('buddhist')) return { emoji: '☸️', label: 'Gandhara' };
  if (era.includes('hindu')) return { emoji: '🪔', label: 'Hindu Heritage' };
  if (era.includes('sufi')) return { emoji: '✦', label: 'Sufi Shrine' };
  if (era.includes('islamic')) return { emoji: '☪️', label: 'Islamic Heritage' };
  if (era.includes('neolithic')) return { emoji: '🪨', label: 'Neolithic' };
  if (type.includes('fort')) return { emoji: '🏰', label: 'Historical Fort' };
  
  return { emoji: '🏛️', label: 'Monument' };
};
